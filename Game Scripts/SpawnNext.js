#pragma strict

var obja : GameObject; 
obja = GameObject.Find("Terrain Generator");
var terrainGen : TerrainGen;
terrainGen = obja.GetComponent(typeof(TerrainGen)) as TerrainGen;

function OnTriggerExit(other : Collider){

	terrainGen.InstantiatePlatform();
	print("made a platform!");
}