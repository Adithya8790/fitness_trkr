// Function to set the fitness goal
function setGoal() {
    const goal = document.getElementById('goal').value;
    if (goal) {
        localStorage.setItem('fitnessGoal', goal);
        document.getElementById('current-goal').innerText = `Current Goal: ${goal}`;
        document.getElementById('goal').value = '';
    }
}

// Function to log the workout
function logWorkout() {
    const exercise = document.getElementById('exercise').value;
    const duration = document.getElementById('duration').value;

    if (exercise && duration) {
        const workout = { exercise, duration, date: new Date().toLocaleDateString() };
        
        let history = JSON.parse(localStorage.getItem('workoutHistory')) || [];
        history.push(workout);
        localStorage.setItem('workoutHistory', JSON.stringify(history));

        document.getElementById('exercise').value = '';
        document.getElementById('duration').value = '';

        displayHistory();
        updateProgress();
    }
}

// Function to display workout history
function displayHistory() {
    const historyList = document.getElementById('history-list');
    historyList.innerHTML = '';

    const history = JSON.parse(localStorage.getItem('workoutHistory')) || [];
    history.forEach(workout => {
        const li = document.createElement('li');
        li.textContent = `${workout.date}: ${workout.exercise} - ${workout.duration} minutes`;
        historyList.appendChild(li);
    });
}

// Function to update progress
function updateProgress() {
    const history = JSON.parse(localStorage.getItem('workoutHistory')) || [];
    const totalDuration = history.reduce((acc, workout) => acc + parseInt(workout.duration, 10), 0);
    document.getElementById('progress-summary').innerText = `Total Workout Time: ${totalDuration} minutes`;
}

// Initialize the app
function init() {
    const goal = localStorage.getItem('fitnessGoal');
    if (goal) {
        document.getElementById('current-goal').innerText = `Current Goal: ${goal}`;
    }

    displayHistory();
    updateProgress();
}

// Run initialization
window.onload = init;
