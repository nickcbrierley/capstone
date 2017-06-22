#pragma strict
var target:Transform;
var tub:Transform;

function Start () {
    var agent:UnityEngine.AI.NavMeshAgent = GetComponent.<UnityEngine.AI.NavMeshAgent>();
    agent.destination = target.position;
    agent.updateRotation = false;
}

function Update () {
}
