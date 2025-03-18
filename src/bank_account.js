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

  updateBalance(amount) {
    this.balance = new Decimal(this.balance).plus(amount).toFixed(2);
  }

  processAmount = (amount, type) => {
    validatePositiveNumber(
      amount,
      `${type === "deposit" ? "Deposit" : "Withdrawal"} amount must be positive`
    );
    if (type === "withdraw") {
      assert(
        amount <= this.balance,
        "Cannot withdraw more than available balance"
      );
    }
    const adjustment = type === "deposit" ? amount : -amount;
    this.updateBalance(adjustment);
  };

  deposit({ amount }) {
    this.processAmount(amount, "deposit");
  }

  withdraw({ amount }) {
    this.processAmount(amount, "withdraw");
  }

  compoundInterest() {
    const monthlyInterest = new Decimal(this.balance)
      .times(this.interestRate)
      .div(100)
      .div(12);
    this.updateBalance(monthlyInterest);
  }
}

module.exports = { BankAccount };
