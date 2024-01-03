namespace WiseControl.DTOs
{
    public class TransactionDTO
    {
        public long TransactionId { get; set; }


        //public TransactionType Type { get; set; }
        public String Description { get; set; }
        //public DateTimeOffset Date { get; set; }
        
        
        public decimal Value { get; set; }


        /*public enum TransactionType
        {
            Income,
            Expense
        }*/
    }
}