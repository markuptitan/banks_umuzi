const { BankAccount } = require("../src/bank_account");

describe("BankAccount tests", () => {
  let account;

  beforeEach(() => {
    account = new BankAccount({ interestRate: 10 });
  });

  afterEach(() => {
    account = null;
  });

  it("should initialize account with zero balance", () => {
    expect(account.balance).toBe("0.00");
  });

  it("should deposit money into the account", () => {
    account.deposit({ amount: 1500 });
    expect(account.balance).toBe("1500.00");
  });

  it("should withdraw money from the account", () => {
    account.deposit({ amount: 1500 });
    account.withdraw({ amount: 500 });
    expect(account.balance).toBe("1000.00");
  });
});
