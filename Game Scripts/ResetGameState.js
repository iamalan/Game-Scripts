
public static function ResetGameState() {
	TargetPhysics.targetVel = 585;
	KillMode.killMode = false;
	ScoreController.fireButton1.active=false;
	ScoreController.fireButton2.active=false;
	KillMode.killMode=false;
	SmoothFollow.height = 75;
	MenuScreen.isMenu = true;
	TerrainGen.menuTransition = true;
}