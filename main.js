document.addEventListener('DOMContentLoaded', function() {
    // Load JSON data
    fetch('data.json') // fetchni soubor data.json
        .then(response => response.json()) // pokud je request dat uspesny, vezmeme odpoved a parsujeme data s využitím metody .json(), dostaneme javascriptu objekt
        .then(data => { // pak vezmi data
            createChart(data); // a udelej z nich chart
        });

    function createChart(data) {
        const chartContainer = document.getElementById('chart');
        const maxDataValue = Math.max(...data.map(item => item.amount)); // The Math.max function is used to find the maximum value among its arguments -- ... je spread argument, ktery vezme array s amounts a udela z ni jednotlive argumenty (tzn. z [17.45, 34.91, atd] udela (17.45, 34.91, atd)) -- data.map vezme z array items pouze cast amount a udela z nich novou array (tzn. [17.45, 34.91, atd]) --- promena, ktera obsahuje nejvyssi cislo z amount v data

        data.forEach(item => {
            const bar = document.createElement('div');
            bar.className = 'bar';
            bar.style.height = `${(item.amount / maxDataValue) * 100}%`; // vyska sloupku xx% (amount děleno nejvyšší hodnota amount krát 100)

            const barLabel = document.createElement('div');
            barLabel.className = 'bar-label';
            barLabel.textContent = item.day; // hodnota den do popisku sloupku

            const barAmount = document.createElement('div'); // hodnota utracene castky ten den
            barAmount.className = 'bar-amount';
            barAmount.textContent = `$${item.amount.toFixed(2)}`; // fix na 2 desetinna cisla

            bar.appendChild(barAmount); // pripoj k bar jako child
            bar.appendChild(barLabel);
            chartContainer.appendChild(bar); // pripoj bar jako child ke containeru chart


            bar.addEventListener('mouseover', function(){ // pri prejeti mysi
                barAmount.style.display = 'inherit'; // ukaz amount
            });
            bar.addEventListener('mouseleave', function(){ // pri odjeti mysi
                barAmount.style.display = 'none'; // schovej amount
            });

            if(barLabel.textContent === currentDay){ // pokud se popis sloupku shoduje s dnesnim dnem, pr. 'tue' === 'tue'
            bar.classList.add('bar-today'); // pridej tuto tridu
            }

        });

    }
});

// Function to get the current day of the week
function getCurrentDay() {
    const daysOfWeek = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
    const today = new Date();
    const dayIndex = today.getDay(); // getDay() returns a number from 0 (Sunday) to 6 (Saturday)
    return daysOfWeek[dayIndex]; // vybere z array daysOfWeek hodnotu s dnesnim indexem, tzn. dnesni den
    }

// Get today's day name
const currentDay = getCurrentDay(); // dnesni den, pr. 'tue'