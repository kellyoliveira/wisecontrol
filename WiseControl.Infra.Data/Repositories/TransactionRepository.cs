using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using WiseControl.Domain.Entities;
using WiseControl.Domain.Interfaces;

namespace WiseControl.Infra.Data.Repositories
{
    public class TransactionRepository : ITransactionRepository
    {
        Task<Transaction> ITransactionRepository.CreateAsync(Transaction product)
        {
            throw new NotImplementedException();
        }

        Task<Transaction> ITransactionRepository.GetByIdAsync(int? id)
        {
            throw new NotImplementedException();
        }

        Task<IEnumerable<Transaction>> ITransactionRepository.GetTransactionsAsync()
        {
            List<Transaction> transactions = new List<Transaction>();

            transactions.Add(new Transaction() { Description = "Lançamento", Type = Transaction.TransactionType.Income, Date = System.DateTime.Now, Id=1, Value=100});



            return Task.FromResult(transactions.AsEnumerable()); 

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
