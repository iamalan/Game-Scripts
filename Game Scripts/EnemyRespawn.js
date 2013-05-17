#pragma strict

public static var isEnemy : boolean;
public var enemy : GameObject;
public var player : GameObject;
private var killTime : float;
public static var targetsShotDown : int;

function Start () {
	isEnemy = false;
	killTime = 0.0;
	targetsShotDown = 0;
}

function Update () {
	if (MenuScreen.isMenu) {
		isEnemy = false;
		killTime = Time.time;
	} 
	if (!isEnemy && (Time.time-killTime)>2.0) {
		WaitAndInstantiate();
		isEnemy = true;
		TargetPhysics.isNewTarget = true;
		PlayerPhysics.isFired = false;
		KillMode.killMode = false; 
		killTime = Time.time;
		//Speed up to increase difficulty
		PlayerPhysics.playerVel = PlayerPhysics.playerVel + 10;		
	} 
}


function WaitAndInstantiate(){

	yield WaitForSeconds(2.0);
	Instantiate (enemy, Vector3(0,player.transform.position.y+30,player.transform.position.z), Quaternion.identity);
	targetsShotDown++;
	
}