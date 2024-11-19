const express = require('express');
const bodyParser = require('body-parser');

// Import strategii płatności
const CreditCardStrategy = require('./strategies/creditCardStrategy');
const PayPalStrategy = require('./strategies/paypalStrategy');
const PaymentContext = require('./strategies/paymentContext'); // Zawiera logikę obsługi strategii

const app = express();
const PORT = 3000;

// Middleware do obsługi danych JSON
app.use(bodyParser.json());

// Serwowanie plików statycznych
app.use(express.static('public'));

// Lista strategii z nazwami klas
const strategies = {
    creditCard: new CreditCardStrategy(),
    paypal: new PayPalStrategy()
};

// Funkcja do obsługi płatności
app.post('/process-payment', (req, res) => {
    const { method, data, amount } = req.body;

    // Sprawdzenie, czy metoda płatności jest obsługiwana
    const strategy = strategies[method];
    if (!strategy) {
        return res.status(400).json({ message: 'Nieobsługiwana metoda płatności' });
    }

    try {
        // Utworzenie kontekstu płatności i ustawienie strategii
        const paymentContext = new PaymentContext();
        paymentContext.setStrategy(strategy);

        // Przetwarzanie płatności i zwrócenie wyniku
        const result = paymentContext.processPayment(data, amount);
        res.json({ message: result });
    } catch (error) {
        res.status(500).json({ message: 'Wystąpił błąd podczas przetwarzania płatności', error: error.message });
    }
});

// Uruchomienie serwera
app.listen(PORT, () => {
    console.log(`Serwer działa na porcie ${PORT}`);
});
