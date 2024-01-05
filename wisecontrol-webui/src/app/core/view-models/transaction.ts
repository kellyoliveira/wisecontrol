export class Transaction {

    public transactionId : Number = 0;

    public accountId : Number = 0;

    public description : string = '';
    public value: Number = 0;
    public valueDescription : string = '';
    
    public type: TransactionType = TransactionType.None;

    public typeDescription : string = '';

}


export enum TransactionType {
    Credit = 1,
    Debit = 2,
    None = 3
}