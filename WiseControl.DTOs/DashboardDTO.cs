using System.Text.Json.Serialization;
using System.Transactions;

namespace WiseControl.DTOs
{
    public class DashboardDTO
    {
        public string TotalBalanceDescription;
        public string TotalDebitDescription;
        public string TotalCreditDescription;

        
        [JsonIgnore]
        public TransactionDTO[] Transactions;


        [JsonIgnore]
        public AccountDTO[]  Accounts;
    }
}