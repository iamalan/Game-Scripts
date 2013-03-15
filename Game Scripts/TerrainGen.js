/*
 Random Terrain Generator
 2Beans 
*/

//Assuming the first terrain may be different
public var numberOfPlatformsAhead : int = 5;
public var player : Transform;
public var cameraThreshold : float = 10;

//Seeing as a greater than condition will give the rise to multiple true conditions, we need a state
var isSpawned : boolean;

//Array to hold potential objects to be instantiated, note that element 0 holds the first terrain that will be generated for that terrain family and the minimum number of elements is two
//families differ with respect to "theme"
public var familyOneTerrains : GameObject[];
public var familyTwoTerrains : GameObject[];
public var destroyPoints : GameObject[];

//A queue seemed like the most logical idea here seeing as were FIFO for terrains
public var platformQueue : Queue;

//We'll be basing our terrain family state on number of generated terrains so far (not including the generated terrains in Awake()), e.g. if we are above say 5 then use familyTwoTerrains
private static var generatedSoFar = 0;

//Much cleaner when instantiated in awake
function Awake() {

	platformQueue = new Queue();
	
	for ( var i=0; i<numberOfPlatformsAhead; i++ ) {
		if ( i==0 ) {
			var tempPlat = Instantiate(familyOneTerrains[0], Vector3(player.transform.position.x,0,player.transform.position.z), Quaternion.Euler(0, 0, 0));
			platformQueue.Enqueue(tempPlat);
		} else {
			destroyPoints = GameObject.FindGameObjectsWithTag("DestroyPoint");
			tempPlat = Instantiate(familyOneTerrains[Random.Range(1, familyOneTerrains.Length)], destroyPoints[FindFurthest()].transform.position, Quaternion.Euler(0, 0, 0));
			platformQueue.Enqueue(tempPlat);
		}
	}
	
	isSpawned = true; 
} 



function Update() {

	destroyPoints = GameObject.FindGameObjectsWithTag("DestroyPoint");
	
	Debug.Log("generatedSoFar: " + generatedSoFar);
	
	if ( generatedSoFar == 5 ){
		//Congratulate user?
		//TODO: Family state change
	}
		
	if( !isSpawned ){
		var tempPlat = Instantiate(familyOneTerrains[Random.Range(1, familyOneTerrains.Length)], destroyPoints[FindFurthest()].transform.position, Quaternion.Euler(0, 0, 0));
		platformQueue.Enqueue(tempPlat);
		isSpawned= true;
		generatedSoFar++;
	}
	
	if( player.transform.position.z > destroyPoints[FindClosest()].transform.position.z + cameraThreshold){
		Destroy(platformQueue.Peek());
		platformQueue.Dequeue();
		isSpawned= false;
	}

}



function FindFurthest() {

	destroyPoints = GameObject.FindGameObjectsWithTag("DestroyPoint");
	
	var furthestSoFar = Vector3.Distance(player.transform.position, destroyPoints[0].transform.position);
	var indexLargest = 0;
	
    for(var i=1; i<destroyPoints.Length; i++) {
    	var currDist = Vector3.Distance(player.transform.position, destroyPoints[i].transform.position);
    	if (currDist > furthestSoFar) {
        	furthestSoFar = currDist;
        	indexLargest = i;
    	}
    }
    
    return indexLargest;
}



function FindClosest() {

	destroyPoints = GameObject.FindGameObjectsWithTag("DestroyPoint");

	var closestSoFar = Vector3.Distance(player.transform.position, destroyPoints[0].transform.position);
	var indexSmallest = 0;
	
    for(var i=1; i<destroyPoints.Length; i++) {
    	var currDist = Vector3.Distance(player.transform.position, destroyPoints[i].transform.position);
    	if (currDist < closestSoFar) {
        	closestSoFar = currDist;
        	indexSmallest = i;
    	}
    }
    
    return indexSmallest;
}