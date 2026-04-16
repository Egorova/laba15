//Задание 2
function processJsonData() {
    const person1 = { name: "Екатерина", age: 18 };
    const person2 = { name: "Арина", age: 19 };
    const mainContainer = {
        group: [person1, person2]
    };
    const jsonString = JSON.stringify(mainContainer);
    const parsedData = JSON.parse(jsonString);
    const resultString = parsedData.group
        .map(user => `${user.name.toUpperCase()} ${user.age}`)
        .join('; ');

    document.getElementById('jsonOutput').innerText = resultString;
    
    console.log("Данные из JSON:", resultString);
}

//Задание 3
document.addEventListener('DOMContentLoaded', () => {
    const convertBtn = document.getElementById('convertBtn');
    const inputField = document.getElementById('rubAmount');
    const resultDisplay = document.getElementById('resultDisplay');

    convertBtn.addEventListener('click', async () => {
        const rubValue = inputField.value.trim();
        const rub = parseFloat(rubValue);

        if (isNaN(rub) || rub <= 0) {
            const errorMsg = "Ошибка: введите корректное число больше нуля";
            alert(errorMsg);
            resultDisplay.innerText = errorMsg;
            resultDisplay.style.color = "red";
            return;
        }

        try {
            const response = await fetch('https://www.cbr-xml-daily.ru/daily_json.js');
            if (!response.ok) throw new Error("Ошибка сети");
            const data = await response.json();
            const usdRate = data.Valute.USD.Value;
            const totalUsd = (rub / usdRate).toFixed(2);
            const successMsg = `Результат: $${totalUsd} (курс: ${usdRate.toFixed(2)} руб)`;
            alert(successMsg);
            resultDisplay.innerText = successMsg;
            resultDisplay.style.color = "green";

        } catch (error) {
            const apiError = "Не удалось получить свежий курс валют";
            alert(apiError);
            resultDisplay.innerText = apiError;
            console.error(error);
        }
    });
});

//Задание 4
let count = 0;
let timerId = null;
const display = document.getElementById('counterValue');

function startLoading() {
    if (timerId !== null) return;
    timerId = setInterval(() => {
        if (count < 100) {
            count++;
            display.innerText = count;
        } else {
            clearInterval(timerId);
            timerId = null;
            alert("Загрузка завершена!");
        }
    }, 100);
}

function pauseLoading() {
    clearInterval(timerId);
    timerId = null;
}

function stopLoading() {
    clearInterval(timerId);
    timerId = null;
    count = 0;
    display.innerText = count;
}

//Задание 5
let timeLeft = 10;

const mainLabel = document.getElementById('mainLabel');
const countdownLabel = document.getElementById('countdownLabel');
const timerWrapper = document.getElementById('timerWrapper');

const countdownTimeLeft = setInterval(() => {
    timeLeft--;
    countdownLabel.innerText = `${timeLeft} сек.`;

    if (timeLeft <= 0) {
        clearInterval(countdownTimeLeft);
        finishTimer();
    }
}, 1000);

function finishTimer() {
    mainLabel.remove();
    countdownLabel.remove();
    const downloadBtn = document.createElement('button');
    downloadBtn.innerText = 'Скачать';
    downloadBtn.className = 'download-btn';
    downloadBtn.onclick = () => alert('Файл скачивается...');
    timerWrapper.appendChild(downloadBtn);
}

//Задание 6
let vibrationInterval = null;

function startVibration1() {
    stopVibration();
    if ("vibrate" in navigator) {
        vibrationInterval = setInterval(() => {
            navigator.vibrate([200, 100]);
        }, 300);
    } else {
        alert("Ваш телефон не поддерживает вибрацию");
    }
}

function startVibration2() {
    stopVibration();
    if ("vibrate" in navigator) {
        vibrationInterval = setInterval(() => {
            navigator.vibrate([500, 500]);
        }, 1000);
    }
}

function stopVibration() {
    if (vibrationInterval) {
        clearInterval(vibrationInterval);
        vibrationInterval = null;
    }
    navigator.vibrate(0);
}