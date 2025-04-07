const assert = require("assert");
const { BankAccount } = require("./bank_account");

const getInterestRate = (typeOfAcc, accTypesArray) => {
  const accountType = accTypesArray.find(
    (accType) => accType.accountType === typeOfAcc
  );
  assert(accountType, `Account type "${typeOfAcc}" does not exist.`);
  return accountType.interestRate;
};

const isNumberTaken = (accNumber, accsArray) =>
  accsArray.some((acc) => acc.accountNumber === accNumber);

const generateAccNumber = () =>
  Math.floor(1000000000 + Math.random() * 9000000000);

const generateUniqueAccNumber = (accsArray) => {
  let accountNum;
  do {
    accountNum = generateAccNumber();
  } while (isNumberTaken(accountNum, accsArray));
  return accountNum;
};

class Bank {
  constructor() {
    this.accountTypes = [];
    this.accounts = [];
  }
  addAccountType({ accountType, interestRate }) {
    assert(
      !this.accountTypes.some((type) => type.accountType === accountType),
      `Account type "${accountType}" already exists.`
    );
    assert(interestRate > 0, "Interest rate must be greater than 0.");
    this.accountTypes.push({ accountType, interestRate });
  }
  openBankAccount({ accountType }) {
    assert(
      this.accountTypes.some(
        (accountTypeObject) => accountTypeObject.accountType === accountType
      ),
      `Account type "${accountType}" is not valid.`
    );
    const accountInterest = getInterestRate(accountType, this.accountTypes);
    const accountNumber = generateUniqueAccNumber(this.accounts);
    const bankAccount = new BankAccount({
      interestRate: accountInterest,
      accountNumber,
    });
    this.accounts.push(bankAccount);
    return bankAccount.accountNumber;
  }
}

module.exports = { Bank };
