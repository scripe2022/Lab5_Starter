// expose.js

window.addEventListener('DOMContentLoaded', init);

function init() {
  // TODO
    const selectElement = document.getElementById('horn-select');
    const imgElement = document.getElementsByTagName('img');
    const volumeElement = document.getElementById('volume');
    const buttonElement = document.getElementsByTagName('button')[0];
    const audioElement = document.getElementsByTagName('audio')[0];
    const canvasElement = document.createElement('canvas');
    document.body.appendChild(canvasElement);
    const jsConfetti = new JSConfetti({ canvasElement });

    const updateVolume = () => {
        const v = parseInt(volumeElement.value);
        let level = -1;
        if (v == 0) level = 0;
        else if (v < 33) level = 1;
        else if (v < 67) level = 2;
        else level = 3;
        imgElement[1].src = `./assets/icons/volume-level-${level}.svg`;
    }

    const updateImage = () => {
        const filename = (selectElement.value == 'select') ? 'no-image.png' : selectElement.value + '.svg';
        imgElement[0].src = `./assets/images/${filename}`;
    }

    updateImage();
    updateVolume();
    selectElement.addEventListener('change', updateImage);
    volumeElement.addEventListener('input', updateVolume);
    buttonElement.addEventListener('click', () => {
        audioElement.src = `./assets/audio/${selectElement.value}.mp3`;
        audioElement.volume = volumeElement.value / 100;
        audioElement.play();
        if (selectElement.value == 'party-horn') jsConfetti.addConfetti();
    });
}