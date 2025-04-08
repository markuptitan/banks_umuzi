# 🏦 Simple Banking System - ES6 Version 💻

Welcome to the Simple Banking System project! 🚀 This is a fully tested, command-line interface (CLI) banking system built with ES6 JavaScript. 💡

The project is based on Part 1 and Part 2 of the Africa Code Net syllabus, implementing a simple banking system with account management features like deposits, withdrawals, balance checks, transfers, and interest calculations.

🔗 **Project Link**: ACN Syllabus - Banking System

## 📝 Features

### Bank Class: 
Central class managing multiple bank accounts.

### BankAccount Class: 
Handles individual bank accounts, supporting operations like deposits, withdrawals, and balance inquiries.

### Interest Rate Management: 
Bank offers different account types with varying interest rates. 💰

### Fully Tested: 
The entire system is thoroughly tested to ensure functionality and reliability. 🧪

## 🔧 Technologies Used

- **JavaScript ES6**: Written using the latest ECMAScript 6 features to ensure a modern and clean codebase. ✨
- **Node.js**: Runs in the command line with Node.js for backend operations. 🖥️
- **Test Framework**: All methods are tested with the `assert` module to ensure the system functions correctly. ✅

## 📚 Classes and Methods

### Bank Class 🏦
The Bank class handles the creation and management of bank accounts.

- **addAccountType({ accountType, interestRate })**  
  Adds a new account type with an interest rate to the bank. Ensures no duplicate account types and the interest rate is valid.

- **openBankAccount({ accountType })**  
  Opens a new bank account of the specified account type. Automatically generates a unique account number.

- **getBalance({ accountNumber })**  
  Retrieves the balance of the specified account.

- **deposit({ accountNumber, amount })**  
  Deposits a specified amount into the given account.

- **withdraw({ accountNumber, amount })**  
  Withdraws a specified amount from the given account.

- **transfer({ fromAccountNumber, toAccountNumber, amount })**  
  Transfers a specified amount from one account to another, ensuring sufficient funds and valid accounts.

- **getInterestRate({ accountNumber })**  
  Retrieves the interest rate for the specified account.

- **compoundInterest()**  
  Compounds the interest on all accounts in the bank.

### BankAccount Class 💳
The BankAccount class handles individual account details and transactions.

- **deposit({ amount })**  
  Deposits the given amount into the account.

- **withdraw({ amount })**  
  Withdraws the given amount from the account, ensuring sufficient funds.

- **compoundInterest()**  
  Applies compound interest to the account balance.

## 🛠️ Future Features

- **UI Implementation**: Currently, the project is CLI-based, but a user interface will be built in the future for better interaction. 🎨
- **Account Types**: Expand with additional account types, such as checking or business accounts. 🏦💼
- **Real-Time Data Integration**: Integrate APIs for real-time currency conversion and other financial tools. 🌍💵

## 🤝 Contributing

Feel free to fork this repo and submit a pull request if you wish to contribute! Contributions are welcome and appreciated. 🎉

### Steps for Contributing:

1. Fork the repository 🍴
2. Create a new branch 🌱
3. Make your changes ✨
4. Submit a pull request 👨‍💻
