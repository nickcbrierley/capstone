var tubButton:UnityEngine.UI.Button;
var grid:Transform;
var pauseMenu:Transform;
var tub:Transform;
var Parent:Transform;
var spawn = false;
var shopButton:UnityEngine.UI.Button;
var shopFloor:Transform;
var tile = false;
var wallet:UnityEngine.UI.Text;


function Start () {
    var tub: UnityEngine.UI.Button = tubButton.GetComponent.<UnityEngine.UI.Button>();
    var shop: UnityEngine.UI.Button = shopButton.GetComponent.<UnityEngine.UI.Button>();
    shop.onClick.AddListener(addShop);
    tub.onClick.AddListener(createGrid);
}

function createGrid () {
    spawn = true;
    var grids:GameObject[];
    grids = GameObject.FindGameObjectsWithTag("Grid");
    for(var go:GameObject in grids){
        go.GetComponent.<Renderer>().enabled = true;
        pauseMenu.gameObject.SetActive(false);
    }
}

function addShop() {
    var grids:GameObject[];
    grids = GameObject.FindGameObjectsWithTag("Grid");
    for(var go:GameObject in grids) {
        go.GetComponent.<Renderer>().enabled = true;
        pauseMenu.gameObject.SetActive(false);
        tile = true;
    }
}

function Update () {
    var grids:GameObject[];
    grids = GameObject.FindGameObjectsWithTag("Grid");
    var ray = Camera.main.ScreenPointToRay (Input.mousePosition); 
    var hit:RaycastHit;
    
    if(Input.GetMouseButtonDown(0) && spawn == true) {
        if (Physics.Raycast(ray, hit) && hit.transform.tag == "Floor") {
            hit.point = hit.collider.gameObject.transform.position + Vector3(-6,12,-12);
            Instantiate(tub, hit.point, tub.transform.rotation, Parent);
            spawn = false;
            for(var go:GameObject in grids){
                go.GetComponent.<Renderer>().enabled = false;
            }
        Time.timeScale = 1;
    }

    if(Input.GetMouseButtonDown(0) && tile == true) {
        if (Physics.Raycast(ray, hit) && hit.transform.tag == "Floor") {
            hit.collider.gameObject.GetComponent.<Renderer>().enabled = true;
            hit.collider.gameObject.transform.GetChild(0).GetComponent.<Renderer>().enabled = true;
            hit.collider.gameObject.transform.GetChild(1).GetComponent.<Renderer>().enabled = true;
            hit.collider.gameObject.transform.GetChild(2).GetComponent.<Renderer>().enabled = true;
            hit.collider.gameObject.transform.GetChild(3).GetComponent.<Renderer>().enabled = true;
            hit.collider.gameObject.transform.GetChild(4).GetComponent.<Renderer>().enabled = true;
            hit.collider.gameObject.transform.GetChild(5).GetComponent.<Renderer>().enabled = true;
            hit.collider.gameObject.transform.GetChild(6).GetComponent.<Renderer>().enabled = true;
            tile = false;
            Time.timeScale = 1;
            for(var go:GameObject in grids){
                go.GetComponent.<Renderer>().enabled = false;
            }
        }
    }
}
}