#pragma strict

var planeVel = Vector3(0,0,50);
var target : GameObject;
var joyButton : Joystick;
var hitNoise : AudioClip;
var currTargetPos : Vector3;
var prevTargetPos : Vector3;
var damping = 6.0;

private var leftHit : RaycastHit;
private var rightHit : RaycastHit;

function Awake () {

	joyButton =  GameObject.Find("Single Joystick").GetComponent(Joystick);
}

function Start() {

	//Local Coords
	rigidbody.velocity = transform.TransformDirection(planeVel);
	target = GameObject.FindWithTag ("Target");
	
	//Global coords
	//rigidbody.velocity= planeVel;
	
}
function Update () {

	CalcSpeed();
	
	if (Input.touchCount >= 1){ //&& Input.GetTouch(0).phase == TouchPhase.Moved) {
         //Get movement of the finger since last frame
        var touchDeltaPosition:Vector2 = Input.GetTouch(0).deltaPosition;
       	rigidbody.AddRelativeTorque(-3*touchDeltaPosition.y,0,0);
       	}else{
    	//rigidbody.AddRelativeTorque(1,0,0);
    }
    
    Physics.Raycast(transform.position, this.transform.right, rightHit, Mathf.Infinity);
	Physics.Raycast(transform.position, -this.transform.right, leftHit, Mathf.Infinity);	
	var currMidHit = (rightHit.point + leftHit.point)/2.0;
	transform.position.x = currMidHit.x;
    	
}



function CalcSpeed(){

	var rotation = Quaternion.LookRotation(target.transform.position - transform.position);
	transform.rotation = Quaternion.Slerp(transform.rotation, rotation, Time.deltaTime * damping);
	transform.LookAt(target.transform);

//	var smoothLookAt = Vector3.Lerp(prevTargetPos, currTargetPos, Time.time);
//	transform.LookAt(smoothLookAt);
//	prevTargetPos = currTargetPos;

}

function OnCollisionEnter(){
	audio.PlayOneShot(hitNoise);
}



