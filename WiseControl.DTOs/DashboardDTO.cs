using System.Text.Json.Serialization;
using System.Transactions;

namespace WiseControl.DTOs
{
    public class DashboardDTO
    {
        public string TotalBalanceDescription { get; set; }
        public string TotalDebitDescription { get; set; }
        public string TotalCreditDescription { get; set; }

        
        public TransactionDTO[] Transactions {
            get;
            set;
        }


        public AccountDTO[] Accounts {
            get;
            set;
        }
    }
}