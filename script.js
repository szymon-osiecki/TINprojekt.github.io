// Slider
let currentSlide = 0;
const slides = document.querySelector('.slides');
const slider = document.querySelector('.slider');
const slideCount = slides.children.length;

function adjustSliderHeight() {
    const currentImage = slides.children[currentSlide];
    slider.style.height = `${currentImage.offsetHeight}px`;
}

function showNextSlide() {
    currentSlide = (currentSlide + 1) % slideCount;
    slides.style.transform = `translateX(-${currentSlide * 100}%)`;
    adjustSliderHeight();
}

window.addEventListener('load', adjustSliderHeight);
window.addEventListener('resize', adjustSliderHeight);

setInterval(showNextSlide, 3000);

//Quiz

let score = 0;

function updateScore() {
    const scoreElement = document.getElementById('score-value');
    scoreElement.textContent = score;
}

document.querySelectorAll('.question').forEach(question => {
    const answers = question.querySelectorAll('.answer');
    const feedback = question.querySelector('.feedback');

    answers.forEach(answer => {
        answer.addEventListener('click', () => {
            if (question.classList.contains('answered')) return;
            const isCorrect = answer.getAttribute('data-correct') === 'true';
            if (isCorrect) {
                answer.classList.add('correct');
                score++;
                updateScore();
            } else {
                answer.classList.add('incorrect');
            }

            feedback.classList.remove('hidden', 'correct', 'incorrect');
            if (isCorrect) {
                feedback.textContent = "Poprawna odpowiedź";
                feedback.classList.add('correct');
            } else {
                feedback.textContent = "Błędna odpowiedź";
                feedback.classList.add('incorrect');
            }
            
            feedback.style.display = 'block';
            question.classList.add('answered');
            answers.forEach(btn => {
                btn.disabled = true;
                btn.classList.add('disabled');
                if (btn.getAttribute('data-correct') === 'true') {
                    btn.classList.add('correct');
                }
            });
        });
    });
});
