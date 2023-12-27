using WiseControl.Domain.Interfaces;
using Account = WiseControl.Domain.Entities.Account;

namespace WiseControl.Infra.Data.Repositories
{
    public class AccountRepository : IAccountRepository
    {



        Task<Account> IAccountRepository.CreateAsync(Account account)
        {
            throw new NotImplementedException();
        }

        public async Task<Account> GetByIdAsync(int? id)
        {
            //var transaction = new Transaction() { Description = "Lançamento", Date = System.DateTime.Now, Id = 1, Value = 100 };


            var account = new Account() { Description = "Lançamento", AccountId = 1 };

            var result = await Task.FromResult(account);

            return result;

        }

        public async Task<IEnumerable<Account>> GetAccountsAsync()
        {
            List<Account> accounts = new List<Account>();

            accounts.Add(new Account() { Description = "Lançamento", AccountId = 1 });

           
            var result = await Task.FromResult(accounts);

            return result;

        }

        Task<Account> IAccountRepository.RemoveAsync(Account account)
        {
            throw new NotImplementedException();
        }

        Task<Account> IAccountRepository.UpdateAsync(Account account)
        {
            throw new NotImplementedException();
        }
    }
}
