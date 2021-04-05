import express from 'express';

import {getAccounts, createAccount, getTransactions, createTransaction } from '../controller/bankController.js'

const router = express.Router();

router.get('/accounts', getAccounts);

router.post('/createAccount', createAccount);

router.get('/transactions' , getTransactions);

router.post('/createTransaction', createTransaction);

export default router;