#pragma strict

var rotationState : boolean = true;
var rotationSpeed : int = 200;

function Start () {

}

function Update () {
	if (rotationState){
		transform.Rotate(0,0,rotationSpeed*Time.deltaTime);
	}
	
}