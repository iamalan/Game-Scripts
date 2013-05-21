#pragma strict

public static var killMode : boolean = false;
private var smoothTransition : int = 2;
public var curveController : GameObject;

function Start() {

	killMode = false;

}

function Update () {
	
	if(killMode){
		DynamicShader.Offset = Vector2.Lerp(DynamicShader.Offset, Vector2.zero, Time.deltaTime*smoothTransition);
		if(DynamicShader.Offset.x == 0){
			curveController.active = false;
		} 
	}

}