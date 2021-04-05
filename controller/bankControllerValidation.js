import {bankAccounts} from '../controller/bankController.js'

export const currencyChecker = (req) => {
    if(req.body.currencyCode === 'TRY' || req.body.currencyCode === 'USD' || req.body.currencyCode === 'EUR')
        return "true";
    else
        return "Incompatible currency code";
}

export const existingAccounts = (req) => {
    let existingAccount = false;

    if(bankAccounts != undefined || bankAccounts.length != 0) {
        for(const account of bankAccounts){
            if(req.body.accountNumber == account.accountNumber)
                existingAccount = true;
            else 
                existingAccount = false;
        }       
    }
    return existingAccount;
}

export const senderAccountFinder = (req) => {
    return bankAccounts.findIndex(account => (account.accountNumber == req.body.senderAccountNumber));
}

export const receiverAccountFinder = (req) => {
   return bankAccounts.findIndex(account => (account.accountNumber == req.body.receiverAccountNumber));
}

export const validateCreateTransaction = (req) => {
    let senderIndex = senderAccountFinder(req);
    let receiverIndex = receiverAccountFinder(req);
   
    const sameAccountChecker = () => {
        if(bankAccounts[senderIndex].accountNumber != bankAccounts[receiverIndex].accountNumber)
            return true;
        else
            return false;
    }

    const balanceChecker = () => {
        if(bankAccounts[senderIndex].balance > 0)
            return true;
        else
            return false;
    }
    
    const transactionCurrencyChecker = () => {
        if(bankAccounts[receiverIndex].currencyCode === bankAccounts[senderIndex].currencyCode)
            return true;
        else
            return false;
    }

    const transferAmountChecker = () => {
        if(req.body.amount > 0)
            return true;
        else 
            return false;
    }

    if(senderIndex != -1) {
        if(receiverIndex != -1) {
            if(sameAccountChecker()) 
                if(balanceChecker())
                    if(transactionCurrencyChecker())   
                        if(transferAmountChecker()) 
                            return "true";                     
                        else 
                            return "Minimum amount you can send is 0";   
                    else 
                        return "Incompatible currency code";           
                else 
                 return "Insufficient balance";             
            else 
                return "Cannot transfer money to yourself";    
        }
        else 
            return "Receiver account does not exist";
    }
    else
        return "Sender account does not exist";
}