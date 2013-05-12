/*
Random Shader Controller
by 2Beans
*/

#pragma strict

public var deltaXLimit : float;
public var deltaYLimit : float;

private var deltaX : float;
private var deltaY : float;
private var isDelta : boolean = true;


public static var Offset : Vector2;
public var Mats : Material[];
private var playerParentObject:GameObject;
private var targetParentObject:GameObject;


function Start () {

	playerParentObject = GameObject.FindGameObjectWithTag('PlayerParent');
	targetParentObject = GameObject.FindGameObjectWithTag('TargetParent');
	Offset.x=-0.05;
	Offset.y=-0.025;


	Offset = Vector2.zero;
	
	deltaX = 0.0;
	deltaY = 0.0;
}

function Update () {
	
	//Only change deltaX/Y if the isDelta tag is true and  we're at ASF even
	if ( TerrainGen.activatedSoFar%2==0 && Time.time > 3.0 && isDelta && !KillMode.killMode ) {
		if(isDelta){
			deltaX = 0.0004*Random.Range(-1,2);
			deltaY = 0.0004*Random.Range(-1,2);
			//Only want to do this once per 2 terrains to avoid jitter
			isDelta = false;
		}	
	} 
	
	//We need to make isDelta true again as there needs to be multiple terrain warping
	if( TerrainGen.activatedSoFar%2!=0 ) {
		isDelta = true;
	}

	//Actually apply the deltas to the x and y offset values when they are within bounds set by user
	if( (Offset.x > deltaXLimit && deltaX < 0) || (Offset.x < -deltaXLimit && deltaX > 0) || (Offset.x < deltaXLimit && Offset.x > -deltaXLimit)){
		Offset.x = Offset.x + deltaX;
	}
	
	if( (Offset.y > deltaYLimit && deltaY < 0) || (Offset.y < -deltaYLimit && deltaY > 0) || (Offset.y < deltaYLimit && Offset.y > -deltaYLimit)){
		Offset.y = Offset.y + deltaY;
	}
	
	//roll
	playerParentObject.transform.rotation.z=-0.5*Offset.x;
	//targetParentObject.transform.rotation.z=-0.5*Offset.x;
	//pitch
	playerParentObject.transform.rotation.y=0.5*Offset.x;
	//targetParentObject.transform.rotation.y=0.5*Offset.x;
	//yaw
	playerParentObject.transform.rotation.x=-0.5*Offset.y;
	//targetParentObject.transform.rotation.x=-0.5*Offset.y;
	
	
	
	
	
	
	
	
	for (var M : Material in Mats) {
    	M.SetVector("_QOffset",Offset);
    }
}