#pragma strict
var soundOn:UnityEngine.UI.Button;
var soundOff:UnityEngine.UI.Button;

function Start () {
    var musicOn: UnityEngine.UI.Button = soundOn.GetComponent.<UnityEngine.UI.Button>();
    var musicOff: UnityEngine.UI.Button = soundOff.GetComponent.<UnityEngine.UI.Button>();
    musicOn.onClick.AddListener(musicsOn);
    musicOff.onClick.AddListener(musicsOff);
}

function musicsOn() {
    GetComponent.<AudioSource>().mute = false;
}

function musicsOff() {
    GetComponent.<AudioSource>().mute = true;
}