#pragma strict

function OnTriggerEnter(other : Collider) {
	
	Destroy(transform.parent.gameObject);

	print ("DESTROY DETECTED");
}