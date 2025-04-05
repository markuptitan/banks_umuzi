const assert = require("assert");

class Bank {
  constructor() {
    this.accountTypes = [];
  }
  addAccountType({ accountType, interestRate }) {
    assert(
      !this.accountTypes.some((type) => type.accountType === accountType),
      `Account type "${accountType}" already exists.`
    );
    assert(interestRate > 0, "Interest rate must be greater than 0.");
    this.accountTypes.push({ accountType, interestRate });
  }
}

module.exports = { Bank };
