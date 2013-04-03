/*
 Random Terrain Generator
 2Beans 
*/

//Assuming the first terrain may be different
public var numberOfPlatformsAhead : int = 5;
public var numberOfPlatformsRepeats : int = 3;
public var player : Transform;
public var cameraThreshold : float = 10;

//Seeing as a greater than condition will give the rise to multiple true conditions, we need a state
var isSpawned : boolean;

//Array to hold potential objects to be instantiated, note that element 0 holds the first terrain that will be generated for that terrain family and the minimum number of elements is two
//families differ with respect to "theme"
public var familyOneTerrains : GameObject[];
public var familyTwoTerrains : GameObject[];
public var destroyPoints : GameObject[];
//This number is used to decide WHEN to change - its a user input choose whole numbers
public var familyStateChange : int;

//A queue seemed like the most logical idea here seeing as were FIFO for terrains
public var platformQueue : Queue;
public var terrainPoolOne : GameObject[];
public var terrainPoolTwo : GameObject[];
public var terrainPoolThree : GameObject[];

//We'll be basing our terrain family state on number of generated terrains so far (not including the generated terrains in Awake()), e.g. if we are above say 5 then use familyTwoTerrains
public static var generatedSoFar = 0;

private var terrainOneOn : boolean = true;

//Much cleaner when instantiated in awake
function Awake() {
	
	if(numberOfPlatformsAhead>numberOfPlatformsRepeats*familyOneTerrains.Length){
		numberOfPlatformsAhead = numberOfPlatformsRepeats*familyOneTerrains.Length-1;
	}
	//Make the terrainPoolOne. This will hold all the possible terrains however they will all be inactive. In start we will chose numberOfPlatformsAhead number to activate
 	terrainPoolOne = new GameObject[numberOfPlatformsRepeats*familyOneTerrains.Length]; 
	var shifter : int = 0;
	for ( var i=0; i<familyOneTerrains.Length; i++ ) {
			for ( var j=0; j<numberOfPlatformsRepeats; j++ ){
				var tempPlat = Instantiate(familyOneTerrains[i], Vector3(player.transform.position.x,0,player.transform.position.z + shifter*10), Quaternion.Euler(0, 0, 0));
				terrainPoolOne[numberOfPlatformsRepeats*i+j]= tempPlat;
				terrainPoolOne[numberOfPlatformsRepeats*i+j].active = false;
				shifter++;
			}
	}
	
	//Make the terrainPoolTwo. This will hold all the possible terrains however they will all be inactive. In start we will chose numberOfPlatformsAhead number to activate
 	terrainPoolTwo = new GameObject[numberOfPlatformsRepeats*familyTwoTerrains.Length]; 
	for ( i=0; i<familyTwoTerrains.Length; i++ ) {
			for ( j=0; j<numberOfPlatformsRepeats; j++ ){
				tempPlat = Instantiate(familyTwoTerrains[i], Vector3(player.transform.position.x,0,player.transform.position.z + shifter*10), Quaternion.Euler(0, 0, 0));
				terrainPoolTwo[numberOfPlatformsRepeats*i+j]= tempPlat;
				terrainPoolTwo[numberOfPlatformsRepeats*i+j].active = false;
				shifter++;
			}
	}
	isSpawned = true; 
} 

function Start() {

	platformQueue = new Queue();
	
	//Activate random terrains in terrainPools
	
	for ( var i=0; i<numberOfPlatformsAhead; i++ ) {
		if ( i==0 ) {
			var tempPlat = terrainPoolOne[0];
			tempPlat.active = true;
			destroyPoints = GameObject.FindGameObjectsWithTag("DestroyPoint");
			tempPlat.transform.position = Vector3(player.transform.position.x,0,player.transform.position.z);
			platformQueue.Enqueue(tempPlat);
		} else {
			tempPlat = terrainPoolOne[Random.Range(1, terrainPoolOne.Length)];
			while(tempPlat.active == true){
				tempPlat = terrainPoolOne[Random.Range(1, terrainPoolOne.Length)];
			}
			destroyPoints = GameObject.FindGameObjectsWithTag("DestroyPoint");
			tempPlat.transform.position = destroyPoints[FindFurthest()].transform.position;
			tempPlat.active = true;
			platformQueue.Enqueue(tempPlat);
		}
	}
	
	generatedSoFar++;
}

function Update() {

	destroyPoints = GameObject.FindGameObjectsWithTag("DestroyPoint");

	//Every familyStateChange number of times, we switch to using other terrainPool
	if ( generatedSoFar%familyStateChange == 0 ){
		//Congratulate user?
		UpdateFamilyState();
		generatedSoFar++;
	}
		
	if( !isSpawned && terrainOneOn ){
		var tempPlat = terrainPoolOne[Random.Range(1, terrainPoolOne.Length)];
		while(tempPlat.active == true){
			tempPlat = terrainPoolOne[Random.Range(1, terrainPoolOne.Length)];
		}
		tempPlat.transform.position = destroyPoints[FindFurthest()].transform.position;
		tempPlat.active = true;
		isSpawned= true;
		
		generatedSoFar++;
	} else if(!isSpawned && !terrainOneOn) {
		
		tempPlat = terrainPoolTwo[Random.Range(0, terrainPoolTwo.Length)];
		while(tempPlat.active == true){
			tempPlat = terrainPoolTwo[Random.Range(0, terrainPoolTwo.Length)];
		}
		tempPlat.transform.position = destroyPoints[FindFurthest()].transform.position;
		tempPlat.active = true;
		isSpawned= true;
		
		generatedSoFar++;
	}

}


function LateUpdate(){
	if( player.transform.position.z > destroyPoints[FindClosest()].transform.position.z + cameraThreshold ){
		destroyPoints[FindClosest()].gameObject.transform.parent.active= false;
		isSpawned= false;
	}
}

function FindFurthest() {

	destroyPoints = GameObject.FindGameObjectsWithTag("DestroyPoint");

	var furthestSoFar = Vector3.Distance(player.transform.position, destroyPoints[0].transform.position);
	var indexLargest = 0;

    for(var i=1; i<destroyPoints.Length; i++) {
    	var currDist = Vector3.Distance(player.transform.position, destroyPoints[i].transform.position);
    	if (currDist > furthestSoFar && destroyPoints[i].active == true) {
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
    	if (currDist < closestSoFar && destroyPoints[i].active == true) {
        	closestSoFar = currDist;
        	indexSmallest = i;
    	}
    }
    
    return indexSmallest;
}

function GenerateTokens() {


}

function UpdateFamilyState() {
	Debug.Log("Just changed state");
	if (terrainOneOn){
		terrainOneOn = false;
	} else{
		terrainOneOn = true;
	}
	
}