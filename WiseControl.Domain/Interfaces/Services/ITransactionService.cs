using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WiseControl.DTOs;

namespace WiseControl.Domain.Interfaces.Services
{
    public interface ITransactionService
    {

        Task<IEnumerable<TransactionDTO>> GetTransactions();

        Task<IEnumerable<TransactionDTO>> GetTransactionsByAccount(long accountId);

        Task<TransactionDTO> GetById(long? id);

        //Task<ProductDTO> GetProductCategory(int? id);
        Task Add(TransactionDTO transactionDto);
        Task Update(TransactionDTO transactionDto);

        Task Remove(long? id);


    }
}