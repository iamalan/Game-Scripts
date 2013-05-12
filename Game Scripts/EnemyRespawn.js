#pragma strict

public static var isEnemy : boolean;
public var enemy : GameObject;
public var player : GameObject;

function Start () {
	isEnemy = false;
}

function Update () {
	if (MenuScreen.isMenu) {
		isEnemy = false;
	} else if (!isEnemy) {
		Instantiate (enemy, Vector3(player.transform.position.x,player.transform.position.y+75,player.transform.position.z), Quaternion.identity);
		isEnemy = true;
		TargetPhysics.isNewTarget = true;
		PlayerPhysics.isFired = false;
		KillMode.killMode = false; 		
	} 
}
