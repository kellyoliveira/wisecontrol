using WiseControl.Domain.Interfaces;
using Account = WiseControl.Domain.Entities.Account;
using MongoDB.Driver;
using System.Collections.Generic;
using System.Linq;
using WiseControl.Domain.Settings;
using Microsoft.Extensions.Options;


namespace WiseControl.Infra.Data.Repositories
{
    public class AccountRepository : IAccountRepository
    {

        private readonly IMongoCollection<Account> _accounts;


        public AccountRepository(IOptions<WiseControlDatabaseSettings> settings)
        {
            var client = new MongoClient(settings.Value.ConnectionString);
            var database = client.GetDatabase(settings.Value.DatabaseName);

            _accounts = database.GetCollection<Account>("Accounts");

        }


        public async Task<Account> CreateAsync(Account account)
        {
            var count = _accounts.CountDocuments(accounts => true);

            account.AccountId = count + 1;

            await _accounts.InsertOneAsync(account);

            return account;
            
        }


        public async Task<Account> RemoveAsync(Account account)
        {
            var result = await _accounts.DeleteOneAsync(accountDB => accountDB.AccountId == account.AccountId);

            return account;
            
        }

        public async Task<Account> UpdateAsync(Account account)
        {
            var result = await _accounts.ReplaceOneAsync(accountDB => accountDB.AccountId == account.AccountId, account);

            return account;
        }

        public async Task<Account> GetByIdAsync(long? id)
        {

            var result = await _accounts.FindAsync<Account>(account => account.AccountId == id);

            return result.FirstOrDefault();

        }

        public async Task<IEnumerable<Account>> GetAccountsAsync()
        {
            var result = await _accounts.FindAsync(account => true);

            return result.ToList<Account>().OrderByDescending(p => p.AccountId);


        }

      
    }
}
