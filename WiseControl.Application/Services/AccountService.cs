using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using WiseControl.Domain.Entities;
using WiseControl.Domain.Interfaces.Repositories;
using WiseControl.Domain.Interfaces.Services;
using WiseControl.DTOs;

namespace WiseControl.Application.Services
{
    public class AccountService : IAccountService
    {

        private IAccountRepository _accountRepository;
        private readonly IMapper _mapper;

        public AccountService(IAccountRepository accountRepository, IMapper mapper)
        {
            _accountRepository = accountRepository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<AccountDTO>> GetAccounts()
        {

            var accountEntities = await _accountRepository.GetAccountsAsync();

      
            return _mapper.Map<IEnumerable<AccountDTO>>(accountEntities).OrderByDescending(p => p.AccountId);

        }

        public async Task<AccountDTO> GetById(long? id)
        {
            var accountEntity = await _accountRepository.GetByIdAsync(id);

            return _mapper.Map<AccountDTO>(accountEntity);

        }

        public async Task Add(AccountDTO accountDto)
        {
            var accountEntity = _mapper.Map<Account>(accountDto);
            await _accountRepository.CreateAsync(accountEntity);
        }

        public async Task Update(AccountDTO accountDto)
        {
            var accountEntity = _mapper.Map<Account>(accountDto);

            var oldAccountEntity = await _accountRepository.GetByIdAsync(accountEntity.AccountId);

            accountEntity.AccountUId = oldAccountEntity.AccountUId;

            await _accountRepository.UpdateAsync(accountEntity);
        }

        public async Task Remove(long? id)
        {
            var accountEntity = await _accountRepository.GetByIdAsync(id);
            await _accountRepository.RemoveAsync(accountEntity);
        }


        public async Task RefreshBalance(long id, TransactionDTO[] transactions) {
            var accountEntity = await _accountRepository.GetByIdAsync(id);

            var totalCredit = transactions.Where(p => p.Type == TransactionDTO.TransactionType.Credit && p.AccountId == id).Sum(c => c.Value);

            var totalDebit = transactions.Where(p => p.Type == TransactionDTO.TransactionType.Debit && p.AccountId == id).Sum(c => c.Value);

            accountEntity.Balance = totalCredit - totalDebit;

            await _accountRepository.UpdateAsync(accountEntity);

        }

    }
}
