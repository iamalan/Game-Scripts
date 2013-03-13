#pragma strict

public var Offset : Vector2;
public var Mats : Material[];

function Start() {
	Offset = Vector2.zero;
}


function Update () {

	if(Input.GetMouseButtonDown(0)) {
		//Offset.x = Offset.x + 0.1;
	}
	if(Input.GetMouseButtonDown(1)) {
		//Offset.x = Offset.x - 0.1;
	}
	
	for (var M : Material in Mats) {
    	M.SetVector("_QOffset",Offset);
    }

}