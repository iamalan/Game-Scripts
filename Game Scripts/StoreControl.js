#pragma strict

public static var storeScreen : GameObject;

public static var boostScore:int;
public static var shieldScore:int;
private var tapjoyScore:int;
private var boostCostValue:int;
private var shieldCostValue:int;

public static var storeEnabled:boolean;

private var reset : GUITexture;
private var storeBoost1 : GUITexture;
private var storeBoost2 : GUITexture;
private var storeShield1 : GUITexture;
private var storeShield2 : GUITexture;
private var storeTapjoy1 : GUITexture;
private var storeTapjoy2 : GUITexture;
private var storeMenu1 : GUITexture;
private var storeMenu2 : GUITexture;

private var storeCoinsBalance:GUIText;
private var boostCost:GUIText;
private var shieldCost:GUIText;

private var a1 : GUITexture;private var a2 : GUITexture;private var a3 : GUITexture;private var a4 : GUITexture;private var a5 : GUITexture;
private var b1 : GUITexture;private var b2 : GUITexture;private var b3 : GUITexture;private var b4 : GUITexture;private var b5 : GUITexture;
private var c1 : GUITexture;private var c2 : GUITexture;private var c3 : GUITexture;private var c4 : GUITexture;private var c5 : GUITexture;

function Start () {

	storeScreen=GameObject.FindGameObjectWithTag('StoreScreen');
	
	reset=GameObject.FindGameObjectWithTag('Reset').guiTexture;
	storeBoost1=GameObject.FindGameObjectWithTag('StoreBoost1').guiTexture;
	storeBoost2=GameObject.FindGameObjectWithTag('StoreBoost2').guiTexture;
	storeShield1=GameObject.FindGameObjectWithTag('StoreShield1').guiTexture;
	storeShield2=GameObject.FindGameObjectWithTag('StoreShield2').guiTexture;
	storeTapjoy1=GameObject.FindGameObjectWithTag('StoreTapjoy1').guiTexture;
	storeTapjoy2=GameObject.FindGameObjectWithTag('StoreTapjoy2').guiTexture;
	storeMenu1=GameObject.FindGameObjectWithTag('StoreMenu1').guiTexture;
	storeMenu2=GameObject.FindGameObjectWithTag('StoreMenu2').guiTexture;
	
	storeCoinsBalance=GameObject.FindGameObjectWithTag('StoreCoinsBalance').guiText;
	
	a1=GameObject.FindGameObjectWithTag('a1').guiTexture;
	a2=GameObject.FindGameObjectWithTag('a2').guiTexture;
	a3=GameObject.FindGameObjectWithTag('a3').guiTexture;
	a4=GameObject.FindGameObjectWithTag('a4').guiTexture;
	a5=GameObject.FindGameObjectWithTag('a5').guiTexture;
	b1=GameObject.FindGameObjectWithTag('b1').guiTexture;
	b2=GameObject.FindGameObjectWithTag('b2').guiTexture;
	b3=GameObject.FindGameObjectWithTag('b3').guiTexture;
	b4=GameObject.FindGameObjectWithTag('b4').guiTexture;
	b5=GameObject.FindGameObjectWithTag('b5').guiTexture;
	c1=GameObject.FindGameObjectWithTag('c1').guiTexture;
	c2=GameObject.FindGameObjectWithTag('c2').guiTexture;
	c3=GameObject.FindGameObjectWithTag('c3').guiTexture;
	c4=GameObject.FindGameObjectWithTag('c4').guiTexture;
	c5=GameObject.FindGameObjectWithTag('c5').guiTexture;
	
	boostCost=GameObject.FindGameObjectWithTag('BoostCost').guiText;
	shieldCost=GameObject.FindGameObjectWithTag('ShieldCost').guiText;
	
	storeScreen.active=false;
	storeEnabled = false;
	
	boostScore=PlayerPrefs.GetInt("boostScore");
	shieldScore=PlayerPrefs.GetInt("shieldScore");
	tapjoyScore=PlayerPrefs.GetInt("tapjoyScore");
}

function Update () {

	storeCoinsBalance.text=String.Format("{0}", PlayerPrefs.GetInt("coinsAccount"));
	boostCost.text=String.Format("{0}", boostCostValue);
	shieldCost.text=String.Format("{0}", shieldCostValue);
	
	for (var touch : Touch in Input.touches) {
	
		//Store Menu
		if (storeMenu1.HitTest (touch.position) && storeEnabled==true) {
				if(touch.phase == TouchPhase.Began) {
					storeMenu2.active=true;
					storeMenu1.active=false;
	
				}
				if(touch.phase == TouchPhase.Ended) {
					Application.LoadLevel(0);
	
					storeScreen.active=false;
					storeMenu2.active=false;
					storeMenu1.active=true;
	
				}
			}
			
		//Boost Press
		if (storeBoost1.HitTest (touch.position) && storeEnabled==true) {
				if(touch.phase == TouchPhase.Began) {
					storeBoost2.active=true;
					storeBoost1.active=false;
					boostScore=PlayerPrefs.GetInt("boostScore");
					boostScore++;
					PlayerPrefs.SetInt( "coinsAccount", PlayerPrefs.GetInt("coinsAccount")-boostCostValue );
					AddBoostLevel();
				}
				if(touch.phase == TouchPhase.Ended) {
					storeBoost2.active=false;
					storeBoost1.active=true;
				}
			}
			
		//Shield Press
		if (storeShield1.HitTest (touch.position) && storeEnabled==true) {
				if(touch.phase == TouchPhase.Began) {
					storeShield2.active=true;
					storeShield1.active=false;
					shieldScore=PlayerPrefs.GetInt("shieldScore");
					shieldScore++;
					PlayerPrefs.SetInt( "coinsAccount", PlayerPrefs.GetInt("coinsAccount")-shieldCostValue );
					AddShieldLevel();

				}
				if(touch.phase == TouchPhase.Ended) {
					storeShield2.active=false;
					storeShield1.active=true;
				}
			}
			
		//Tapjoy Press
		if (storeTapjoy1.HitTest (touch.position) && storeEnabled==true) {
				if(touch.phase == TouchPhase.Began) {
					storeTapjoy2.active=true;
					storeTapjoy1.active=false;
					tapjoyScore=PlayerPrefs.GetInt("tapjoyScore");
					tapjoyScore++;
					AddTapjoyLevel();
				}
				if(touch.phase == TouchPhase.Ended) {
					storeTapjoy2.active=false;
					storeTapjoy1.active=true;
				}
			}		
		//Reset Press - This is GOD mode!
		if (reset.HitTest (touch.position) && storeEnabled==true) {

				if(touch.phase == TouchPhase.Ended) {
				PlayerPrefs.SetInt( "coinsAccount", 1000 );
				PlayerPrefs.SetInt( "boostScore", 0);
				PlayerPrefs.SetInt( "shieldScore", 0);
				PlayerPrefs.SetInt( "tapjoyScore", 0);
				boostScore=PlayerPrefs.GetInt("boostScore");
				shieldScore=PlayerPrefs.GetInt("shieldScore");
				tapjoyScore=PlayerPrefs.GetInt("tapjoyScore");
				}
			}	
	
	}

//Boost Bars//////////////////////////////////////////////////////////////////////////////
	if (boostScore==0){
		a1.active=false;a2.active=false;a3.active=false;a4.active=false;a5.active=false;
		boostCostValue=50;
	}
	if (boostScore==1){
		a1.active=true;a2.active=false;a3.active=false;a4.active=false;a5.active=false;
		boostCostValue=75;
	}
	if (boostScore==2){
		a1.active=true;a2.active=true;a3.active=false;a4.active=false;a5.active=false;
		boostCostValue=100;
	}
	if (boostScore==3){
		a1.active=true;a2.active=true;a3.active=true;a4.active=false;a5.active=false;
		boostCostValue=200;
	}
	if (boostScore==4){
		a1.active=true;a2.active=true;a3.active=true;a4.active=true;a5.active=false;
		boostCostValue=400;
	}
	if (boostScore>=5){
		a1.active=true;a2.active=true;a3.active=true;a4.active=true;a5.active=true;
		boostCostValue=800;
	}

//Shield Bars//////////////////////////////////////////////////////////////////////////////
	if (shieldScore==0){
		b1.active=false;b2.active=false;b3.active=false;b4.active=false;b5.active=false;
		shieldCostValue=50;
	}
	if (shieldScore==1){
		b1.active=true;b2.active=false;b3.active=false;b4.active=false;b5.active=false;
		shieldCostValue=75;
	}
	if (shieldScore==2){
		b1.active=true;b2.active=true;b3.active=false;b4.active=false;b5.active=false;
		shieldCostValue=100;
	}
	if (shieldScore==3){
		b1.active=true;b2.active=true;b3.active=true;b4.active=false;b5.active=false;
		shieldCostValue=200;
	}
	if (shieldScore==4){
		b1.active=true;b2.active=true;b3.active=true;b4.active=true;b5.active=false;
		shieldCostValue=400;
	}
	if (shieldScore>=5){
		b1.active=true;b2.active=true;b3.active=true;b4.active=true;b5.active=true;
		shieldCostValue=800;
	}


//Tapjoy Bars//////////////////////////////////////////////////////////////////////////////
	if (tapjoyScore==0){
		c1.active=false;c2.active=false;c3.active=false;c4.active=false;c5.active=false;
	}
	if (tapjoyScore==1){
		c1.active=true;c2.active=false;c3.active=false;c4.active=false;c5.active=false;
	}
	if (tapjoyScore==2){
		c1.active=true;c2.active=true;c3.active=false;c4.active=false;c5.active=false;
	}
	if (tapjoyScore==3){
		c1.active=true;c2.active=true;c3.active=true;c4.active=false;c5.active=false;
	}
	if (tapjoyScore==4){
		c1.active=true;c2.active=true;c3.active=true;c4.active=true;c5.active=false;
	}
	if (tapjoyScore>=5){
		c1.active=true;c2.active=true;c3.active=true;c4.active=true;c5.active=true;
	}
}

function AddBoostLevel() { 
	
	PlayerPrefs.SetInt( "boostScore", boostScore);
	PlayerPrefs.Save();
	
}

function AddShieldLevel() { 
	
	PlayerPrefs.SetInt( "shieldScore", shieldScore);
	PlayerPrefs.Save();
	
}

function AddTapjoyLevel() { 
	
	PlayerPrefs.SetInt( "tapjoyScore", tapjoyScore);
	PlayerPrefs.Save();
	
}