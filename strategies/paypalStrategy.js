const PaymentStrategy = require('./paymentStrategy');

class PayPalStrategy extends PaymentStrategy {
    pay(data, amount) {
        const { email } = data;
        if (email && email.includes('@')) {
            return `Płatność przez PayPal zaakceptowana: ${amount} PLN`;
        }
        return 'Płatność przez PayPal odrzucona: nieprawidłowy email';
    }
}

module.exports = PayPalStrategy;