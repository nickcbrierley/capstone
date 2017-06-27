#pragma strict
var target:Transform;
var tub:Transform;
var washdog:Transform;
var wallet:UnityEngine.UI.Text;
var currentMoney:int;

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
        this.gameObject.transform.GetChild(0).transform.GetChild(3).GetComponent.<Renderer>().enabled = true;
        Destroy(wash.gameObject);
        ReturnToDesk();
    }
}

function ReturnToDesk() {
    var agent:UnityEngine.AI.NavMeshAgent = GetComponent.<UnityEngine.AI.NavMeshAgent>();
    agent.destination = target.GetComponent.<Renderer>().bounds.center;  
    collectCash();
}

function collectCash() {
    var agent:UnityEngine.AI.NavMeshAgent = GetComponent.<UnityEngine.AI.NavMeshAgent>();
    if(Vector3.Distance(transform.position, target.GetComponent.<Renderer>().bounds.center) < 7.5f && Input.GetMouseButtonDown(0)){
        currentMoney += 22;
        agent.destination = Vector3(0,0,0);
        yield WaitForSeconds(4);
            Destroy(gameObject);
    }
}

function Start () {
    var agent:UnityEngine.AI.NavMeshAgent = GetComponent.<UnityEngine.AI.NavMeshAgent>();
    agent.destination = target.GetComponent.<Renderer>().bounds.center;
}

function Update () {
    DeskClick();
    collectCash();
    wallet.text = "$" + currentMoney.ToString();
}
