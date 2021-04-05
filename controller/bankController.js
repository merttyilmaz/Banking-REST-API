import {existingAccounts, currencyChecker, validateCreateTransaction, senderAccountFinder, receiverAccountFinder} from '../controller/bankControllerValidation.js'

var errorType = "";

var errorExists = false;

var accountBalanceConverter = 0;

export const bankAccounts = [];

const moneyTransactions = [];

export const getAccounts = (req, res) => {
    res.send(bankAccounts);
};

export const createAccount = (req, res) => {
    var cChecker = currencyChecker(req);   
      
    if(existingAccounts(req, res) == false) {
        if(cChecker == "true"){
            req.body.accountNumber = parseInt(req.body.accountNumber);

            req.body.balance = parseFloat(req.body.balance.toFixed(2));

            bankAccounts.push(req.body); 
            
            res.status(299).send({
                isError : false,
                referenceNumber : Math.floor(Math.random() * 1000)
            });  
        } else {
            errorType = cChecker,
            res.status(409).send({
                isError: true,
                errorType,
                referenceNumber: Math.floor(Math.random() * 1000)
            });
        }
    } else {
        errorType = "Account already exists";
        res.status(409).send({
            isError: true,
            errorType,
            referenceNumber: Math.floor(Math.random() * 1000)
        });
    }
};

export const getTransactions = (req, res) => {
    res.send(moneyTransactions);
};

export const createTransaction = (req, res) => {
    let senderIndex = senderAccountFinder(req);
    let receiverIndex = receiverAccountFinder(req);
    let validate =  validateCreateTransaction(req);

    if(validate == "true"){
        accountBalanceConverter = parseFloat(bankAccounts[senderIndex].balance);
        accountBalanceConverter -= parseFloat(req.body.amount);
        bankAccounts[senderIndex].balance = parseFloat(accountBalanceConverter.toFixed(2));

        accountBalanceConverter = parseFloat(bankAccounts[receiverIndex].balance);
        accountBalanceConverter += parseFloat(req.body.amount);
        bankAccounts[receiverIndex].balance = parseFloat(accountBalanceConverter.toFixed(2));

        accountBalanceConverter = req.body.amount;
        req.body.amount = parseFloat(accountBalanceConverter.toFixed(2));

        moneyTransactions.push(req.body);

        res.status(299).send({
        isError : false,
        referenceNumber : Math.floor(Math.random() * 100)
        }); 
    } else {
        errorType = validate;
        res.status(409).send({
            isError: true,
            errorType,
            referenceNumber: Math.floor(Math.random() * 1000)
        });
    }
};
    
