#pragma strict

public static var playerVel : int;
public var spacingX : int;
public var spacingY : int;
public var lockOnRange : int;
private var smoothTransition = 5.0;
public static var railPoints : Vector2[,] =  new Vector2[3, 3];
private var i : int = 1;
private var j : int = 1;
public static var player : GameObject;
private var target : GameObject;
public var missile : GameObject;
private var playerWingDeflectorL : GameObject;
private var playerWingDeflectorR : GameObject;
private var playerElevonDeflectorL : GameObject;
private var playerElevonDeflectorR : GameObject;
public static var isFired : boolean;

function Start () {
	GetRailsPoints();
	rigidbody.velocity = Vector3(0,0,playerVel);
	
	player = GameObject.FindGameObjectWithTag('PlayerObject');
	target = GameObject.FindGameObjectWithTag('TargetObject');
	
	isFired = false;
	
	playerVel = 600;
	
	playerWingDeflectorL = GameObject.FindGameObjectWithTag('PlayerWingDeflectorL');
	playerWingDeflectorR = GameObject.FindGameObjectWithTag('PlayerWingDeflectorR');
	playerElevonDeflectorL = GameObject.FindGameObjectWithTag('PlayerElevonDeflectorL');
	playerElevonDeflectorR = GameObject.FindGameObjectWithTag('PlayerElevonDeflectorR');
	
}

function Update () {

	CalcSpeed();
	target = GameObject.FindGameObjectWithTag('TargetObject');

	
	if (target && !TargetPhysics.isNewTarget) {

		ArmMissile();
	}
}

public function MoveLeftOne() {
	if(j<=2 && j>0){
		j--;
		playerWingDeflectorL.animation.Play("player_wingdeflectL_down");
		playerWingDeflectorR.animation.Play("player_wingdeflectR_up");
		
		player.animation.Play("player_left");
		
		
	}
}
public function MoveRightOne() {
	if(j<2 && j>=0){
		j++;
		playerWingDeflectorL.animation.Play("player_wingdeflectL_up");
		playerWingDeflectorR.animation.Play("player_wingdeflectR_down");
		
		player.animation.Play("player_right");
		
	}
}
public function MoveDownOne() {
	if(i<2 && i>=0){
		i++;
		playerElevonDeflectorL.animation.Play("player_elevonL_up");
		playerElevonDeflectorR.animation.Play("player_elevonR_up");
		player.animation.Play("player_down");
		
		
	}
}
public function MoveUpOne() {
	if(i<=2 && i>0){
		i--;
		
		playerElevonDeflectorL.animation.Play("player_elevonL_down");
		playerElevonDeflectorR.animation.Play("player_elevonR_down");
		player.animation.Play("player_up");
	}
}


function CalcSpeed() {

	rigidbody.velocity = Vector3(0,0,playerVel);
	rigidbody.position = Vector3.Lerp(transform.position, Vector3(railPoints[i,j].x, railPoints[i,j].y, transform.position.z), Time.deltaTime*smoothTransition);


}

function GetRailsPoints() {
	railPoints[0, 0]= new Vector2(transform.position.x - spacingX, transform.position.y + spacingY);
	railPoints[0, 1]= new Vector2(transform.position.x, transform.position.y + spacingY);
	railPoints[0, 2]= new Vector2(transform.position.x + spacingX, transform.position.y + spacingY);
	railPoints[1, 0]= new Vector2(transform.position.x - spacingX, transform.position.y);
	railPoints[1, 1]= new Vector2(transform.position.x, transform.position.y);
	railPoints[1, 2]= new Vector2(transform.position.x + spacingX, transform.position.y);
	railPoints[2, 0]= new Vector2(transform.position.x - spacingX, transform.position.y - spacingY);
	railPoints[2, 1]= new Vector2(transform.position.x, transform.position.y - spacingY);
	railPoints[2, 2]= new Vector2(transform.position.x + spacingX, transform.position.y - spacingY);
}

function ArmMissile() {

	if (Mathf.Abs(player.transform.position.z-target.transform.position.z)<lockOnRange && Mathf.Abs(player.transform.position.y-target.transform.position.y)<lockOnRange && isFired==false){
		KillMode.killMode = true;
		
		if(ScoreController.fireMissile){
			Instantiate (missile, Vector3(player.transform.position.x+15.3,player.transform.position.y-1,player.transform.position.z+13), Quaternion.identity);
			isFired = true;
		}
	}
}



