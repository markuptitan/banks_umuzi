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

  describe("deposit", () => {
    let savingsAccountNumber;
    beforeEach(() => {
      bank.addAccountType(savingsAccount);
      accountNumber = bank.openBankAccount(savingsAccount);
    });

    it("should deposit money into an account successfully", () => {
      bank.deposit({ accountNumber, amount: 100 });
      expect(bank.getBalance({ accountNumber })).toBe("100.00");
    });
    it("should throw an error if the deposit amount is invalid", () => {
      expect(() => bank.deposit({ accountNumber, amount: -50 })).toThrowError(
        "Deposit amount must be greater than 0."
      );
    });
    it("should throw an error if the account number is invalid", () => {
      expect(() =>
        bank.deposit({ accountNumber: "1234567890", amount: 100 })
      ).toThrowError("Account 1234567890 does not exist.");
    });
  });

  describe("withdraw", () => {
    let savingsAccountNumber;
    beforeEach(() => {
      bank.addAccountType(savingsAccount);
      accountNumber = bank.openBankAccount(savingsAccount);
    });

    it("should withdraw money from an account successfully", () => {
      bank.deposit({ accountNumber, amount: 100 });
      bank.withdraw({ accountNumber, amount: 50 });
      expect(bank.getBalance({ accountNumber })).toBe("50.00");
    });
    it("should throw an error if the withdrawal amount is invalid", () => {
      expect(() => bank.withdraw({ accountNumber, amount: -50 })).toThrowError(
        "Withdrawal amount must be greater than 0."
      );
    });
    it("should throw an error if the withdrawal exceeds the balance", () => {
      expect(() => bank.withdraw({ accountNumber, amount: 100 })).toThrowError(
        "Cannot withdraw more than available balance"
      );
    });
    it("should throw an error if the account number is invalid", () => {
      expect(() =>
        bank.withdraw({ accountNumber: "1234567890", amount: 100 })
      ).toThrowError("Account 1234567890 does not exist.");
    });
  });

  describe("transfer", () => {
    let fromAccountNumber;
    let toAccountNumber;
    beforeEach(() => {
      bank.addAccountType(savingsAccount);
      bank.addAccountType(currentAccount);
      fromAccountNumber = bank.openBankAccount(savingsAccount);
      toAccountNumber = bank.openBankAccount(currentAccount);
    });

    it("should transfer money between accounts successfully", () => {
      bank.deposit({ accountNumber: fromAccountNumber, amount: 100 });
      bank.transfer({
        fromAccountNumber,
        toAccountNumber,
        amount: 50,
      });

      expect(bank.getBalance({ accountNumber: fromAccountNumber })).toBe(
        "50.00"
      );
      expect(bank.getBalance({ accountNumber: toAccountNumber })).toBe("50.00");
    });

    it("should throw an error if the transfer amount is invalid", () => {
      expect(() =>
        bank.transfer({
          fromAccountNumber,
          toAccountNumber,
          amount: -50,
        })
      ).toThrowError("Transfer amount must be greater than 0.");
    });

    it("should throw an error if the accounts are the same", () => {
      expect(() =>
        bank.transfer({
          fromAccountNumber,
          toAccountNumber: fromAccountNumber,
          amount: 50,
        })
      ).toThrowError("Cannot transfer to the same account.");
    });

    it("should throw an error if the balance in fromAccount is insufficient", () => {
      expect(() =>
        bank.transfer({
          fromAccountNumber,
          toAccountNumber,
          amount: 50,
        })
      ).toThrowError("Insufficient balance.");
    });
  });
  describe("getInterestRate", () => {
    let savingsInterestRate;
    let currentAccountInterestRate;
    let savingsAccountNumber;
    let currentAccountNumber;

    beforeEach(() => {
      bank.addAccountType(savingsAccount);
      bank.addAccountType(currentAccount);
      savingsAccountNumber = bank.openBankAccount(savingsAccount);
      currentAccountNumber = bank.openBankAccount(currentAccount);
      savingsInterestRate = bank.getInterestRate({
        accountNumber: savingsAccountNumber,
      });
      currentAccountInterestRate = bank.getInterestRate({
        accountNumber: currentAccountNumber,
      });
    });

    it("should throw an error if the account number is invalid", () => {
      expect(() =>
        bank.getInterestRate({ accountNumber: "1234567890" })
      ).toThrowError("Account 1234567890 does not exist.");
    });

    it("should return the interest rate for a valid account type", () => {
      expect(currentAccountInterestRate).toBe(2.5);
      expect(savingsInterestRate).toBe(5);
    });
  });
});
