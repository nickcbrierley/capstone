#pragma strict
var target:Transform;
var tub:Transform;

function OnMouseOver(){
    var agent:UnityEngine.AI.NavMeshAgent = GetComponent.<UnityEngine.AI.NavMeshAgent>();
    if(Vector3.Distance(transform.position, target.position) < 7.5f){
        if(Input.GetMouseButtonDown(0)){
            agent.destination = tub.GetComponent.<Renderer>().bounds.center;
            print(Vector3.Distance(transform.position, target.position));
        }
    }
}

function Start () {
    var agent:UnityEngine.AI.NavMeshAgent = GetComponent.<UnityEngine.AI.NavMeshAgent>();
    agent.destination = target.GetComponent.<Renderer>().bounds.center;
}

function Update () {
    OnMouseOver();
}
