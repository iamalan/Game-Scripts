/*
 Player Physics
 2Beans 
*/

#pragma strict

var playerVel = 50.0;
var smoothTransition = 5.0;
var railPoints : Vector2[,] = new Vector2[3, 3];
var spacingX : int;
var spacingY : int;
private var i : int = 1;
private var j : int = 1;


function Start () {
	GetRailsPoints();
	rigidbody.velocity = Vector3(0,0,playerVel);
}

function Update () {
	CalcSpeed();
	Debug.DrawRay(Vector3(railPoints[0,0].x,railPoints[0,0].y,transform.position.z), Vector3.forward*99, Color.green);
	Debug.DrawRay(Vector3(railPoints[0,1].x,railPoints[0,1].y,transform.position.z), Vector3.forward*99, Color.green);
	Debug.DrawRay(Vector3(railPoints[0,2].x,railPoints[0,2].y,transform.position.z), Vector3.forward*99, Color.green);
	Debug.DrawRay(Vector3(railPoints[1,0].x,railPoints[1,0].y,transform.position.z), Vector3.forward*99, Color.green);
	Debug.DrawRay(Vector3(railPoints[1,1].x,railPoints[1,1].y,transform.position.z), Vector3.forward*99, Color.green);
	Debug.DrawRay(Vector3(railPoints[1,2].x,railPoints[1,2].y,transform.position.z), Vector3.forward*99, Color.green);
	Debug.DrawRay(Vector3(railPoints[2,0].x,railPoints[2,0].y,transform.position.z), Vector3.forward*99, Color.green);
	Debug.DrawRay(Vector3(railPoints[2,1].x,railPoints[2,1].y,transform.position.z), Vector3.forward*99, Color.green);
	Debug.DrawRay(Vector3(railPoints[2,2].x,railPoints[2,2].y,transform.position.z), Vector3.forward*99, Color.green);
}

public function MoveLeftOne() {
	if(j<=2 && j>0){
		j--;
	}
	Debug.Log("In MoveLeftOne & j: " + j + " and i: " + i);
}
public function MoveRightOne() {
	if(j<2 && j>=0){
		j++;
	}
	Debug.Log("In MoveRightOne & j: " + j + " and i: " + i);
}
public function MoveDownOne() {
	if(i<2 && i>=0){
		i++;
	}
	Debug.Log("In MoveDownOne & i: " + i + " and j: " + j);
}
public function MoveUpOne() {
	if(i<=2 && i>0){
		i--;
	}
	Debug.Log("In MoveUpOne & i: " + i + " and j: " + j);
}


function CalcSpeed() {

	//Variable to store the last position of i, we'll use these later to avoid lerping to the same spot
	var iLast : int;
	var jLast : int;
	
	rigidbody.velocity = Vector3(0,0,playerVel);
	
	//Why change position if we don't need to?
	if(iLast!=i || jLast!=j ){
		rigidbody.position = Vector3.Lerp(transform.position, Vector3(railPoints[i,j].x, railPoints[i,j].y, transform.position.z), Time.deltaTime*smoothTransition);
	}
	
	iLast = i;
	jLast = j;

}

function GetRailsPoints() {
	railPoints[0, 0]= new Vector2(transform.position.x - spacingX, transform.position.y + spacingY);
	railPoints[0, 1]= new Vector2(transform.position.x, transform.position.y + spacingY);
	railPoints[0, 2]= new Vector2(transform.position.x + spacingX, transform.position.y + spacingY);
	railPoints[1, 0]= new Vector2(transform.position.x - spacingX, transform.position.y);
	railPoints[1, 1]= new Vector2(transform.position.x, transform.position.y);
	railPoints[1, 2]= new Vector2(transform.position.x + spacingX, transform.position.y);
	railPoints[2, 0]= new Vector2(transform.position.x - spacingX, transform.position.y - spacingY);
	railPoints[2, 1]= new Vector2(transform.position.x, transform.position.y - spacingY);
	railPoints[2, 2]= new Vector2(transform.position.x + spacingX, transform.position.y - spacingY);
}



