namespace WiseControl.DTOs
{
    public class TransactionDTO
    {
        public long AccountId { get; set; }

        public long TransactionId { get; set; }


        public TransactionType Type { get; set; }


        public string TypeDescription { get {
                if (Type == TransactionType.Credit) {
                    return "Crédito";

                }
                if (Type == TransactionType.Debit)
                {
                    return "Débito";
                }

                return "";
            } 
        }

        public String Description { get; set; }
        
        
        public decimal Value { get; set; }


        public string ValueDescription {
            get
            {
                if (Type == TransactionType.Credit)
                {
                    return Value.ToString("N2");

                }
                if (Type == TransactionType.Debit)
                {
                    return "-" + Value.ToString("N2");

                };

                return "";
            }
        }

        public enum TransactionType
        {
            Credit = 1,
            Debit = 2,
            None = 3
        }
    }
}