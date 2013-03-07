#pragma strict


function OnTriggerExit() {
	Debug.Log("IN DESTROYME");
	Destroy(transform.parent.gameObject);
}