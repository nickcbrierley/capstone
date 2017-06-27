#pragma strict
var target:Transform;
var tub:Transform;
var washdog:Transform;

function DeskClick(){
    var agent:UnityEngine.AI.NavMeshAgent = GetComponent.<UnityEngine.AI.NavMeshAgent>();
    if(Vector3.Distance(transform.position, target.position) < 7.5f){
        if(Input.GetMouseButtonDown(0)){
            agent.destination = tub.GetComponent.<Renderer>().bounds.center;
            yield WaitForSeconds(4);
            Wash();
        }
    }
}

function Wash(){
    var agent:UnityEngine.AI.NavMeshAgent = GetComponent.<UnityEngine.AI.NavMeshAgent>();
    if(Vector3.Distance(transform.position, tub.position) < 7.5f){
        var wash = Instantiate(washdog, tub.transform.position, tub.transform.rotation, tub.parent);
        this.gameObject.transform.GetChild(0).transform.GetChild(3).GetComponent.<Renderer>().enabled = false;
        yield WaitForSeconds(4);
        Destroy(wash.gameObject);
        this.gameObject.transform.GetChild(0).transform.GetChild(3).GetComponent.<Renderer>().enabled = true;
        ReturnToDesk();
    }
}

function ReturnToDesk() {
    var agent:UnityEngine.AI.NavMeshAgent = GetComponent.<UnityEngine.AI.NavMeshAgent>();
    agent.destination = target.GetComponent.<Renderer>().bounds.center;  
}

function Start () {
    var agent:UnityEngine.AI.NavMeshAgent = GetComponent.<UnityEngine.AI.NavMeshAgent>();
    agent.destination = target.GetComponent.<Renderer>().bounds.center;
}

function Update () {
    DeskClick();
}
