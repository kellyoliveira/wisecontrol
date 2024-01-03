using System.Text.Json.Serialization;
using System.Transactions;

namespace WiseControl.DTOs
{
    public class DashboardDTO
    {

        public DashboardDTO(TransactionDTO[] transactions, AccountDTO[] accounts) {

            this.Transactions = transactions;
            this.Accounts = accounts;

            this.TotalCredit = transactions.Sum(c => c.Value);

            this.TotalDebit = transactions.Sum(c => c.Value);

        }


        public decimal  TotalBalance { get { return TotalCredit - TotalDebit; } }
        public decimal TotalDebit { get; private set; }
        public decimal TotalCredit { get; private set; }

        public string TotalBalanceDescription { get { return TotalBalance.ToString("N"); } }
        public string TotalDebitDescription { get { return TotalDebit.ToString("N"); } }
        public string TotalCreditDescription { get { return TotalCredit.ToString("N"); } }

        
        public TransactionDTO[] Transactions {
            get;
            private set;
        }


        public AccountDTO[] Accounts {
            get;
            private set;
        }
    }
}