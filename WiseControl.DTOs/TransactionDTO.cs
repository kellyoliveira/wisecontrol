using System.ComponentModel.DataAnnotations;
using System.ComponentModel;

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


        [Required(ErrorMessage = "O campo descrição é obrigatório")]
        [MaxLength(100)]
        [DisplayName("Descrição")]
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