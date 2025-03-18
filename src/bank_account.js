const assert = require("assert");
const Decimal = require("decimal.js");

class BankAccount {
  constructor({ interestRate }) {
    assert(interestRate >= 0, "Interest rate can not be negative");
    this.balance = new Decimal(0).toFixed(2);
    this.interestRate = new Decimal(interestRate);
  }
  deposit({ amount }) {
    assert(amount > 0, "Deposit amount must be positive");
    this.balance = new Decimal(this.balance).plus(amount).toFixed(2);
  }
}

module.exports = { BankAccount };
