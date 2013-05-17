/*
 Target Physics
 2Beans 
*/

#pragma strict

public static var targetVel :int = 585;
var smoothTransition = 5.0;
var railPoints : Vector2[,] = new Vector2[3, 3];
var spacingX : int;
var spacingY : int;
private var i : int = 1;
private var j : int = 1;

private var target:GameObject;
private var targetWingDeflectorL:GameObject;
private var targetWingDeflectorR:GameObject;
private var targetElevonDeflectorL:GameObject;
private var targetElevonDeflectorR:GameObject;

var avoidDistance : float;

var rayAheadPrev = false;
var lineAheadPrev = false;
public static var isNewTarget : boolean = false;

function Start () {

	rigidbody.velocity = Vector3(0,0,targetVel);
	
	target = GameObject.FindGameObjectWithTag('TargetObject');
	targetWingDeflectorL = GameObject.FindGameObjectWithTag('TargetWingDeflectorL');
	targetWingDeflectorR = GameObject.FindGameObjectWithTag('TargetWingDeflectorR');
	targetElevonDeflectorL = GameObject.FindGameObjectWithTag('TargetElevonDeflectorL');
	targetElevonDeflectorR = GameObject.FindGameObjectWithTag('TargetElevonDeflectorR');
	
}

function Update () {
	GetRailsPoints();
	
	//Right now its linearly increasing the target instatiation distance, MAY change to quadratic
	if (transform.position.z > PlayerPhysics.player.transform.position.z + 400 + EnemyRespawn.targetsShotDown*300) {
		isNewTarget = false;
	}
	

	if (isNewTarget){
		targetVel = 1000;
	}  else if (!KillMode.killMode) {
		targetVel = PlayerPhysics.playerVel - 15;
	}

	
	CalcSpeed();
}
function FixedUpdate(){

	var lineAhead = Physics.Linecast(transform.position, Vector3(transform.position.x, transform.position.y, transform.position.z + avoidDistance));
	
	
	if (lineAhead && !lineAheadPrev) {
        AvoidObstacle();
    }
    
    lineAheadPrev = lineAhead;
}

function AvoidObstacle() {
	//The AI to move the target is quite simple. From the 9 railPoints, we need to choose one of the possible railPoint(s) that doesn't have any collision with a raycast
	//Algorithim: Loop through all railPoints, "mark" the ones that when raycasted, don't hit with anything, then choose a random railPoint from the marked railPoints

	var iM = 1;
    var jM = 1;
    var openRailListI = new ArrayList();    
	var openRailListJ = new ArrayList(); 
    
  	for (var i=0;i<3;i++){
		for (var j=0;j<3;j++){
			var lineAhead = Physics.Linecast(Vector3(railPoints[i,j].x, railPoints[i,j].y, transform.position.z), Vector3(railPoints[i,j].x, railPoints[i,j].y, transform.position.z + avoidDistance));
			if (!lineAhead) {
    			//Storing all the open (non-obstructed) railpoints in an arraylist
    			openRailListI.Add(i);
    			openRailListJ.Add(j);
			}
		}
	}
	
	if ( openRailListI.Count!=0 && openRailListJ.Count !=0 ) {
		iM = openRailListI[Random.Range(0, openRailListI.Count-1)];
		jM = openRailListJ[Random.Range(0, openRailListJ.Count-1)];
		
		//iM and jM are indexes that can be moved to
		MoveTo(iM,jM);
	}
}

function MoveTo(iM : int, jM : int) {

	//iM & jM here is the desired railPoint index in i & j that have been marked by AvoidObstacle()

	//Keep looping until we have reached the desired railPoint
	while(i!=iM || j!=jM) {
		if(i<iM){
			MoveDownOne();
		}else if (i>iM){
			MoveUpOne();
		}
		if(j<jM){
			MoveRightOne();
		}else if (j>jM){
			MoveLeftOne();
		}
	}
}

public function MoveLeftOne() {
	if(j<=2 && j>0){
		j--;
		targetWingDeflectorL.animation.Play("player_wingdeflectL_down");
		targetWingDeflectorR.animation.Play("player_wingdeflectR_up");
		
		target.animation.Play("player_left");
	}
}
public function MoveRightOne() {
	if(j<2 && j>=0){
		j++;
		targetWingDeflectorL.animation.Play("player_wingdeflectL_up");
		targetWingDeflectorR.animation.Play("player_wingdeflectR_down");
		
		target.animation.Play("player_right");
	}
}
public function MoveDownOne() {
	if(i<2 && i>=0){
		i++;
		targetElevonDeflectorL.animation.Play("player_elevonL_down");
		targetElevonDeflectorR.animation.Play("player_elevonR_down");
		target.animation.Play("player_down");
	}
}
public function MoveUpOne() {
	if(i<=2 && i>0){
		i--;
		targetElevonDeflectorL.animation.Play("player_elevonL_up");
		targetElevonDeflectorR.animation.Play("player_elevonR_up");
		target.animation.Play("player_up");
	}
}

function CalcSpeed() {

	rigidbody.velocity = Vector3(0,0,targetVel);
	rigidbody.position = Vector3.Lerp(transform.position, Vector3(railPoints[i,j].x, railPoints[i,j].y, transform.position.z), Time.deltaTime*smoothTransition);

}

function GetRailsPoints() {
	railPoints[0, 0]= PlayerPhysics.railPoints[0, 0];
	railPoints[0, 1]= PlayerPhysics.railPoints[0, 1];
	railPoints[0, 2]= PlayerPhysics.railPoints[0, 2];
	railPoints[1, 0]= PlayerPhysics.railPoints[1, 0];
	railPoints[1, 1]= PlayerPhysics.railPoints[1, 1];
	railPoints[1, 2]= PlayerPhysics.railPoints[1, 2];
	railPoints[2, 0]= PlayerPhysics.railPoints[2, 0];
	railPoints[2, 1]= PlayerPhysics.railPoints[2, 1];
	railPoints[2, 2]= PlayerPhysics.railPoints[2, 2];
}

