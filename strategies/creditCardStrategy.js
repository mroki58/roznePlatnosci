const PaymentStrategy = require('./paymentStrategy');

class CreditCardStrategy extends PaymentStrategy {
    pay(data, amount) {
        const { cardNumber, expiryDate, cvv } = data;
        if (cardNumber.startsWith('4')) {
            return `Płatność kartą zaakceptowana: ${amount} PLN`;
        }
        return 'Płatność kartą odrzucona: niewłaściwa karta';
    }
}

module.exports = CreditCardStrategy;