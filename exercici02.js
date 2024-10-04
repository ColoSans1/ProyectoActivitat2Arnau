const propietats = [
    { text: 'Valor màxim que pot tenir un número JS', value: Number.MAX_VALUE },
    { text: 'Altura total de la pantalla', value: window.screen.height },
    { text: 'Altura interna de la finestra', value: window.innerHeight },
    { text: 'URL de la web', value: window.location.href }
];

const taula = document.createElement('table');
const header = taula.createTHead();
const headerRow = header.insertRow();
headerRow.insertCell().innerText = 'Propietat';
headerRow.insertCell().innerText = 'Valor';

const body = taula.createTBody();
propietats.forEach(propietat => {
    const row = body.insertRow();
    row.insertCell().innerText = propietat.text;
    row.insertCell().innerText = propietat.value;
});

document.getElementById('taula_propietats').appendChild(taula);

// Compte enrere
let countdown;
let totalTime;
let isPaused = false;
let isRunning = false;

document.getElementById('startButton').addEventListener('click', function() {
    if (!isRunning || isPaused) {
        const minutes = parseInt(document.getElementById('minutes').value) || 0;
        const seconds = parseInt(document.getElementById('seconds').value) || 0;

        totalTime = minutes * 60 + seconds;
        if (totalTime > 0) {
            startCountdown();
        }
    }
});

document.getElementById('pauseButton').addEventListener('click', function() {
    if (countdown && isRunning) {
        clearInterval(countdown);
        isPaused = true;
        isRunning = false;
    }
});

document.getElementById('resetButton').addEventListener('click', function() {
    clearInterval(countdown);
    document.getElementById('timerDisplay').innerText = '00:00';
    totalTime = 0;
    isPaused = false;
    isRunning = false;
});

function startCountdown() {
    clearInterval(countdown);
    isPaused = false;
    isRunning = true;

    countdown = setInterval(function() {
        if (totalTime <= 0) {
            clearInterval(countdown);
            document.getElementById('timerDisplay').innerText = '00:00';
            playAlarm();
            isRunning = false;
            return;
        }

        totalTime--;

        const minutes = Math.floor(totalTime / 60);
        const seconds = totalTime % 60;

        document.getElementById('timerDisplay').innerText = 
            String(minutes).padStart(2, '0') + ':' + String(seconds).padStart(2, '0');
    }, 1000);
}

function playAlarm() {
    const alarmSound = document.getElementById('alarmSound');
    alarmSound.play();
}

function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    document.getElementById('currentTime').innerText = `${hours}:${minutes}:${seconds}`;
}
setInterval(updateClock, 1000);

let alarmTime = null;

document.getElementById('setAlarmButton').addEventListener('click', function() {
    const alarmHour = parseInt(document.getElementById('alarmHour').value) || 0;
    const alarmMinute = parseInt(document.getElementById('alarmMinute').value) || 0;
    alarmTime = `${String(alarmHour).padStart(2, '0')}:${String(alarmMinute).padStart(2, '0')}:00`;

    const alarmSource = document.getElementById('alarmSource');
    alarmSource.src = document.getElementById('alarmMusic').value;

    const alarmSound = document.getElementById('alarmSound');
    alarmSound.volume = document.getElementById('alarmVolume').value;
    alert(`Alarma establerta a ${alarmTime}`);
});

setInterval(function() {
    const currentTime = new Date().toTimeString().split(' ')[0];
    if (currentTime === alarmTime) {
        playAlarm();
    }
}, 1000);

document.getElementById('playAlarmButton').addEventListener('click', function() {
    document.getElementById('alarmSound').play();
});

document.getElementById('stopAlarmButton').addEventListener('click', function() {
    document.getElementById('alarmSound').pause();
    document.getElementById('alarmSound').currentTime = 0;
});
