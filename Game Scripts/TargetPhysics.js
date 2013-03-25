/*
 Target Physics
 2Beans 
*/

#pragma strict

var targetVel = 200.0;
var smoothTransition = 5.0;
var railPoints : Vector2[,] = new Vector2[3, 3];
var spacingX : int;
var spacingY : int;
private var i : int = 1;
private var j : int = 1;

var rayAheadPrev = false;

function Start () {
	GetRailsPoints();
	rigidbody.velocity = Vector3(0,0,targetVel);
}

function Update () {

	CalcSpeed();

	Debug.DrawRay(transform.position, Vector3.forward*30, Color.red);
	

	var rayAhead = Physics.Raycast(transform.position, transform.TransformDirection (Vector3.forward), 30);
	
	if (rayAhead && !rayAheadPrev) {
		Debug.Log("In update and a collision is detected");
		Debug.Log("Raycast info: " + rayAhead);
        AvoidObstacle();
    }
    
    rayAheadPrev = rayAhead;
}

function AvoidObstacle() {
	//The AI to move the target is quite simple. From the 9 railPoints, we need to choose one of the possible railPoint(s) that doesn't have any collision with a raycast
	//Algorithim: Loop through all railPoints, "mark" the ones that when raycasted, don't hit with anything, then choose a random railPoint from the marked railPoints

	var iM = 1;
    var jM = 1;
    var myArrayListI = new ArrayList();    
	var myArrayListJ = new ArrayList(); 
    
  	for (var i=0;i<3;i++){
		for (var j=0;j<3;j++){
			var rayAhead = Physics.Raycast(Vector3(railPoints[i,j].x, railPoints[i,j].y, transform.position.z), transform.TransformDirection (Vector3.forward), 30);
			if (!rayAhead) {
    			//For now I'm just overwriting iM and jM, soon there will be a list that grows and shrinks depending on number of available rails
    			myArrayListI.Add(i);
    			myArrayListJ.Add(j);
			}
		}
	}
	Debug.Log("In AVOID: myArrayListI.Count = " + myArrayListI.Count);
	iM = myArrayListI[Random.Range(0, myArrayListI.Count)];
	jM = myArrayListJ[Random.Range(0, myArrayListJ.Count)];
	
	//TODO: Chose random potential rail
	MoveTo(iM,jM);
}

function MoveTo(iM : int, jM : int) {

	//iM & jM here is the desired railPoint index in i & j that have been marked by AvoidObstacle()

	//Keep looping until we have reached the desired railPoint
	while(i!=iM || j!=jM) {
		if(i<iM){
			MoveDownOne();
		}else if (i>iM){
			MoveUpOne();
		}
		if(j<jM){
			MoveRightOne();
		}else if (j>jM){
			MoveLeftOne();
		}
	}
}

public function MoveLeftOne() {
	if(j<=2 && j>0){
		j--;
	}
}
public function MoveRightOne() {
	if(j<2 && j>=0){
		j++;
	}
}
public function MoveDownOne() {
	if(i<2 && i>=0){
		i++;
	}
}
public function MoveUpOne() {
	if(i<=2 && i>0){
		i--;
	}
}

function CalcSpeed() {

	//Variable to store the last position of i, we'll use these later to avoid lerping to the same spot
	var iLast : int;
	var jLast : int;

	rigidbody.velocity = Vector3(0,0,targetVel);

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


