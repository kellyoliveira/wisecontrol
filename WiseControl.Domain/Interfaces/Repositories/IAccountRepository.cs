﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WiseControl.Domain.Entities;

namespace WiseControl.Domain.Interfaces.Repositories
{
    public interface IAccountRepository
    {

        Task<IEnumerable<Account>> GetAccountsAsync();

        Task<Account> GetByIdAsync(long? id);

        Task<Account> CreateAsync(Account account);

        Task<Account> UpdateAsync(Account account);

        Task<Account> RemoveAsync(Account account);



    }
}
