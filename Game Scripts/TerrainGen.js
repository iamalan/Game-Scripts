/*
 Random Terrain Generator
 2Beans 
*/

//Assuming the first terrain may be different
public var numberOfPlatformsAhead : int = 5;
public var numberOfPlatformsRepeats : int = 3;
public var player : Transform;
public var cameraThreshold : float = 10;
public var maxTokenPaths : int;

//Seeing as a greater than condition will give the rise to multiple true conditions, we need a state
private var isSpawned : boolean;

//Array to hold potential objects to be instantiated, note that element 0 holds the first terrain that will be generated for that terrain family and the minimum number of elements is two
//families differ with respect to "theme" - only true for familyOne though
public var familyOneTerrains : GameObject[];
public var familyTwoTerrains : GameObject[];
public var familyThreeTerrains : GameObject[];
public var destroyPoints : GameObject[];
//Use these number to decide WHEN to change - its a user input choose whole numbers
public var familyOneStateChange : int;
public var familyTwoStateChange : int;
public var familyThreeStateChange : int;

//A queue seemed like the most logical idea here seeing as were FIFO for terrains
public var platformQueue : Queue;
public var terrainPoolOne : GameObject[];
public var terrainPoolTwo : GameObject[];
public var terrainPoolThree : GameObject[];

//We'll be basing our terrain family state on number of generated terrains so far (not including the generated terrains in Awake()), e.g. if we are above say 5 then use familyTwoTerrains
public static var activatedSoFar = 0;

private var familyOneOn : boolean = true;
private var familyTwoOn : boolean = false;
private var familyThreeOn : boolean = false;
public static var menuTransition : boolean = true;

//Much cleaner when instantiated in awake
function Awake() {

	//Bounds check on user input	
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
	
	//Make the terrainPoolThree. This will hold all the possible terrains however they will all be inactive. In start we will chose numberOfPlatformsAhead number to activate
 	terrainPoolThree = new GameObject[numberOfPlatformsRepeats*familyThreeTerrains.Length]; 
	for ( i=0; i<familyThreeTerrains.Length; i++ ) {
			for ( j=0; j<numberOfPlatformsRepeats; j++ ){
				tempPlat = Instantiate(familyThreeTerrains[i], Vector3(player.transform.position.x,0,player.transform.position.z + shifter*10), Quaternion.Euler(0, 0, 0));
				terrainPoolThree[numberOfPlatformsRepeats*i+j]= tempPlat;
				terrainPoolThree[numberOfPlatformsRepeats*i+j].active = false;
				shifter++;
			}
	}
	isSpawned = true; 
} 

function Start() {

	activatedSoFar = 0;
	//Choose two F1S1s to repeat 
	var tempPlat = terrainPoolOne[0];
	tempPlat.active = true;
	var tempPlat2 = terrainPoolOne[1];
	tempPlat2.active = true;
	destroyPoints = GameObject.FindGameObjectsWithTag("DestroyPoint");
	tempPlat.transform.position = Vector3(player.transform.position.x,0,player.transform.position.z);
	tempPlat2.transform.position = destroyPoints[FindFurthest()].transform.position;
	
}



function Update() {

	destroyPoints = GameObject.FindGameObjectsWithTag("DestroyPoint");
	
	if(MenuScreen.isMenu && !isSpawned ){
		
		var tempPlat = terrainPoolOne[0];
		var tempPlat2 = terrainPoolOne[1];	

		destroyPoints[FindClosest()].gameObject.transform.parent.position = destroyPoints[FindFurthest()].transform.position;
		
		isSpawned = true;	
	
	}else if(!MenuScreen.isMenu && menuTransition) {
		PopulateTerrainPoolOne();
		menuTransition = false;
	}else if (!MenuScreen.isMenu && !menuTransition){
	
		UpdateFamilyState();
			
		if( !isSpawned && familyOneOn && !familyThreeOn && !familyTwoOn){
			
			//Choose the last terrain in the family which will always occur when activatedSoFar+1 is a multiple of familyStateChange 
			if (familyOneStateChange == (activatedSoFar+1)) {
				tempPlat = terrainPoolOne[terrainPoolOne.Length-1];
			} else if ((activatedSoFar) == 1) {
				tempPlat = terrainPoolOne[0];
			} else {
		 		tempPlat = terrainPoolOne[Random.Range(numberOfPlatformsRepeats, terrainPoolOne.Length-numberOfPlatformsRepeats-1)];
				while(tempPlat.active == true){
					tempPlat = terrainPoolOne[Random.Range(numberOfPlatformsRepeats, terrainPoolOne.Length-numberOfPlatformsRepeats-1)];
				}
		 	}
	
			tempPlat.transform.position = destroyPoints[FindFurthest()].transform.position;
			tempPlat.active = true;
			
			GenerateTokens(tempPlat);
			
			isSpawned = true;
			
			activatedSoFar++;
		} else if (!isSpawned && familyTwoOn && !familyOneOn && !familyThreeOn) {
			
			//Choose the last terrain in the family which will always occur when activatedSoFar+1 is a multiple of familyStateChange 
			if ((familyTwoStateChange + familyOneStateChange) == (activatedSoFar+1)) {
				tempPlat = terrainPoolTwo[terrainPoolTwo.Length-1];
			} else if ((familyOneStateChange) == (activatedSoFar)) {
				tempPlat = terrainPoolTwo[0];
			} else {
		 		tempPlat = terrainPoolTwo[Random.Range(numberOfPlatformsRepeats, terrainPoolTwo.Length-numberOfPlatformsRepeats-1)];
		 		while(tempPlat.active == true){
					tempPlat = terrainPoolTwo[Random.Range(numberOfPlatformsRepeats, terrainPoolTwo.Length-numberOfPlatformsRepeats-1)];
				}
		 	}
	
			tempPlat.transform.position = destroyPoints[FindFurthest()].transform.position;
			tempPlat.active = true;
			isSpawned= true;
			
			activatedSoFar++;
		} else if (!isSpawned && familyThreeOn && !familyOneOn && !familyTwoOn) {
			
			//Choose the last terrain in the family which will always occur when activatedSoFar+1 is a multiple of familyStateChange 
			if ((familyTwoStateChange + familyOneStateChange + familyThreeStateChange) == (activatedSoFar+1) ) {
				tempPlat = terrainPoolThree[terrainPoolThree.Length-1];
			} else if ((familyTwoStateChange + familyOneStateChange) == (activatedSoFar)) {
				tempPlat = terrainPoolThree[0];
			}  else {
		 		tempPlat = terrainPoolThree[Random.Range(numberOfPlatformsRepeats, terrainPoolThree.Length-numberOfPlatformsRepeats-1)];
		 		while(tempPlat.active == true){
					tempPlat = terrainPoolThree[Random.Range(numberOfPlatformsRepeats, terrainPoolThree.Length-numberOfPlatformsRepeats-1)];
				}
		 	}
			
			
			tempPlat.transform.position = destroyPoints[FindFurthest()].transform.position;
			tempPlat.active = true;
			isSpawned= true;
			
			activatedSoFar++;
		}
	
	}

}


function LateUpdate(){
	if(MenuScreen.isMenu) {
		if( player.transform.position.z > destroyPoints[FindClosest()].transform.position.z + cameraThreshold ){
			isSpawned= false;
		}
	} else {
		if( player.transform.position.z > destroyPoints[FindClosest()].transform.position.z + cameraThreshold ){
			destroyPoints[FindClosest()].gameObject.transform.parent.active= false;
			isSpawned= false;
		}
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

function PopulateTerrainPoolOne() {

		//Activate random terrains in terrainPools in family one
		for ( var i=0; i<numberOfPlatformsAhead; i++ ) {
				var tempPlat = terrainPoolOne[Random.Range(numberOfPlatformsRepeats, terrainPoolOne.Length-numberOfPlatformsRepeats-1)];
				while(tempPlat.active == true){
					tempPlat = terrainPoolOne[Random.Range(numberOfPlatformsRepeats, terrainPoolOne.Length-numberOfPlatformsRepeats-1)];
				}
				destroyPoints = GameObject.FindGameObjectsWithTag("DestroyPoint");
				tempPlat.transform.position = destroyPoints[FindFurthest()].transform.position;
				tempPlat.active = true;
				
				GenerateTokens(tempPlat);
				activatedSoFar++;
		}
		
}

function UpdateFamilyState() {

	//We want to use these state changes so that the number represents how many times each family comes up before state change
	//therefore if we want F1 to happen 6 times, F2 to happen 3 times and F3 to happen 4 times the change of 
	//from F1->F2 will occur at 9, and from F2->F3 at 13 etc
	//familyTwoStateChange =  familyTwoStateChange + familyOneStateChange;
	//familyThreeStateChange = familyThreeStateChange + familyTwoStateChange;
	
	
	//Every familyStateOneChange number of times, we switch to using other terrainPool
	if (activatedSoFar < familyOneStateChange) {
		familyOneOn = true;
		familyTwoOn = false;
		familyThreeOn = false;
	} else if (activatedSoFar >= familyOneStateChange && activatedSoFar < (familyTwoStateChange + familyOneStateChange)) {
		familyOneOn = false;
		familyTwoOn = true;
		familyThreeOn = false;
	} else if (activatedSoFar >= (familyTwoStateChange + familyOneStateChange)  && activatedSoFar < (familyOneStateChange + familyThreeStateChange + familyTwoStateChange)) {
		familyOneOn = false;
		familyTwoOn = false;
		familyThreeOn = true;		
	} else {
		activatedSoFar = 1;
	}
}

function GenerateTokens( tempPlat:GameObject ) {
		var count : int = Random.Range(0, maxTokenPaths);
		
		for ( var tokenGroup:Transform in tempPlat.transform ) {
			if ( tokenGroup.tag == "Token") {
				tokenGroup.gameObject.SetActive(false);
				if(Random.Range(0,2) && count<maxTokenPaths){
					tokenGroup.gameObject.SetActiveRecursively(true);
					count++;
				}	
			}
			
			if ( tokenGroup.tag == "Boost") {
				tokenGroup.gameObject.SetActive(false);
				if( Random.Range(0,2) == 1 && Time.time > 1) {
					tokenGroup.gameObject.SetActiveRecursively(true);
				}
			}
		}

}