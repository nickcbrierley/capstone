#pragma strict
var Dog:Transform;
var SpawnPoint:Transform;
var Parent:Transform;

function spawn() {
    Instantiate(Dog, this.SpawnPoint.transform.position, Dog.transform.rotation, Parent);
}

function Start () {
    spawn();
}

function Update () {
	
}
