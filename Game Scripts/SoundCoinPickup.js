#pragma strict

var soundMissileLaunch:GameObject;
var soundMissileLaunchPlayed:boolean;
var soundKillMode:GameObject;
var soundKillModePlayed:boolean;
var soundTargetExplosion:GameObject;
var soundTargetExplosionPlayed:boolean;

var target:GameObject;
var player:GameObject;

function Start () {

	target=GameObject.FindGameObjectWithTag('TargetObject');
	
	
	soundMissileLaunch=GameObject.FindGameObjectWithTag('SoundMissileLaunch');
	soundKillMode=GameObject.FindGameObjectWithTag('SoundKillMode');
	soundTargetExplosion=GameObject.FindGameObjectWithTag('SoundTargetExplosion');
	
	
	soundMissileLaunchPlayed=false;
	soundMissileLaunchPlayed=false;
	soundTargetExplosionPlayed=false;

}

function Update () {

	
	if(PlayerPhysics.isFired == true && !soundMissileLaunchPlayed){
		soundMissileLaunchPlayed=true;
		soundMissileLaunch.audio.Play();
		}
		
	if(KillMode.killMode == true && !soundKillModePlayed){
		soundKillModePlayed=true;
		soundMissileLaunchPlayed=false;
		soundTargetExplosionPlayed=false;		
		soundKillMode.audio.Play();
		}
		
	if(PlayerPhysics.isFired == true){
		soundKillMode.audio.Stop();
	}
	
	if(EnemyRespawn.isEnemy==false &&  EnemyRespawn.targetsShotDown!=0 && !soundTargetExplosionPlayed){
		soundTargetExplosionPlayed=true;
		soundTargetExplosion.audio.Play();
	}
	

	//If enemy not present, reset sound states	
	if (EnemyRespawn.isEnemy == false){
		ResetAudioStates();
	}
	

}


function OnTriggerEnter  (otherObj : Collider) {
    // next line requires an AudioSource component on this gameobject
    print("Detect coin collision");
    
    if (otherObj.gameObject.tag == "Coin") {
    	audio.Play();
    }
    
    if (otherObj.gameObject.tag != "Coin") {
    
    }
    
}

//Reset the state variables
function ResetAudioStates(){
	soundKillModePlayed=false;
	soundTargetExplosionPlayed=true;

}