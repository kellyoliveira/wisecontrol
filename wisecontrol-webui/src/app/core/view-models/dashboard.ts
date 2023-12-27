import { Account } from '../view-models/account';
import { Transaction } from '../view-models/transaction';


export class Dashboard {


    public totalBalanceDescription : string = '';
    public totalDebitDescription: string = '';
    public totalCreditDescription: string = '';

    public totalSavingsDescription: string = '';

    public totalBillsDescripton : string = '';


    public transactions: Transaction[] = [];

    public accounts: Account[] = [];

}