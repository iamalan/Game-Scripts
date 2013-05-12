#pragma strict

function Update() {
	
	if(gameObject.particleSystem.isStopped){
		GameObject.Destroy(gameObject);
	}
	
}