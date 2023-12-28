using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WiseControl.DTOs;

namespace WiseControl.Domain.Interfaces
{
    public interface ITransactionService
    {

        Task<IEnumerable<TransactionDTO>> GetTransactions();
        Task<TransactionDTO> GetById(int? id);

        //Task<ProductDTO> GetProductCategory(int? id);
        Task Add(TransactionDTO transactionDto);
        Task Update(TransactionDTO transactionDto);

        Task Remove(int? id);

        

        Task<DashboardDTO> GetDashboard();

    }
}