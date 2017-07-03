#pragma strict
var menuButton:UnityEngine.UI.Button;
var equipmentButton:UnityEngine.UI.Button;
var dogButton:UnityEngine.UI.Button;
var settingsButton:UnityEngine.UI.Button;
var pauseMenu:Transform;
var equipMenu:Transform;
var dogMenu:Transform;
var settingMenu:Transform;

function Start() {
    var btn: UnityEngine.UI.Button = menuButton.GetComponent.<UnityEngine.UI.Button>();
    var equ: UnityEngine.UI.Button = equipmentButton.GetComponent.<UnityEngine.UI.Button>();
    var dog: UnityEngine.UI.Button = dogButton.GetComponent.<UnityEngine.UI.Button>();
    var seting: UnityEngine.UI.Button = settingsButton.GetComponent.<UnityEngine.UI.Button>();
    btn.onClick.AddListener(menuOpen);
    equ.onClick.AddListener(equipmentMenu);
    dog.onClick.AddListener(dogsMenu);
    seting.onClick.AddListener(settingsMenu);
    Time.timeScale = 1;
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