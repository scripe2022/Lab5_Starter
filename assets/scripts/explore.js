// explore.js

window.addEventListener('DOMContentLoaded', init);

function init() {
    const selectElement = document.getElementById("voice-select");
    const contentElement = document.getElementById("text-to-speak");
    const buttonElement = document.getElementsByTagName('button')[0];
    const imgElement = document.getElementsByTagName('img')[0];
    let voices = [];
    speechSynthesis.addEventListener("voiceschanged", () => {
        voices = window.speechSynthesis.getVoices()
        for (let i = 0; i < voices.length; ++i) {
            const option = document.createElement("option");
            option.textContent = `${voices[i].name} (${voices[i].lang})`;
            option.setAttribute("data-lang", voices[i].lang);
            option.setAttribute("data-name", voices[i].name);
            selectElement.appendChild(option);
        }
        selectElement.selectedIndex = 1;
    })
    let speaking = 0;
    buttonElement.addEventListener('click', () => {
        if (speaking) return;
        const utter = new SpeechSynthesisUtterance(contentElement.value);
        for (let i = 0; i < voices.length; ++i) {
            if (selectElement.value == `${voices[i].name} (${voices[i].lang})`) {
                utter.voice = voices[i];
            }
        }
        if (utter.voice != null) {
            window.speechSynthesis.speak(utter);
            imgElement.src = './assets/images/smiling-open.png';
            speaking = 1;
            utter.addEventListener("end", () => {
                imgElement.src = './assets/images/smiling.png';
                speaking = 0;
            });
        }
    });
}