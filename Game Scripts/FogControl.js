#pragma strict
var fogcolor:Color=Color.white;
private var FogB2W:boolean;
private var FogW2B:boolean;
private var fogStart:float;
private var fogEnd:float;
var screen:GameObject;

function Start () {

	screen = GameObject.FindGameObjectWithTag('Screen');
	screen.renderer.enabled=false;
	
	fogStart=500;
	fogEnd=1400;

	RenderSettings.fogColor = Color.white;
   	FogB2W=false;    
   	FogW2B=false;
}

function Update () {


	if (FogW2B==true){
		fogcolor = Color.Lerp(Color.white, Color.black, 0.4*Time.time);
		fogStart=Mathf.Lerp(1000, 700, 0.05*Time.time);
		fogEnd=Mathf.Lerp(1400, 1000, 0.05*Time.time);
		screen.renderer.enabled=true;
	}
	
	if (FogB2W==true){
		fogcolor = Color.Lerp(Color.black, Color.white, 0.1*Time.time);
		fogStart=Mathf.Lerp(200, 1000, 0.2*Time.time);
		fogEnd=Mathf.Lerp(1000, 1400, 0.05*Time.time);
		screen.renderer.enabled=false;
	}
	
	RenderSettings.fogColor = fogcolor;
	RenderSettings.fogStartDistance=fogStart;
	RenderSettings.fogEndDistance=fogEnd;
	
}


 function OnTriggerEnter(fogPointStart : Collider) {
     if (fogPointStart.gameObject.tag == "FogPointA") {
   		 FogB2W=false;    
   		 FogW2B=true;
       }
       
     if (fogPointStart.gameObject.tag == "FogPointB") {
   		 FogB2W=true;    
   		 FogW2B=false;
       }
      }