#pragma strict
private var target:GameObject;
private var missileSpeed:float = 600;
private var missileMaxSpeed:float = 3*missileSpeed;
private var missDist : float = 25.0;
public var explosion : GameObject;
public var explosion2:GameObject;



function Start () {
	target = GameObject.FindGameObjectWithTag('TargetObject');
	transform.rigidbody.velocity = missileSpeed*Vector3.forward;
}

function Update () {

	CalcSpeed();
	
	if(transform.position.z > target.transform.position.z){	
		GUIController.Score++;
		GUIController.GUIScore.text=String.Format("{0}", GUIController.Score);
		GameObject.Destroy(target);
		Destroy(gameObject);
		KillMode.killMode = false;
		EnemyRespawn.killTime = Time.time;
		Instantiate(explosion, target.transform.position, Quaternion.identity);
		Instantiate(explosion2, target.transform.position, Quaternion.identity);
		EnemyRespawn.isEnemy = false;

	}		
}

function CalcSpeed() {

	//Adding in slower rotation by using relative rotations and slerping
	var rotation = Quaternion.LookRotation(target.transform.position - transform.position);
	transform.rotation = Quaternion.Slerp(transform.rotation, rotation, Time.deltaTime * .8);
	
	//transform.LookAt(target.transform-gameObject.transform);
	rigidbody.velocity = transform.TransformDirection(missileSpeed*Vector3.forward);
	
	
	if (missileSpeed < missileMaxSpeed) {
		missileSpeed = missileSpeed + 2;
	}
}