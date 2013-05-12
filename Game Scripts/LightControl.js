#pragma strict
static var lamp:GameObject;
private var lightOn:boolean;

function Start () {
lamp=GameObject.FindGameObjectWithTag('lamp');
lightOn=true;
}

function Update () {
if (lightOn==true){
lamp.light.intensity=0.6;
}

if (lightOn==false){
lamp.light.intensity=0.3;
}



}


    function OnTriggerEnter(lightPointStart : Collider) {
     if (lightPointStart.gameObject.tag == "LightPointA") {
   		 lightOn=false;    
       }
       
            if (lightPointStart.gameObject.tag == "LightPointB") {
   		 lightOn=true;    
       }
       }
       

       
       
        