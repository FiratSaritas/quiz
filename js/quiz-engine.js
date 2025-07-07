// js/quiz-engine.js

document.addEventListener('DOMContentLoaded', () => {
    const quizContainer = document.getElementById('quiz-container');
    const resultContainer = document.getElementById('result-container');
    const progressBar = document.getElementById('progressBar');
    const questionContent = document.getElementById('question-content'); // New element to hold dynamic question content
    const quizDataScript = document.getElementById('quiz-data'); // Get the script tag containing quiz data

    // Check if essential elements exist
    if (!quizContainer || !resultContainer || !progressBar || !questionContent || !quizDataScript) {
        console.error("One or more required quiz elements or quiz data script not found.");
        // Optionally, hide quiz sections or display an error message to the user
        if (quizContainer) quizContainer.style.display = 'none';
        if (resultContainer) resultContainer.style.display = 'none';
        return;
    }

    let currentQuiz;
    try {
        currentQuiz = JSON.parse(quizDataScript.textContent); // Parse the JSON content
    } catch (e) {
        console.error("Error parsing quiz data from HTML:", e);
        // Display an error message to the user if data is malformed
        questionContent.innerHTML = '<p style="color: red;">Error loading quiz. Please try again later.</p>';
        return;
    }

    let currentQuestionIndex = 0;
    let userAnswers = [];

    function updateProgressBar() {
        const totalQuestions = currentQuiz.questions.length;
        const progress = totalQuestions > 0 ? ((currentQuestionIndex) / totalQuestions) * 100 : 0;
        progressBar.style.width = `${progress}%`;
    }

    function loadQuestion() {
        if (currentQuestionIndex < currentQuiz.questions.length) {
            const questionData = currentQuiz.questions[currentQuestionIndex];
            // Only update the question and options, keep progress bar untouched
            questionContent.innerHTML = `
                <h2 class="section-title">${currentQuiz.title}</h2>
                <div class="question-container">
                    <p class="question-text">${currentQuestionIndex + 1}. ${questionData.text}</p>
                    <div class="options-grid">
                        ${questionData.options.map((opt, index) => `
                            <button class="option" data-index="${index}">${opt}</button>
                        `).join('')}
                    </div>
                </div>
            `;

            document.querySelectorAll('.option').forEach(button => {
                button.addEventListener('click', handleOptionClick);
            });
            updateProgressBar();
        } else {
            showResult();
        }
    }

    function handleOptionClick(event) {
        const selectedIndex = parseInt(event.target.dataset.index, 10);
        userAnswers.push(selectedIndex);
        currentQuestionIndex++;
        loadQuestion();
    }

    function showResult() {
        quizContainer.style.display = 'none';

        // Simple result logic: sum of answer indices, then modulo by number of results
        const sum = userAnswers.reduce((total, ans) => total + ans, 0);
        const resultIndex = currentQuiz.results.length > 0 ? sum % currentQuiz.results.length : 0;
        const finalResult = currentQuiz.results[resultIndex];

        document.getElementById('result-title').textContent = finalResult.title;
        document.getElementById('result-description').textContent = finalResult.description;

        const resultImageElement = document.getElementById('result-image');
        if (resultImageElement && finalResult.imageUrl) {
            resultImageElement.src = finalResult.imageUrl;
            resultImageElement.alt = finalResult.title + " image";
            resultImageElement.style.display = 'block'; // Ensure image is visible
        } else if (resultImageElement) {
             resultImageElement.style.display = 'none'; // Hide if no image URL
        }
        const imageCreditElement = document.getElementById('image-credit');
        if (imageCreditElement && finalResult.imageUrl) {
            imageCreditElement.style.display = 'block'; // Show credit if image exists
        } else if (imageCreditElement) {
            imageCreditElement.style.display = 'none'; // Hide credit if no image
        }

        resultContainer.classList.remove('hidden');
    }

    // Initialize the quiz
    loadQuestion();
});