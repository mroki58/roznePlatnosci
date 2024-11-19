document.getElementById('payment-method').addEventListener('change', function () {
    const selectedMethod = this.value;
    document.getElementById('credit-card-fields').style.display = selectedMethod === 'creditCard' ? 'block' : 'none';
    document.getElementById('paypal-fields').style.display = selectedMethod === 'paypal' ? 'block' : 'none';
});

document.getElementById('payment-form').addEventListener('submit', async function (e) {
    e.preventDefault();

    const paymentMethod = document.getElementById('payment-method').value;
    const amount = document.getElementById('amount').value;

    let paymentData;

    if (paymentMethod === 'creditCard') {
        paymentData = {
            cardNumber: document.getElementById('card-number').value,
            expiryDate: document.getElementById('expiry-date').value,
            cvv: document.getElementById('cvv').value,
        };
    } else if (paymentMethod === 'paypal') {
        paymentData = {
            email: document.getElementById('paypal-email').value,
        };
    }

    const response = await fetch('/process-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ method: paymentMethod, data: paymentData, amount })
    });

    const result = await response.json();
    document.getElementById('result').textContent = result.message;
});