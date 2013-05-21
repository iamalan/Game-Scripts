#pragma strict

private var player : GameObject;

private var mainBoosts1:GUITexture;
private var mainBoosts2:GUITexture;
private var mainHelp1:GUITexture;
private var mainHelp2:GUITexture;
private var mainInfo1:GUITexture;
private var mainInfo2:GUITexture;


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
private var deathTargetsEliminated:GUIText;
private var deathCoinsCollected:GUIText;

public static var GUIScore:GUIText;
public static var Score:int;

private var bonusScoreText:GUIText;
private var bonusScoreMax:int;
public static var bonusScore:int;

public static var isDeathScreen:boolean;

public static var updateBanner:GUITexture;
public static var updateText:GUIText;
private var doOnce:boolean;
private var startTime : float;

private var deathRank2:GUITexture;
private var deathRank3:GUITexture;
private var deathRank4:GUITexture;
private var deathRank5:GUITexture;
private var deathRank6:GUITexture;
private var newRank:GUIText;
private var written:boolean;

private var menuScreenEnabled:boolean;


function Start () {
	bonusScoreMax=50;
	bonusScore=bonusScoreMax;
	bonusScoreText=GameObject.FindGameObjectWithTag('BonusScoreText').guiText;

	mainBoosts1=GameObject.FindGameObjectWithTag('MainBoosts1').guiTexture;
	mainBoosts2=GameObject.FindGameObjectWithTag('MainBoosts2').guiTexture;
	mainHelp1=GameObject.FindGameObjectWithTag('MainHelp1').guiTexture;
	mainHelp2=GameObject.FindGameObjectWithTag('MainHelp2').guiTexture;
	mainInfo1=GameObject.FindGameObjectWithTag('MainInfo1').guiTexture;
	mainInfo2=GameObject.FindGameObjectWithTag('MainInfo2').guiTexture;
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
	deathTargetsEliminated=GameObject.FindGameObjectWithTag('DeathTargetsEliminated').guiText;
	deathCoinsCollected=GameObject.FindGameObjectWithTag('DeathCoinsCollected').guiText;

	GUIScore = GameObject.FindGameObjectWithTag('GUIScore').guiText;
	
	updateBanner=GameObject.FindGameObjectWithTag('UpdateBanner').guiTexture;
	updateText=GameObject.FindGameObjectWithTag('UpdateText').guiText;
	
	deathRank2=GameObject.FindGameObjectWithTag('DeathRank2').guiTexture;
	deathRank3=GameObject.FindGameObjectWithTag('DeathRank3').guiTexture;
	deathRank4=GameObject.FindGameObjectWithTag('DeathRank4').guiTexture;
	deathRank5=GameObject.FindGameObjectWithTag('DeathRank5').guiTexture;
	deathRank6=GameObject.FindGameObjectWithTag('DeathRank6').guiTexture;
	newRank=GameObject.FindGameObjectWithTag('NewRank').guiText;


	pauseEnabled = false;
	deathEnabled = false;
	
	isDeathScreen=false;

	guiHud=GameObject.FindGameObjectWithTag('GUIHUD').guiTexture;
	guiScore=GameObject.FindGameObjectWithTag('GUIScore').guiText;
	guiCoinScore=GameObject.FindGameObjectWithTag('GUICoinScore').guiText;

	pauseScreen.active=false;
	deathScreen.active=false;
	mainBoosts1.active=false;
	mainTapToPlay.active=false;
	mainTitle.active=false;
	mainBackground.active=false;
	
	updateBanner.active=false;
	updateText.active=false;
	doOnce = false;


	Score=0;
	GUIScore.text=String.Format("{0}", Score);	
	startTime = 0.0;
	
	deathRank2.active=false;
	deathRank3.active=false;
	deathRank4.active=false;
	deathRank5.active=false;
	deathRank6.active=false;
	written = false;
	
	menuScreenEnabled=true;
	MenuScreen.isMenu=true;
}

function Update () {

	if (menuScreenEnabled){
			pauseButton.active=true;
			guiHud.active=true;
			GUIScore.active=true;
			bonusScoreText.active=false;
			guiCoinScore.active=true;
	
			mainBoosts1.active=true;
			mainBoosts2.active=true;
			mainHelp1.active=true;
			mainHelp2.active=true;
			mainInfo1.active=true;
			mainInfo2.active=true;
	
			
			mainTapToPlay.active=true;
			mainTitle.active=true;
			mainBackground.active=true;
		
		}
		
	if (isDeathScreen){
			SetHighScore(Score);
			//Debug.Log("Just deposited " + Score + " much " );
			//Debug.Log("Number shot down is: " + Score);
			//Debug.Log("Number shot down IN BANK is: " + PlayerPrefs.GetInt("highScore"));
			newRank.text = String.Format("{0}", PlayerPrefs.GetInt("highScore"));
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
			updateText.active=false;
			updateBanner.active=false;
	
	
			deathTargetsEliminated.text=String.Format("{0}", Score);
			deathCoinsCollected.text=String.Format("{0}", TokenEffects.coins);
					
	}
	
	//Touch Controls of the Various Screens//////////////////////////////////////////////////////////
	/////////////////////////////////////////////////////////////////////////////////////////////////
	
	//Main Menu///////////////////////////////////////////////////////////////////////////////
	for (var touch : Touch in Input.touches) {
	
		//Hit store button
		if (mainBoosts1.HitTest (touch.position) && menuScreenEnabled==true) {
	
					if(touch.phase == TouchPhase.Began) {
						mainBoosts1.active=false;
						mainBoosts2.active=true;
	
					}
					
					if(touch.phase == TouchPhase.Ended) {
						menuScreenEnabled=false;
						mainBoosts1.active=false;
						mainBoosts2.active=false;
						mainHelp1.active=false;
						mainHelp2.active=false;
						mainInfo1.active=false;
						mainInfo2.active=false;
			
						mainTapToPlay.active=false;
						mainTitle.active=false;
						mainBackground.active=false;
		
						pauseButton.active=false;
						guiHud.active=false;
						GUIScore.active=false;
						deathTargetsEliminated.active=true;
						deathCoinsCollected.active=true;
						guiCoinScore.active=false;
	
						StoreControl.storeEnabled=true;
						StoreControl.storeScreen.active=true;
						
	
					}
			}
			
		//We have not touched any of the menu buttons so probably have tapped the jet
		else if (Input.touchCount > 0 && menuScreenEnabled==true){
					MenuScreen.isMenu = false;
					menuScreenEnabled=false;
					SmoothFollow.height = 15;
					SmoothFollow.distance = 40;
					mainBoosts1.active=false;
					mainBoosts2.active=false;
					mainHelp1.active=false;
					mainHelp2.active=false;
					mainInfo1.active=false;
					mainInfo2.active=false;
		
					mainTapToPlay.active=false;
					mainTitle.active=false;
					mainBackground.active=false;
				}
	
		}
		
	//Pause Menu////////////////////////////////////////////////////	
	for (var touch : Touch in Input.touches) {
	
		if (pauseButton.HitTest (touch.position)) {
					pauseScreen.active=true;
					pauseEnabled=true;
					updateText.active=false;
					updateBanner.active=false;
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
						Application.LoadLevel(0);
						ResetGameState.ResetGameState();
	
					}
				}
	
		}
	
	//Death Menu////////////////////////////////////////////////////	
	for (var touch : Touch in Input.touches) {
	
		if (deathMenu1.HitTest (touch.position) && deathEnabled==true) {
					if(touch.phase == TouchPhase.Began) {
						deathMenu2.active=true;
						deathMenu1.active=false;
					}
					if(touch.phase == TouchPhase.Ended) {
						Application.LoadLevel(0);
						ResetGameState.ResetGameState();
	
						deathScreen.active=false;
						deathTargetsEliminated.active=false;
						deathCoinsCollected.active=false;
					}
	
				}
		}
	
	
	//Kill Mode Bonus	
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
			 
	
	//Banner Text when new Target comes in
	if(TargetPhysics.isNewTarget && !doOnce){
		updateText.active=true;
		updateBanner.active=true;
		startTime = Time.time;
		doOnce = true;
	}else if (!TargetPhysics.isNewTarget){
		doOnce = false;
	}
	
	if (updateText.active && (Time.time - startTime) > 1.5) {
		updateText.active=false;
		updateBanner.active=false;
		//Debug.Log("StartTime in second if is: " + startTime);			
	}	
	
}





function ReduceBonusScore(){

	yield WaitForSeconds(.1);

	if (bonusScore>0){
		bonusScore--;
	}
}

function SetHighScore(myHighScore) { 

	var key : String = "highScore"; 
	var highScore: int = myHighScore;

	//Only want to write this once hence the written boolean
	if( PlayerPrefs.HasKey(key) && written==false && (PlayerPrefs.GetInt(key) < highScore) ) {
	
		PlayerPrefs.SetInt( key, highScore);
		written=true;

	} else if (!PlayerPrefs.HasKey(key) && written==false) {
    	PlayerPrefs.SetInt( key, highScore );
	}
	 
	PlayerPrefs.Save();
	
}