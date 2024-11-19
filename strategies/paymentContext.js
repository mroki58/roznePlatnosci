class PaymentContext {
    constructor() {
        this.strategy = null;
    }

    // Ustawia strategię płatności
    setStrategy(strategy) {
        this.strategy = strategy;
    }

    // Przetwarza płatność za pomocą ustawionej strategii
    processPayment(data, amount) {
        if (!this.strategy) {
            throw new Error('Nie ustawiono strategii płatności');
        }
        return this.strategy.pay(data, amount);
    }
}

module.exports = PaymentContext;
