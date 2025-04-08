const { Bank } = require("./../src/bank");

const savingsAccount = { accountType: "Savings", interestRate: 5 };
const currentAccount = { accountType: "Current", interestRate: 2.5 };
const isStringOfDigitsOnly = (accountNum) => /^\d{10}$/.test(accountNum);

describe("Bank tests", () => {
  let bank;
  beforeEach(() => {
    bank = new Bank();
  });

  afterEach(() => {
    bank = null;
  });

  describe("addAccountType", () => {
    it("addAccountType", () => {
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

  describe("openBankAccount", () => {
    it("should open an account and return a 10 digit number", () => {
      bank.addAccountType(savingsAccount);
      const accNum = bank.openBankAccount({ accountType: "Savings" });
      expect(isStringOfDigitsOnly(accNum)).toBe(true);
    });
    it("should throw an error if the account type is not valid", () => {
      expect(() =>
        bank.openBankAccount({ accountType: "Invalid" })
      ).toThrowError('Account type "Invalid" is not valid.');
    });
    it("should generate a unique account number", () => {
      bank.addAccountType(savingsAccount);
      const accNum1 = bank.openBankAccount({ accountType: "Savings" });
      const accNum2 = bank.openBankAccount({ accountType: "Savings" });
      expect(accNum1).not.toBe(accNum2);
    });
  });

  describe("getBalance", () => {
    let savingsAccountNumber;
    beforeEach(() => {
      bank.addAccountType(savingsAccount);
      accountNumber = bank.openBankAccount(savingsAccount);
    });

    it("should return the balance of an account successfully", () => {
      expect(bank.getBalance({ accountNumber })).toBe("0.00");
    });
    it("should throw an error if the account number is invalid", () => {
      expect(() =>
        bank.getBalance({ accountNumber: "1234567890" })
      ).toThrowError("Account 1234567890 does not exist.");
    });
  });
});
