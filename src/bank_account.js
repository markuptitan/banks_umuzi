const assert = require("assert");
const Decimal = require("decimal.js");

const validatePositiveNumber = (value, errorMessage) => {
  assert(value > 0, errorMessage);
};

class BankAccount {
  constructor({ interestRate }) {
    assert(interestRate >= 0, "Interest rate can not be negative");
    this.balance = new Decimal(0).toFixed(2);
    this.interestRate = new Decimal(interestRate);
  }

  deposit({ amount }) {
    validatePositiveNumber(amount, "Deposit amount must be positive");
    this.balance = new Decimal(this.balance).plus(amount).toFixed(2);
  }

  withdraw({ amount }) {
    validatePositiveNumber(amount, "Withdrawal amount must be positive");
    assert(
      amount <= this.balance,
      "Cannot withdraw more than available balance"
    );
    this.balance = new Decimal(this.balance).minus(amount).toFixed(2);
  }

  compoundInterest() {
    const monthlyInterest = new Decimal(this.balance)
      .times(this.interestRate)
      .div(100)
      .div(12);
    this.balance = new Decimal(this.balance).plus(monthlyInterest).toFixed(2);
  }
}

module.exports = { BankAccount };
