using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WiseControl.DTOs;

namespace WiseControl.Domain.Interfaces
{
    public interface IAccountService
    {

        Task<IEnumerable<AccountDTO>> GetAccounts();
        Task<AccountDTO> GetById(int? id);

        //Task<ProductDTO> GetProductCategory(int? id);
        Task Add(AccountDTO accountDto);
        Task Update(AccountDTO accountDto);

        Task Remove(int? id);

    }
}