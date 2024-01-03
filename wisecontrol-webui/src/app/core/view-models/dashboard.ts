import { Account } from '../view-models/account';
import { Transaction } from '../view-models/transaction';


export class Dashboard {


    public totalBalanceDescription : string = '';
    public totalDebitDescription: string = '';
    public totalCreditDescription: string = '';


    public totalBalance : Number = 0;
    public totalDebit: Number = 0;
    public totalCredit: Number = 0;

    public transactions: Transaction[] = [];

    public accounts: Account[] = [];

}