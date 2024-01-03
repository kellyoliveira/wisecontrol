namespace WiseControl.DTOs
{
    public class AccountDTO
    {
        public int AccountId { get; set; }


        //public TransactionType Type { get; set; }
        public String Description { get; set; }

        public decimal Balance { get; set; }


        public string Owner { get; set; }

    }
}