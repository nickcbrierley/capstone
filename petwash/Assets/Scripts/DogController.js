#pragma strict
var GermanShepard:GameObject;
var SpawnPoint:GameObject;

function Start() {
    Instantiate(this.GermanShepard, this.SpawnPoint.transform.position, this.SpawnPoint.transform.rotation);
}
function Update () {
}
