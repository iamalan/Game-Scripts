#pragma strict

var planeVel = Vector3(0,0,50);
var joyButton : Joystick;
var hitNoise : AudioClip;
var currTargetPos : Vector3;
var prevTargetPos : Vector3;
var damping = 6.0;

private var leftHit : RaycastHit;
private var rightHit : RaycastHit;
private var targets : GameObject[]; 

function Awake () {

	joyButton =  GameObject.Find("Single Joystick").GetComponent(Joystick);
	
	//Local Coords
	rigidbody.velocity = transform.TransformDirection(planeVel);
	targets = GameObject.FindGameObjectsWithTag("Target");
	CalcRotation();
	CalcSpeed();
}

function Start() {

	//Global coords
	//rigidbody.velocity= planeVel;
	
}
function Update () {

	CalcSpeed();
	CalcRotation();
	    	
}


function CalcSpeed(){

	rigidbody.velocity = transform.TransformDirection(planeVel);///(0.01*rigidbody.position.y+1);

}

function CalcRotation(){

	targets = GameObject.FindGameObjectsWithTag("Target");

 
    if (targets.length > 0) {
        var closestTarget = targets[0];
        var secondClosestTarget = targets[0];
        
        var dist = Vector3.Distance(transform.position, targets[0].transform.position);
 
        for(var i=0; i<targets.Length; i++) {
            var tempDist = Vector3.Distance(transform.position, targets[i].transform.position);
            if(tempDist < dist) {
            	secondClosestTarget = closestTarget;
                closestTarget = targets[i];
            }else if (tempDist < Vector3.Distance(transform.position, secondClosestTarget.transform.position) ) {
            	secondClosestTarget = targets[i];
            }
            
            Debug.Log("closestTarget: " + closestTarget.transform.position + "secondClosestTarget: " + secondClosestTarget.transform.position);
            
        }
        
        var rotation = Quaternion.LookRotation(closestTarget.transform.position - transform.position);
		transform.rotation = Quaternion.Slerp(transform.rotation, rotation, Time.deltaTime * damping);

        
    }
}

function OnCollisionEnter(){
	audio.PlayOneShot(hitNoise);
}



