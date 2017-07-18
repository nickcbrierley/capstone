#pragma strict
var desk:Transform;
var tub:Transform;
var dog:Transform;
var usedTub:Transform;
var allDogs:Transform;
var pauseMenu:Transform;
var equipMenu:Transform;
var dogMenu:Transform;
var settingMenu:Transform;
var spawnPoint:Transform;
var grid:Transform;
var tubParent:Transform;
var dogCollection:Transform;
var wallet:UnityEngine.UI.Text;
var menuButton:UnityEngine.UI.Button;
var equipmentButton:UnityEngine.UI.Button;
var dogButton:UnityEngine.UI.Button;
var settingsButton:UnityEngine.UI.Button;
var soundOn:UnityEngine.UI.Button;
var soundOff:UnityEngine.UI.Button;
var newLandButton:UnityEngine.UI.Button;
var newTubButton:UnityEngine.UI.Button;
var autoTubButton:UnityEngine.UI.Button;
var currentMoney:int;
var mouseSensitivity : float = 1.0;
var lastPosition : Vector3;
var buyTile = false;
var buyTub = false;
var autoTubs = false;

function Start () {
    var btn: UnityEngine.UI.Button = menuButton.GetComponent.<UnityEngine.UI.Button>();
    var equ: UnityEngine.UI.Button = equipmentButton.GetComponent.<UnityEngine.UI.Button>();
    var dog: UnityEngine.UI.Button = dogButton.GetComponent.<UnityEngine.UI.Button>();
    var seting: UnityEngine.UI.Button = settingsButton.GetComponent.<UnityEngine.UI.Button>();
    var musicOn: UnityEngine.UI.Button = soundOn.GetComponent.<UnityEngine.UI.Button>();
    var musicOff: UnityEngine.UI.Button = soundOff.GetComponent.<UnityEngine.UI.Button>();
    var newTub: UnityEngine.UI.Button = newTubButton.GetComponent.<UnityEngine.UI.Button>();
    var newShop: UnityEngine.UI.Button = newLandButton.GetComponent.<UnityEngine.UI.Button>();
    var autoTub: UnityEngine.UI.Button = autoTubButton.GetComponent.<UnityEngine.UI.Button>();
    btn.onClick.AddListener(menuOpen);
    equ.onClick.AddListener(equipmentMenu);
    dog.onClick.AddListener(dogsMenu);
    seting.onClick.AddListener(settingsMenu);
    musicOn.onClick.AddListener(musicsOn);
    musicOff.onClick.AddListener(musicsOff);
    newShop.onClick.AddListener(addToFloor);
    newTub.onClick.AddListener(createGrid);
    autoTub.onClick.AddListener(addAutoTub);
    Time.timeScale = 1;
}

function musicsOn() {
    GetComponent.<AudioSource>().mute = false;
}

function musicsOff() {
    GetComponent.<AudioSource>().mute = true;
}

function spawn() {
    var dogs:GameObject[];
    dogs = GameObject.FindGameObjectsWithTag("PreWash");
    var tubs:GameObject[];
    tubs = GameObject.FindGameObjectsWithTag("Tub");
    if(dogs.length < 1) {
        Instantiate(allDogs, dogCollection);
    }
    for(var doge:GameObject in dogs) {
                var agent:UnityEngine.AI.NavMeshAgent = doge.transform.parent.gameObject.GetComponent.<UnityEngine.AI.NavMeshAgent>();
                agent.destination = desk.GetComponent.<Renderer>().bounds.center;
    }
}

function deskClick() {
    var dogs:GameObject[];
    dogs = GameObject.FindGameObjectsWithTag("PreWash");
    for(var doge:GameObject in dogs) {
        var agent:UnityEngine.AI.NavMeshAgent = doge.transform.parent.gameObject.GetComponent.<UnityEngine.AI.NavMeshAgent>();
        var ray = Camera.main.ScreenPointToRay (Input.mousePosition); 
        var hit:RaycastHit;
        if(Vector3.Distance(agent.transform.position, desk.position) < 8.5f && Input.GetMouseButtonDown(0) && Physics.Raycast (ray, hit) && hit.transform.tag == "Desk") {
            var tubs:GameObject[];
            tubs = GameObject.FindGameObjectsWithTag("Tub");
            var close : GameObject;
            var distance = Mathf.Infinity;
            var position = agent.transform.position;
            for(var go:GameObject in tubs) {
                var diff = (go.transform.position - position);
                var curDistance = diff.sqrMagnitude;
                    if (curDistance < distance) {
                        close = go;
                        distance = curDistance;
                        doge.tag = 'Dog';
                    }
            } 
        
        agent.destination = close.GetComponent.<Renderer>().bounds.center;
        
        while(Vector3.Distance(agent.transform.position, close.transform.position) > 7.5f) {
           yield;
        }
        close.tag = 'DirtyTub';
        doge.transform.GetChild(3).GetComponent.<Renderer>().enabled = false;
        var wash = Instantiate(usedTub, close.transform.position, close.transform.rotation);
        yield WaitForSeconds(4);
        doge.transform.GetChild(3).GetComponent.<Renderer>().enabled = true;
        close.GetComponent.<Renderer>().material.SetColor("_Color", Color.grey);
        Destroy(wash.gameObject);
        doge.tag = 'PostWash';
        agent.destination = desk.GetComponent.<Renderer>().bounds.center;  
        autoTub();
        collectCash();
        }
    }
}

function autoTub() {
    if(autoTubs) {
        yield WaitForSeconds(2);
        var dirtyTubs:GameObject[];
        dirtyTubs = GameObject.FindGameObjectsWithTag("DirtyTub");
        for(var so:GameObject in dirtyTubs) {
            so.transform.tag = 'Tub';
            so.transform.GetComponent.<Renderer>().material.SetColor("_Color", Color.white);
        }
    }
}

function cleanTub() {
    if(Input.GetMouseButtonDown(0)) {
        var ray = Camera.main.ScreenPointToRay (Input.mousePosition); 
        var hit:RaycastHit;
        if (Physics.Raycast (ray, hit) && hit.transform.tag == "DirtyTub") {
            hit.transform.GetComponent.<Renderer>().material.SetColor("_Color", Color.white);
            hit.transform.tag = 'Tub';
        }
    }
}

function collectCash() {
    var dogs:GameObject[];
    dogs = GameObject.FindGameObjectsWithTag("PostWash");
    for(var doge:GameObject in dogs) {
        var agent:UnityEngine.AI.NavMeshAgent = doge.transform.parent.gameObject.GetComponent.<UnityEngine.AI.NavMeshAgent>();
        if(Vector3.Distance(agent.transform.position, desk.GetComponent.<Renderer>().bounds.center) < 8.5f && Input.GetMouseButtonDown(0)){
            currentMoney += 22;
            agent.destination = Vector3(0,0,0);
            yield WaitForSeconds(4);
            Destroy(agent.gameObject);
        }
    }
}

function menuOpen() {
    if(pauseMenu.gameObject.activeSelf) {
        pauseMenu.gameObject.SetActive(false);
        Time.timeScale = 1;
    } else {
        pauseMenu.gameObject.SetActive(true);
        Time.timeScale = 0;
        equipmentButton.onClick.Invoke();
    }
}

function equipmentMenu() {
    equipMenu.gameObject.SetActive(true);
    settingMenu.gameObject.SetActive(false);
    dogMenu.gameObject.SetActive(false);
}

function dogsMenu() {
    equipMenu.gameObject.SetActive(false);
    settingMenu.gameObject.SetActive(false);
    dogMenu.gameObject.SetActive(true);
}

function settingsMenu() {
    equipMenu.gameObject.SetActive(false);
    settingMenu.gameObject.SetActive(true);
    dogMenu.gameObject.SetActive(false);
}

function equipmentMenuUpdate() {
    var grids:GameObject[];
    grids = GameObject.FindGameObjectsWithTag("Grid");
    var ray = Camera.main.ScreenPointToRay (Input.mousePosition); 
    var hit:RaycastHit;

    if(Input.GetMouseButtonDown(0) && buyTile == true) {
        if (Physics.Raycast(ray, hit) && hit.transform.tag == "Floor") {
            hit.collider.gameObject.GetComponent.<Renderer>().enabled = true;
            hit.collider.gameObject.transform.GetChild(0).GetComponent.<Renderer>().enabled = true;
            hit.collider.gameObject.transform.GetChild(1).GetComponent.<Renderer>().enabled = true;
            hit.collider.gameObject.transform.GetChild(2).GetComponent.<Renderer>().enabled = true;
            hit.collider.gameObject.transform.GetChild(3).GetComponent.<Renderer>().enabled = true;
            hit.collider.gameObject.transform.GetChild(4).GetComponent.<Renderer>().enabled = true;
            hit.collider.gameObject.transform.GetChild(5).GetComponent.<Renderer>().enabled = true;
            hit.collider.gameObject.transform.GetChild(6).GetComponent.<Renderer>().enabled = true;
            buyTile = false;
            Time.timeScale = 1;
            for(var go:GameObject in grids){
                go.GetComponent.<Renderer>().enabled = false;
            }
        }
    }
    
    if(Input.GetMouseButtonDown(0) && buyTub == true) {
        if (Physics.Raycast(ray, hit) && hit.transform.tag == "Floor") {
            var test = hit.collider.gameObject.transform.position + Vector3(-6,12,-12);
            Instantiate(tub, test, tub.transform.rotation, tubParent);
            buyTub = false;
                for(var go:GameObject in grids){
                    go.GetComponent.<Renderer>().enabled = false;
                }
        Time.timeScale = 1;
        }
    }
}

function addAutoTub() {
    autoTubs = true;
    pauseMenu.gameObject.SetActive(false);
    Time.timeScale = 1;
}

function createGrid() {
    buyTub = true;
    var grids:GameObject[];
    grids = GameObject.FindGameObjectsWithTag("Grid");
    for(var go:GameObject in grids){
        go.GetComponent.<Renderer>().enabled = true;
        pauseMenu.gameObject.SetActive(false);
    }
}

function addToFloor() {
    buyTile = true;
    var grids:GameObject[];
    grids = GameObject.FindGameObjectsWithTag("Grid");
    for(var go:GameObject in grids) {
        go.GetComponent.<Renderer>().enabled = true;
        pauseMenu.gameObject.SetActive(false);
    }
}

function moveCamera() { 
    if (Input.GetMouseButtonDown(0)) {
        lastPosition = Input.mousePosition;
    }
    if (Input.GetMouseButton(0)) {
        var delta : Vector3 = Input.mousePosition - lastPosition;
        transform.Translate(delta.x * mouseSensitivity, delta.y * mouseSensitivity, 0);
        lastPosition = Input.mousePosition;
    }
}

function Update () {
    moveCamera();
    spawn();
    deskClick();
    cleanTub();
    collectCash();
    equipmentMenuUpdate();
    wallet.text = "$" + currentMoney.ToString();
}