class PaymentStrategy {
    
    pay(data, amount) {
        throw new Error('Metoda pay() musi być zaimplementowana!');
    }
}

module.exports = PaymentStrategy;