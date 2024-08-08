function divide(a, b) {
    if (b === 0) {
        throw new Error('zero division error');
    }
    return a / b;
}
module.exports = divide;
