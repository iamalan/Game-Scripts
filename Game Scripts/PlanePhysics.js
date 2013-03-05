#pragma strict

var planeVel = Vector3(0,0,50);
var joyButton : Joystick;
var speed : float = 0.1; 
var hitNoise : AudioClip;
var followTerrain : boolean;



function Awake () {

	joyButton =  GameObject.Find("Single Joystick").GetComponent(Joystick);
}

function Start() {

	//Local Coords
	rigidbody.velocity = transform.TransformDirection(planeVel);
	
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
    	
    //define a vector to point "right"
    var right = transform.TransformDirection (Vector3.right);
    //hitInfo stores what the raycast has hit
    var hitInfo : RaycastHit;
    //Cast a ray to the right and store in hitinfo
    Physics.Raycast (transform.position, right, hitInfo, Mathf.Infinity);
    //set the plane's x pos and use offset	
    transform.position.x = hitInfo.point.x - 30;
    
    	
}



function CalcSpeed(){
	//Speed reduces with increasing altitude, required to put the +1 to avoid inf speed
	rigidbody.velocity = transform.TransformDirection(planeVel)/(0.05*rigidbody.position.y+1);
}

function OnCollisionEnter(){
	audio.PlayOneShot(hitNoise);
}



