/*
	Score Controller
	2Beans
*/

#pragma strict

static var bankAccountCoins:int;

private var player : GameObject;

private var written:boolean;



public static var fireButton1 : GUITexture;
public static var fireButton2 : GUITexture;
public static var fireMissile : boolean;

public static var coinScore : GUIText;


function Start () {
	player = GameObject.FindGameObjectWithTag('PlayerObject');
	

	fireButton1=GameObject.FindGameObjectWithTag('GUIFire').guiTexture;
	fireButton2=GameObject.FindGameObjectWithTag('GUIFireDepressed').guiTexture;
	
	coinScore = GameObject.FindGameObjectWithTag('GUICoinScore').guiText;
	
	
	fireButton1.active = false;
	fireButton2.active = false;
	fireMissile = false;
	written = false;
	Time.timeScale = 1.0;
}

function Update () {

	//When passing 5000m, Bank the amount of coins collected
	if(player.transform.position.z>5000){
		AddToAccount(TokenEffects.coins);
	}
	
	//Display the coins collected in the level so far in the appropriate GUI element	
	//Remove this IF statement later
	if(player.transform.position.z<5000) {
		coinScore.text=String.Format("{0}", TokenEffects.coins);
	}
	
	if(KillMode.killMode){
	
		if (fireButton2.active == false){
			fireButton1.active = true;
			}

		TargetPhysics.targetVel = PlayerPhysics.playerVel;
		
		if (Input.touchCount > 0 ) {
			for (var touch : Touch in Input.touches) {
				if (fireButton1.HitTest(touch.position)) {
					fireButton1.active = false;
					fireButton2.active = true;
					fireMissile = true;
					
					if(touch.phase == TouchPhase.Ended) {
						fireButton2.active = true;
						TokenEffects.coins=TokenEffects.coins+GUIController.bonusScore;

					}
					
				}
			}
		}

	}else{
		fireButton2.active = false;
		fireButton1.active = false;
		fireMissile = false;
	}
	
	
}

//At the 5000m bank point, add the banked coins to the coin account total.
function AddToAccount(myLevelCoins) { 

	var key : String = "coinsAccount"; 
	var levelCoins: int = myLevelCoins;
	
	bankAccountCoins = PlayerPrefs.GetInt(key)+levelCoins;

	//Only want to write this once hence the written boolean
	if( PlayerPrefs.HasKey(key) && written==false ) {
	
		PlayerPrefs.SetInt( key, bankAccountCoins);
		written=true;

	} else if (!PlayerPrefs.HasKey(key) && written==false) {
    	PlayerPrefs.SetInt( key, levelCoins );
	}
	 
	PlayerPrefs.Save();
}