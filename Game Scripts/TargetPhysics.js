#pragma strict

var targetVel = Vector3(0,0,50);
private var leftHit : RaycastHit;
private var rightHit : RaycastHit;
private var aheadLeftHit : RaycastHit;
private var aheadRightHit : RaycastHit;

function Start () {
	rigidbody.velocity = transform.TransformDirection(targetVel);
}

function Update () {

	
	Physics.Raycast(transform.position, this.transform.right, rightHit, Mathf.Infinity);
	Physics.Raycast(transform.position, -this.transform.right, leftHit, Mathf.Infinity);
	Physics.Raycast(Vector3(transform.position.x, transform.position.y, transform.localPosition.z+10), this.transform.right, aheadRightHit, Mathf.Infinity);
	Physics.Raycast(Vector3(transform.position.x, transform.position.y, transform.localPosition.z+10), -this.transform.right, aheadLeftHit, Mathf.Infinity);
	Debug.DrawRay(Vector3(transform.position.x, transform.position.y, transform.localPosition.z+10), -this.transform.right*100,Color.red);
	Debug.DrawRay(Vector3(transform.position.x, transform.position.y, transform.localPosition.z+10), this.transform.right*100,Color.red);
	Debug.DrawRay(transform.position, -this.transform.right*100,Color.blue);
	Debug.DrawRay(transform.position, this.transform.right*100,Color.blue);
	
	var currMidHit = (rightHit.point + leftHit.point)/2.0;
	var aheadMidHit = (aheadRightHit.point + aheadLeftHit.point)/2.0;
	var slopeVec = aheadMidHit - currMidHit;
	

	transform.position.x = currMidHit.x;
	transform.eulerAngles = Vector3(0, 1 , 0);
	CalcSpeed();

	Debug.Log("slopeVec: " +slopeVec);
}

function CalcSpeed() {
	//rigidbody.velocity = transform.TransformDirection(targetVel);
}