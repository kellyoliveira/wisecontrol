using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WiseControl.Domain.Entities;
using WiseControl.DTOs;

namespace WiseControl.Domain.Interfaces.Repositories
{
    public interface ITransactionRepository
    {

        Task<IEnumerable<Transaction>> GetTransactionsAsync();

        Task<IEnumerable<Transaction>> GetTransactionsByAccountAsync(long accountId);

        Task<Transaction> GetByIdAsync(long? id);
        
        Task<Transaction> CreateAsync(Transaction transaction);
        
        Task<Transaction> UpdateAsync(Transaction transaction);
        
        Task<Transaction> RemoveAsync(Transaction transaction);


    }
}
