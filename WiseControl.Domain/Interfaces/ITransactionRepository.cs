using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WiseControl.Domain.Entities;

namespace WiseControl.Domain.Interfaces
{
    public interface ITransactionRepository
    {

        Task<IEnumerable<Transaction>> GetTransactionsAsync();

        Task<Transaction> GetByIdAsync(int? id);
        
        Task<Transaction> CreateAsync(Transaction product);
        
        Task<Transaction> UpdateAsync(Transaction product);
        
        Task<Transaction> RemoveAsync(Transaction product);

    }
}
