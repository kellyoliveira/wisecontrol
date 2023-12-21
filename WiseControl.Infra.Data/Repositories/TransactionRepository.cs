using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using System.Transactions;
using WiseControl.Domain.Entities;
using WiseControl.Domain.Interfaces;
using static System.Runtime.InteropServices.JavaScript.JSType;
using Transaction = WiseControl.Domain.Entities.Transaction;

namespace WiseControl.Infra.Data.Repositories
{
    public class TransactionRepository : ITransactionRepository
    {
        Task<Transaction> ITransactionRepository.CreateAsync(Transaction product)
        {
            throw new NotImplementedException();
        }

        public async Task<Transaction> GetByIdAsync(int? id)
        {
            var transaction = new Transaction() { Description = "Lançamento", Date = System.DateTime.Now, Id = 1, Value = 100 };

            var result = await Task.FromResult(transaction);

            return result;

        }

        public async Task<IEnumerable<Transaction>> GetTransactionsAsync()
        {
            List<Transaction> transactions = new List<Transaction>();

            transactions.Add(new Transaction() { Description = "Lançamento", Date = System.DateTime.Now, Id=1, Value=100});

            //transactions.Add(new Transaction() { Description = "Lançamento", Type = Transaction.TransactionType.Income, Date = System.DateTime.Now, Id=1, Value=100});

            var result = await Task.FromResult(transactions);

            return result;

        }

        Task<Transaction> ITransactionRepository.RemoveAsync(Transaction product)
        {
            throw new NotImplementedException();
        }

        Task<Transaction> ITransactionRepository.UpdateAsync(Transaction product)
        {
            throw new NotImplementedException();
        }
    }
}
