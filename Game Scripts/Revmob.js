import System.Collections.Generic;

private var APP_IDS = new Dictionary.<String, String>();
    // Just replace the ID below with your appID.
	APP_IDS["Android"] = "518a4d23f3c2593520000040";
	APP_IDS["IOS"] = "4fd619388d314b0008000213";
private var revmob:RevMob;

private var RM2:GameObject;

function Awake() {
	RM2=GameObject.FindGameObjectWithTag('RM2');

	Debug.Log("[RevMob Sample App - JavaScript] Starting Session");
	revmob = RevMob.Start(APP_IDS, "RM2");
	//revmob.SetTestingMode(RevMob.Test.WITH_ADS);
	
}

function Start () {


	//if(GUI.Button(new Rect(20, 20, 300, 50), "Show Fullscreen")) {
		//if ( revmob.IsDevice() ) {
			Debug.Log("[RevMob Sample App - JavaScript] Show Fullscreen");
			revmob.ShowFullscreen();
		//}
	//}
}

function AdDidReceive(adUnitType) {
	Debug.Log("[RevMob Sample App - JavaScript] Ad did received");
}

function AdDidFail(adUnitType) {
	Debug.Log("[RevMob Sample App - JavaScript] Ad did received");
}

function AdDisplayed(adUnitType) {
	Debug.Log("[RevMob Sample App - JavaScript] Ad displayed");
}

function UserClickedInTheAd(adUnitType) {
	Debug.Log("[RevMob Sample App - JavaScript] Ad clicked");
}

function UserClosedTheAd(adUnitType) {
	Debug.Log("[RevMob Sample App - JavaScript] Ad closed");
}