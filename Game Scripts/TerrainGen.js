//Terrain to clone
//This will eventually become an array so that random platforms can be chosen to instantiate
public var firstPlatform : GameObject;

//The player's position will be required to determine when to spawn and destroy
public var player : Transform;

//When player's z position exceeds this point a clone platform will be generated
private var spawnNext : GameObject;

//When player's z position exceeds this point athe current platform will be destroyed (important to put this a little ahead of the final position of the platform)
private var destroyCurrent : GameObject;

//Array to hold potential angles about the y-axis
var angles=[-90,0,90];

//Array to hold potential objects to be instantiated
public var terrainObjects : GameObject[];

//The platform that was alst created is stored as a gameobject so we can do stuff with it
private var currPlatform : GameObject;
private var prevPlatform : GameObject;
private var nextPlatform : GameObject;

//Much cleaner when instantiated in awake
function Awake() {
	var rotation = Quaternion.identity;
	// Assign a rotation 30 degrees around the y axis
	rotation.eulerAngles = Vector3(-90, 90, 0);

	currPlatform = Instantiate(firstPlatform, Vector3 (0,0,player.position.z+10), rotation) as GameObject;
} 
 
function Start() {

}
 
function Update() {
	
	destroyCurrent = GameObject.FindWithTag ("DestroyPoint");
	spawnNext = GameObject.FindWithTag ("SpawnPoint");
    
}


function InstantiatePlatform() {

	var randIndex = Random.Range(0, 3);
		
	//var randomRotation = Quaternion.Euler(0,angles[indexAngle],0);
	
	var rotation = Quaternion.identity;
	
	// Assign a rotation 90 degrees around the y and x axis
	rotation.eulerAngles = Vector3(-90, 90, 0);	

	prevPlatform = currPlatform;
	currPlatform = Instantiate(terrainObjects[randIndex], new Vector3(destroyCurrent.transform.position.x,0, destroyCurrent.transform.position.z), destroyCurrent.transform.rotation);
}