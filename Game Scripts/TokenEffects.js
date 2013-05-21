#pragma strict

//public var playerVel : float;
private var speedBoost:GameObject;
private var shieldBoost:GameObject;
private var coin:GameObject;
public static var BoostMode:boolean;
public static var ShieldMode:boolean;
private var playerVelInitial:float;
private var playerShield:GameObject;
private var playerBoost:GameObject;
private var currentTime:float;
private var speedBoostStart:float;
private var shieldBoostStart:float;
private var camera1:Camera;

public var BoostParticle:GameObject;
private var boostParticleClone:GameObject;

public var ShieldParticle:GameObject;
private var shieldParticleClone:GameObject;

public var CoinParticle:GameObject;
private var coinParticleClone:GameObject;

static var coins:int;

function Start () {

	//Need camera component for boost speed effect
	camera1=GameObject.FindGameObjectWithTag('MainCamera').GetComponent(Camera);
	
	//Shield surrounding player is a game object which is deactivated to start with
	playerShield=GameObject.FindGameObjectWithTag('ShieldPlayer');
	playerBoost=GameObject.FindGameObjectWithTag('BoostPlayer');
	playerShield.active=false;
	playerBoost.active=false;
	
	BoostMode=false;
	
	coins=0;
	
}


function Update () {

		currentTime=Time.time;
		
		if (BoostMode==true){
			
			//If less than 5s since hitting boost then alter speed and camera
			if(Mathf.Abs((speedBoostStart - Time.time))<PlayerPrefs.GetInt("boostScore")) {
		
		   		 PlayerPhysics.playerVel=Mathf.Lerp (playerVelInitial,650, 25*Time.deltaTime);
		   		 camera1.fieldOfView=Mathf.Lerp (camera1.fieldOfView,100, 2*Time.deltaTime);
		   		 playerBoost.active=true;
		   		 
		   		 
		   		  }
		
		   	//If more than 5s since hitting boost then take speed and camera back to initial values
		   	 if(Mathf.Abs((speedBoostStart - Time.time))>PlayerPrefs.GetInt("boostScore")) {
		   		 PlayerPhysics.playerVel=Mathf.Lerp (650,playerVelInitial, 25*Time.deltaTime);
		   		 camera1.fieldOfView=Mathf.Lerp (camera1.fieldOfView,80, 2*Time.deltaTime);
		   		 playerBoost.active=false;
		   		  }
		   		  
		}
	
		if (ShieldMode==true){
		
				playerShield.active=true;
				
				if(Mathf.Abs((shieldBoostStart - Time.time))>PlayerPrefs.GetInt("shieldScore")) {
					playerShield.active=false;
					ShieldMode=false;
					  	
					}
		
		
		}
}

	//If we have collided with any speed boost
    function OnTriggerEnter(collider : Collider) {
	     if (collider.gameObject.tag == "SpeedBoost") {
			
			//Look for which speed boost we hit and destroy it
	   		 
	   		 GameObject.Destroy(collider.gameObject);
	   		 
	   		 //Set initial conditions before we hit speed boost so we know what to go back to
	   		 playerVelInitial=PlayerPhysics.playerVel;
	   		 speedBoostStart=Time.time;
	   		 
	   		 //Instantiate particle system prefab
	   		 boostParticleClone=Instantiate (BoostParticle, Vector3(collider.transform.position.x,collider.transform.position.y,collider.transform.position.z+40), transform.rotation);
	   		 boostParticleClone.GetComponent('ParticleSystem').particleSystem.Play();
	   		 
	   		 //For continuous events like lerping
	   		 BoostMode=true;
	       }
	       
	      if (collider.gameObject.tag == "ShieldBoost") {
	      
			//Look for which shield boost we hit and destroy it

	   		 GameObject.Destroy(collider.gameObject);
	   		 
	   		  //Set initial conditions before we hit
	   		 shieldBoostStart=Time.time;
	   		 
	   		 shieldParticleClone=Instantiate (ShieldParticle, Vector3(collider.transform.position.x,collider.transform.position.y,collider.transform.position.z+40), transform.rotation);
	   		 shieldParticleClone.GetComponent('ParticleSystem').particleSystem.Play();
	   		 
	   		 //For continuous events
	   		 ShieldMode=true;

	       }
	       
	       
	        if (collider.gameObject.tag == "Coin") {
	     
		      	//coin = GameObject.FindGameObjectWithTag('Coin'); 
				collider.gameObject.SetActive(false);
				coinParticleClone=Instantiate (CoinParticle, Vector3(collider.transform.position.x,collider.transform.position.y,collider.transform.position.z+50), transform.rotation);
		   		coinParticleClone.GetComponent('ParticleSystem').particleSystem.Play();
		   		coins++;
	       }

       }

       
