/*
 Random Terrain Generator
 2Beans 
*/

//Assuming the first terrain may be different
public var firstPlatform : GameObject;

public var player : Transform;

//Seeing as a greater than condition will give the rise to multiple true conditions, we need a state
var isSpawned : boolean;
 
//May need this
public var spawnDistance : float;

//Array to hold potential objects to be instantiated
public var terrainObjects : GameObject[];
public var destroyPoints : GameObject[];
public var spawnPoints : GameObject[];

//The platform that was last created is stored as a gameobject so we can do stuff with it
private var currPlatform : GameObject;
private var prevPlatform : GameObject;
private var nextPlatform : GameObject;


//Much cleaner when instantiated in awake
function Awake() {
	currPlatform = Instantiate(firstPlatform, Vector3 (0,0,0),   Quaternion.Euler(0, 0, 0));// as GameObject;
	isSpawned = false;
} 

function Update() {

	//destroyCurrent = GameObject.FindWithTag ("DestroyPoint");
	destroyPoints = GameObject.FindGameObjectsWithTag("DestroyPoint");
	spawnPoints = GameObject.FindGameObjectsWithTag("SpawnPoint");

    if (player.transform.position.z > spawnPoints[FindClosest(spawnPoints)].transform.position.z){
          //Call instantiate only if there hasn't been a spawn yet
          if (!isSpawned){
          	InstantiatePlatform();
          }
    }
   
    //If the player has passed the DestroyCurrent point, then destroy the current platform
    if(player.transform.position.z > destroyPoints[FindClosest(destroyPoints)].transform.position.z) {
       //Destroy object 
       Debug.Log("In Destroy");
       Destroy(prevPlatform);
 	   isSpawned = false;
    }
}


function InstantiatePlatform() {

	Debug.Log("INSTATIATE!");

	var randIndex = Random.Range(0, 3);

	prevPlatform = currPlatform;
	currPlatform = Instantiate(terrainObjects[randIndex], destroyPoints[FindClosest(destroyPoints)].transform.position, Quaternion.Euler(0, 0, 0));
	destroyPoints = GameObject.FindGameObjectsWithTag("DestroyPoint");
	spawnPoints = GameObject.FindGameObjectsWithTag("SpawnPoint");
	//nextPlatform = Instantiate(terrainObjects[randIndex], destroyPoints[FindFurthest(destroyPoints)].transform.position, Quaternion.Euler(0, 0, 0));
	
    isSpawned = true;
}

function FindFurthest(points : GameObject[]) {

	var dist = Vector3.Distance(player.transform.position, points[0].transform.position);
	var indexSmallest = 0;
	
    for(var i=0; i<destroyPoints.Length; i++) {
    	var currDist = Vector3.Distance(player.transform.position, points[i].transform.position);
    	if (currDist > dist) {
        	dist = currDist;
        	indexSmallest = i;
    	}
    }
    
    return indexSmallest;
}

function FindClosest(points : GameObject[]) {

	var dist = Vector3.Distance(player.transform.position, points[0].transform.position);
	var indexSmallest = 0;
	
    for(var i=0; i<destroyPoints.Length; i++) {
    	var currDist = Vector3.Distance(player.transform.position, points[i].transform.position);
    	if (currDist < dist) {
        	dist = currDist;
        	indexSmallest = i;
    	}
    }
    
    Debug.Log("Closest " + points[indexSmallest] + " is at index: " + indexSmallest);
    return indexSmallest;
}