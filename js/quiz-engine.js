// js/quiz-engine.js

document.addEventListener('DOMContentLoaded', () => {
    const quizData = {
        entrepreneur: {
            title: "What Type of Entrepreneur Are You?",
            questions: [
                {
                    text: "When you see a problem, your first thought is:",
                    options: ["How can I build a solution?", "Who can I hire to fix this?", "Is there a market opportunity here?", "How can I improve the existing system?"]
                },
                {
                    text: "Your ideal work environment is:",
                    options: ["A bustling co-working space", "A quiet office where I can focus", "Constantly changing, meeting new people", "A well-organized, efficient setup"]
                },
                {
                    text: "You handle risk by:",
                    options: ["Taking big, calculated leaps", "Minimizing it with careful planning", "Embracing it as part of the thrill", "Diversifying to spread potential losses"]
                },
                {
                    text: "What drives you the most?",
                    options: ["Creating something brand new", "Building a powerful team and culture", "Spotting trends and capitalizing on them", "Optimizing processes for peak efficiency"]
                }
            ],
            results: [
                { title: "The Innovator", description: "You are driven by a passion for creating new things. You're a natural builder and problem-solver, always thinking about the next big idea." },
                { title: "The Leader", description: "You excel at bringing people together to work towards a common goal. Your strength lies in management, delegation, and building a strong company culture." },
                { title: "The Visionary", description: "You have an uncanny ability to see where the market is going. You're a strategic thinker who thrives on identifying and seizing future opportunities." },
                { title: "The Optimizer", description: "You have a knack for making things better, faster, and more efficient. Your focus is on process and scalability, ensuring a business runs like a well-oiled machine." }
            ]
        },
        'harry-potter': {
            title: "What Harry Potter Character Are You?",
            questions: [
                { text: "Which subject at Hogwarts would be your favorite?", options: ["Defense Against the Dark Arts", "Potions", "Charms", "Transfiguration"] },
                { text: "A magical creature has escaped. What do you do?", options: ["Bravely try to contain it myself", "Research its weaknesses in the library first", "Charm it with kindness and understanding", "Alert a professor immediately"] },
                { text: "Your defining quality is:", options: ["Courage", "Intelligence", "Loyalty", "Ambition"] },
                { text: "You would most want to possess the:", options: ["Elder Wand", "Resurrection Stone", "Cloak of Invisibility", "The Marauder's Map"] }
            ],
            results: [
                { title: "Harry Potter", description: "You are brave, loyal, and have a strong sense of justice. You don't shy away from a challenge and always stand up for your friends." },
                { title: "Hermione Granger", description: "You are incredibly intelligent, resourceful, and logical. You believe that knowledge is power and there's no problem that can't be solved with a good book." },
                { title: "Ron Weasley", description: "You are a fiercely loyal and dependable friend. You have a great sense of humor and provide steadfast support to those you care about." },
                { title: "Luna Lovegood", description: "You are creative, open-minded, and march to the beat of your own drum. You see the world in a unique and wonderful way." }
            ]
        },
        severance: {
            title: "What Severance Character Are You?",
            questions: [
                { text: "How do you feel about office parties?", options: ["A welcome break, I love a good melon bar!", "An awkward but necessary social ritual.", "A waste of time, I'd rather be working.", "A chance to uncover company secrets."] },
                { text: "Your ideal manager is someone who:", options: ["Is a true believer in the company's mission.", "Is friendly and offers encouragement.", "Stays out of my way and lets me work.", "Provides clear, strict rules to follow."] },
                { text: "When faced with a strange new rule, you:", options: ["Question it relentlessly.", "Follow it, but complain to your coworkers.", "Follow it without question.", "Try to find the loophole."] },
                 { text: "The most important part of work is:", options: ["The feeling of accomplishment.", "The friendships with colleagues.", "The sense of order and purpose.", "Finding out what's really going on."] }
            ],
            results: [
                { title: "Mark S.", description: "You're a natural leader trying to balance your work and personal grief. You follow the rules, but a rebellious spark is growing inside you." },
                { title: "Helly R.", description: "You are defiant, strong-willed, and refuse to accept the status quo. You question everything and will fight for your freedom, no matter the cost." },
                { title: "Irving B.", description: "You are a loyal company man who finds comfort in rules and history. You value order and procedure, but a deep curiosity about the truth lies beneath the surface." },
                { title: "Dylan G.", description: "You are highly competitive, driven by perks, and fiercely protective of your work. You have a sharp wit and aren't afraid to speak your mind, especially when it comes to waffle parties." }
            ]
        }
        // Add more quizzes here
    };

    const quizContainer = document.getElementById('quiz-container');
    const resultContainer = document.getElementById('result-container');
    const quizId = quizContainer.dataset.quizId.replace('quiz', ''); // e.g., 'entrepreneur'

    const currentQuiz = quizData[quizId] || quizData['harry-potter']; // Fallback
    
    let currentQuestionIndex = 0;
    const userAnswers = [];

    function loadQuestion() {
        if (currentQuestionIndex < currentQuiz.questions.length) {
            const questionData = currentQuiz.questions[currentQuestionIndex];
            quizContainer.innerHTML = `
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
        const resultIndex = sum % currentQuiz.results.length;
        const finalResult = currentQuiz.results[resultIndex];

        document.getElementById('result-title').textContent = finalResult.title;
        document.getElementById('result-description').textContent = finalResult.description;
        resultContainer.classList.remove('hidden');
    }

    loadQuestion();
});