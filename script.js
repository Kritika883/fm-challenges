// Selecting elements
const billInput = document.getElementById('billAmount');
const tipButtons = document.querySelectorAll('.tip-btn');
const customTip = document.getElementById('customTip');
const numPeople = document.getElementById('numPeople');
const tipAmountDisplay = document.getElementById('tipAmount');
const totalAmountDisplay = document.getElementById('totalAmount');
const resetBtn = document.getElementById('resetBtn');
const errorMsg = document.getElementById('error-msg');

let tipPercent = 0;

// Event listeners for tip buttons
tipButtons.forEach(button => {
    button.addEventListener('click', function () {
        tipButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        tipPercent = parseFloat(this.dataset.tip);
        calculateTip();
    });
});

// Custom tip input
customTip.addEventListener('input', function () {
    tipButtons.forEach(btn => btn.classList.remove('active'));
    tipPercent = parseFloat(customTip.value) || 0;
    calculateTip();
});

// Bill and People input events
[billInput, numPeople].forEach(input => input.addEventListener('input', calculateTip));

// Calculation function
function calculateTip() {
    const bill = parseFloat(billInput.value);
    const people = parseFloat(numPeople.value);

    if (people <= 0) {
        errorMsg.style.display = 'block';
        return;
    } else {
        errorMsg.style.display = 'none';
    }

    const tipAmount = (bill * (tipPercent / 100)) / people;
    const totalAmount = (bill / people) + tipAmount;

    tipAmountDisplay.textContent = $${tipAmount.toFixed(2)};
    totalAmountDisplay.textContent = $${totalAmount.toFixed(2)};
}

// Reset button
resetBtn.addEventListener('click', function () {
    billInput.value = '';
    numPeople.value = '';
    customTip.value = '';
    tipAmountDisplay.textContent = '$0.00';
    totalAmountDisplay.textContent = '$0.00';
    tipButtons.forEach(btn => btn.classList.remove('active'));
    errorMsg.style.display = 'none';
});