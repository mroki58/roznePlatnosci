const PaymentStrategy = require('./paymentStrategy');

class PayPalStrategy extends PaymentStrategy {
    pay(data, amount) {
        const { email } = data;
        return `Płatność przez PayPal zaakceptowana: ${amount} PLN`;

    }
}

module.exports = PayPalStrategy;