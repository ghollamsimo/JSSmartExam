document.getElementById('addQuestion').addEventListener('click', () => {
    const questionCount = document.querySelectorAll('.question').length;
    const newQuestionHtml = `
        <div class="question">
            <label for="questionText">Question Text:</label>
            <input type="text" name="questions[${questionCount}][text]" required>
            
            <label for="questionPoints">Points:</label>
            <input type="number" name="questions[${questionCount}][points]" required>
            
            <label for="questionLevel">Difficulty Level:</label>
            <select name="questions[${questionCount}][level]" required>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
            </select>
            
            <label for="questionSubject">Subject:</label>
            <select name="questions[${questionCount}][subjectId]" required>
                <!-- Options will be dynamically added by the server -->
            </select>

            <h3>Answers</h3>
            <div class="answers">
                <div class="answer">
                    <label for="answerText">Answer Text:</label>
                    <input type="text" name="questions[${questionCount}][answers][0][text]" required>
                    
                    <label for="isCorrect">Correct:</label>
                    <input type="checkbox" name="questions[${questionCount}][answers][0][isCorrect]">
                </div>
            </div>
        </div>
    `;
    document.getElementById('questions').insertAdjacentHTML('beforeend', newQuestionHtml);
});

document.getElementById('addAnswer').addEventListener('click', () => {
    const questionCount = document.querySelectorAll('.question').length;
    const answerCount = document.querySelectorAll('.answer').length;
    const newAnswerHtml = `
        <div class="answer">
            <label for="answerText">Answer Text:</label>
            <input type="text" name="questions[${questionCount - 1}][answers][${answerCount}][text]" required>
            
            <label for="isCorrect">Correct:</label>
            <input type="checkbox" name="questions[${questionCount - 1}][answers][${answerCount}][isCorrect]">
        </div>
    `;
    document.querySelectorAll('.question')[questionCount - 1].querySelector('.answers').insertAdjacentHTML('beforeend', newAnswerHtml);
});
