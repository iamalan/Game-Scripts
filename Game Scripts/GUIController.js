#pragma strict

private var player : GameObject;

private var mainOptions:GUITexture;
private var mainTapToPlay:GUITexture;
private var mainTitle:GUITexture;
private var mainBackground:GUITexture;

private var pauseScreen : GameObject;
private var deathScreen : GameObject;

private var pauseEnabled:boolean;
private var deathEnabled:boolean;


private var pauseResume1 : GUITexture;
private var pauseResume2 : GUITexture;
private var pauseMenu1 : GUITexture;
private var pauseMenu2 : GUITexture;

public static var pauseButton : GUITexture;
public static var guiHud : GUITexture;
public static var guiCoinScore:GUIText;
public static var guiScore:GUIText;

private var menu : GUITexture;
private var deathMenu1 : GUITexture;
private var deathMenu2 : GUITexture;
private var deathRestart1 : GUITexture;
private var deathRestart2 : GUITexture;
private var deathTargetsEliminated:GUIText;
private var deathCoinsCollected:GUIText;
private var deathDistanceTravelled:GUIText;

public static var GUIScore:GUIText;
public static var Score:int;

private var bonusScoreText:GUIText;
private var bonusScoreMax:int;
public static var bonusScore:int;



function Start () {
	bonusScoreMax=50;
	bonusScore=bonusScoreMax;
	bonusScoreText=GameObject.FindGameObjectWithTag('BonusScoreText').guiText;
	
	mainOptions=GameObject.FindGameObjectWithTag('MainOptions').guiTexture;
	mainTapToPlay=GameObject.FindGameObjectWithTag('MainTapToPlay').guiTexture;
	mainTitle=GameObject.FindGameObjectWithTag('MainTitle').guiTexture;
	mainBackground=GameObject.FindGameObjectWithTag('MainBackground').guiTexture;

	player = GameObject.FindGameObjectWithTag('PlayerObject');
		
	pauseScreen=GameObject.FindGameObjectWithTag('PauseScreen');
	deathScreen=GameObject.FindGameObjectWithTag('DeathScreen');
	
	pauseResume1=GameObject.FindGameObjectWithTag('PauseResume1').guiTexture;
	pauseResume2=GameObject.FindGameObjectWithTag('PauseResume2').guiTexture;
	pauseMenu1=GameObject.FindGameObjectWithTag('PauseMenu1').guiTexture;
	pauseMenu2=GameObject.FindGameObjectWithTag('PauseMenu2').guiTexture;
	pauseButton=GameObject.FindGameObjectWithTag('GUIPause').guiTexture;
	
	deathMenu1=GameObject.FindGameObjectWithTag('DeathMenu1').guiTexture;
	deathMenu2=GameObject.FindGameObjectWithTag('DeathMenu2').guiTexture;
	menu=GameObject.FindGameObjectWithTag('MainMenuScreen').guiTexture;
	deathRestart1=GameObject.FindGameObjectWithTag('DeathRestart1').guiTexture;
	deathRestart2=GameObject.FindGameObjectWithTag('DeathRestart2').guiTexture;
	deathTargetsEliminated=GameObject.FindGameObjectWithTag('DeathTargetsEliminated').guiText;
	deathCoinsCollected=GameObject.FindGameObjectWithTag('DeathCoinsCollected').guiText;
	deathDistanceTravelled=GameObject.FindGameObjectWithTag('DeathDistanceTravelled').guiText;
	
	GUIScore = GameObject.FindGameObjectWithTag('GUIScore').guiText;
	
	pauseEnabled = false;
	deathEnabled = false;
	
	guiHud=GameObject.FindGameObjectWithTag('GUIHUD').guiTexture;
	guiScore=GameObject.FindGameObjectWithTag('GUIScore').guiText;
	guiCoinScore=GameObject.FindGameObjectWithTag('GUICoinScore').guiText;
	
	pauseScreen.active=false;
	deathScreen.active=false;
	mainOptions.active=false;
	mainTapToPlay.active=false;
	mainTitle.active=false;
	mainBackground.active=false;
	
	
	Score=0;
	GUIScore.text=String.Format("{0}", Score);	
	

}

function Update () {

	if(MenuScreen.isMenu){
		pauseButton.active=true;
		guiHud.active=true;
		GUIScore.active=true;
		bonusScoreText.active=false;
		guiCoinScore.active=true;
		
		mainOptions.active=true;
		mainTapToPlay.active=true;
		mainTitle.active=true;
		mainBackground.active=true;
		
				
		//Main Menu Script
		if (Input.touchCount > 0){
			MenuScreen.isMenu = false;
			SmoothFollow.height = 15;
			SmoothFollow.distance = 40;
			mainOptions.active=false;
			mainTapToPlay.active=false;
			mainTitle.active=false;
			mainBackground.active=false;
		}

		//menu.active = true;
	}else{
		
		//DEATH SCREEN - Replace this IF statement later
		if (player.transform.position.z>70000) {
				deathScreen.active=true;	
				deathEnabled=true;
				Time.timeScale = 0.0;
				ScoreController.coinScore.active=false;
				pauseButton.active=false;
				guiHud.active=false;
				bonusScoreText.active=false;
				GUIScore.active=false;
				ScoreController.fireButton1.active=false;
				ScoreController.fireButton2.active=false;
				deathTargetsEliminated.active=true;
				deathCoinsCollected.active=true;
				deathDistanceTravelled.active=true;
				
				
				deathTargetsEliminated.text=String.Format("{0}", Score);
				deathCoinsCollected.text=String.Format("{0}", TokenEffects.coins);
				deathDistanceTravelled.text=String.Format("{0}", player.transform.position.z/10000 + " km");
				
				
				
			}
	
		//Pause functionality
		for (var touch : Touch in Input.touches) {
		
			//PAUSE SCREEN
			if (pauseButton.HitTest (touch.position)) {
				pauseScreen.active=true;
				pauseEnabled=true;
				Time.timeScale = 0.0;
			}
			
			//Pause > Resume	  
			if (pauseResume1.HitTest (touch.position) && pauseEnabled==true) {
				if(touch.phase == TouchPhase.Began) {
					pauseResume2.active=true;
					pauseResume1.active=false;
				}
				if(touch.phase == TouchPhase.Ended) {
					Time.timeScale = 1.0;
					pauseEnabled=false;
					pauseScreen.active=false;
					pauseResume2.active=false;
					pauseResume1.active=true;
				}
		
			}
			
			//Pause > Menu
			if (pauseMenu1.HitTest (touch.position) && pauseEnabled==true) {
				if(touch.phase == TouchPhase.Began) {
					pauseMenu2.active=true;
					pauseMenu1.active=false;
	
				}
				if(touch.phase == TouchPhase.Ended) {
					//Application.LoadLevel(0);
					pauseEnabled=false;
					pauseScreen.active=false;
					pauseMenu2.active=false;
					pauseMenu1.active=true;
					StoreControl.storeEnabled=true;
					StoreControl.storeScreen.active=true;
					
					pauseButton.active=false;
					guiHud.active=false;
					guiCoinScore.active=false;
					guiScore.active=false;
					
					KillMode.killMode=false;
					ScoreController.fireButton1.active=false;
					ScoreController.fireButton2.active=false;
	
				}
			}
	
			//Death > Restart
			if (deathRestart1.HitTest (touch.position) && deathEnabled==true) {
				if(touch.phase == TouchPhase.Began) {
					deathRestart2.active=true;
					deathRestart1.active=false;
				}
				if(touch.phase == TouchPhase.Ended) {
					Application.LoadLevel(0);
					ResetGameState.ResetGameState();
					
					deathScreen.active=false;
					deathRestart2.active=false;
					deathRestart1.active=true;
					deathTargetsEliminated.active=false;
					deathCoinsCollected.active=false;
					deathDistanceTravelled.active=false;
					//Now pretend we touched the button
//					MenuScreen.isMenu = false;
//					SmoothFollow.height = 15;
//					SmoothFollow.distance = 40;
//					mainOptions.active=false;
//					mainTapToPlay.active=false;
//					mainTitle.active=false;
//					mainBackground.active=false;
				}
			}
			
			//Death>Menu
			if (deathMenu1.HitTest (touch.position) && deathEnabled==true) {
				if(touch.phase == TouchPhase.Began) {
					deathMenu2.active=true;
					deathMenu1.active=false;
				}
				if(touch.phase == TouchPhase.Ended) {
					Application.LoadLevel(0);
					ResetGameState.ResetGameState();
					
					deathScreen.active=false;
					deathRestart2.active=false;
					deathRestart1.active=true;
					deathTargetsEliminated.active=false;
					deathCoinsCollected.active=false;
					deathDistanceTravelled.active=false;
				}
			
			}
	
					  		   		 
		 }
		 
		 
		 if (KillMode.killMode==true){
	
			 	bonusScoreText.active=true;
			 	bonusScoreText.text="+" + String.Format("{0}",bonusScore);
			 	
				 if (PlayerPhysics.isFired==false){
					 ReduceBonusScore();
					 
				 }
				 
			}
		
		 else {
			 bonusScore=bonusScoreMax;
			 bonusScoreText.active=false;
		 }
	}
}

function ReduceBonusScore(){

	yield WaitForSeconds(.1);
	
	if (bonusScore>0){
		bonusScore--;
	}
}

