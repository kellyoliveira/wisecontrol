namespace WiseControl.DTOs
{
    public class TransactionDTO
    {
        public long TransactionId { get; set; }


        public TransactionType Type { get; set; }
        public String Description { get; set; }
        
        
        public decimal Value { get; set; }


        public enum TransactionType
        {
            Credit = 1,
            Debit = 2,
            None = 3
        }
    }
}