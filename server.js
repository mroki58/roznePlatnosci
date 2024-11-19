const express = require('express');
const bodyParser = require('body-parser');
const CreditCardStrategy = require('./strategies/creditCardStrategy');
const PayPalStrategy = require('./strategies/paypalStrategy');
const PaymentContext = require('./strategies/paymentContext'); // Zawiera logikę obsługi strategii

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));


const strategies = {
    creditCard: new CreditCardStrategy(),
    paypal: new PayPalStrategy()
};


app.post('/process-payment', (req, res) => {
    const { method, data, amount } = req.body;

    
    const strategy = strategies[method];
    if (!strategy) {
        return res.status(400).json({ message: 'Nieobsługiwana metoda płatności' });
    }

    try {
        
        const paymentContext = new PaymentContext();
        paymentContext.setStrategy(strategy);

       
        const result = paymentContext.processPayment(data, amount);
        res.json({ message: result });
    } catch (error) {
        res.status(500).json({ message: 'Wystąpił błąd podczas przetwarzania płatności', error: error.message });
    }
});


app.listen(PORT, () => {
    console.log(`Serwer działa na porcie ${PORT}`);
});
