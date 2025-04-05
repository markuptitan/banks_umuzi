const { Bank } = require("./../src/bank");

const savingsAccount = { accountType: "Savings", interestRate: 2.5 };

describe("Bank tests", () => {
  let bank;

  beforeEach(() => {
    bank = new Bank();
  });

  afterEach(() => {
    bank = null;
  });

  it("should add account types properly", () => {
    bank.addAccountType(savingsAccount);

    expect(
      bank.accountTypes.some(
        (acc) =>
          acc.accountType === savingsAccount.accountType &&
          acc.interestRate === savingsAccount.interestRate
      )
    ).toBe(true);
  });

  it("should not allow duplicate account types", () => {
    bank.addAccountType(savingsAccount);

    expect(() => bank.addAccountType(savingsAccount)).toThrowError(
      'Account type "Savings" already exists.'
    );
  });

  it("should not allow negative interest rates", () => {
    const invalidAccount = { accountType: "Invalid", interestRate: -1 };

    expect(() => bank.addAccountType(invalidAccount)).toThrowError(
      "Interest rate must be greater than 0."
    );
  });
});
