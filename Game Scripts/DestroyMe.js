#pragma strict

function OnTriggerEnter() {
	Destroy(transform.parent.gameObject);
}