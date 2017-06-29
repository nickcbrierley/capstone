#pragma strict
var yourButton:UnityEngine.UI.Button;
var pauseMenu:Transform;
function Start() {
    var btn: UnityEngine.UI.Button = yourButton.GetComponent.<UnityEngine.UI.Button>();
	btn.onClick.AddListener(TaskOnClick);
}
function TaskOnClick() {
    if(pauseMenu.gameObject.activeSelf) {
        pauseMenu.gameObject.SetActive(false);
        Time.timeScale = 1;
    } else {
        pauseMenu.gameObject.SetActive(true);
        Time.timeScale = 0;
    }
}