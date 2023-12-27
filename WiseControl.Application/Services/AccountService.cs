using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using WiseControl.Domain.Entities;
using WiseControl.Domain.Interfaces;
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

            List<AccountDTO> accountsDTos = new List<AccountDTO>();

            //transactionsDTos.Add(new TransactionDTO() { Description = "Lançamento", Date = System.DateTime.Now, Id = 1, Value = 100 });

            accountsDTos.Add(new AccountDTO() { Description = "Lançamento", AccountId = 1});


            return accountsDTos;

            //var transactionsEntities = await _transactionRepository.GetTransactionsAsync();


            //return _mapper.Map<IEnumerable<TransactionDTO>>(transactionsEntities);

        }

        public async Task<AccountDTO> GetById(int? id)
        {
            //var transactionEntity = await _transactionRepository.GetByIdAsync(id);

            //return _mapper.Map<TransactionDTO>(transactionEntity);

            //var transactionEntity = new TransactionDTO() { Description = "Lançamento", Date = System.DateTime.Now, Id = 1, Value = 100 };


            var accountEntity = new AccountDTO() { Description = "Conta Padrão", AccountId = 1 };

            return accountEntity;
        }

        public async Task Add(AccountDTO accountDto)
        {
            var accountEntity = _mapper.Map<Account>(accountDto);
            await _accountRepository.CreateAsync(accountEntity);
        }

        public async Task Update(AccountDTO accountDto)
        {
            var accountEntity = _mapper.Map<Account>(accountDto);
            await _accountRepository.UpdateAsync(accountEntity);
        }

        public async Task Remove(int? id)
        {
            var accountEntity = _accountRepository.GetByIdAsync(id).Result;
            await _accountRepository.RemoveAsync(accountEntity);
        }


    }
}
