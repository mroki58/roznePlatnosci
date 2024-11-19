const PaymentStrategy = require('./paymentStrategy');

class CreditCardStrategy extends PaymentStrategy {
    pay(data, amount) {
        const { cardNumber, expiryDate, cvv } = data;
        return `Płatność kartą zaakceptowana: ${amount} PLN`;
    }
}

module.exports = CreditCardStrategy;