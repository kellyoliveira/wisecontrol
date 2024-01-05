export class Transaction {

    public transactionId : Number = 0;
    public description : string = '';
    public value: Number = 0;
    public type: TransactionType = TransactionType.None;

}


export enum TransactionType {
    Credit = 1,
    Debit = 2,
    None = 3
}