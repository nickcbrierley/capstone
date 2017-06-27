#pragma strict
var particle:GameObject;
var tub:Transform;
function Start () {
	
}

function Update () {
    if(Input.GetMouseButtonDown(0)) {
        var ray = Camera.main.ScreenPointToRay (Input.mousePosition); 
        var hit:RaycastHit;
        if (Physics.Raycast (ray, hit) && hit.transform.tag == "Tub") {
            tub.GetComponent.<Renderer>().material.SetColor("_Color", Color.white);
        }
    }
}
