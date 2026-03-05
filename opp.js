// app.js - Clean Version
const video = document.getElementById('webcam');
const poeCheck = document.getElementById('poeCheck');
const statusText = document.getElementById('reality-status');
const eventLog = document.getElementById('eventLog');

let model;

function speak(phrase) {
    const msg = new SpeechSynthesisUtterance(phrase);
    msg.lang = 'en-US'; // Set to English
    window.speechSynthesis.speak(msg);
}

function logMessage(msg) {
    const p = document.createElement('p');
    p.innerText = `[${new Date().toLocaleTimeString()}] ${msg}`;
    eventLog.prepend(p);
}

async function init() {
    logMessage("Loading AI Models...");
    model = await cocoSsd.load();
    logMessage("System Ready.");
}

async function startAuto() {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;
    
    setInterval(async () => {
        const predictions = await model.detect(video);
        if (predictions.length > 0) {
            const result = predictions[0].class;
            statusText.innerText = `DETECTED: ${result.toUpperCase()}`;

            if (result === 'person' || result === 'cell phone') {
                if (!poeCheck.checked) {
                    poeCheck.checked = true;
                    logMessage("PoE SUCCESS");
                    speak("Success! Verified.");
                }
            }
        }
    }, 1500);
}

init();