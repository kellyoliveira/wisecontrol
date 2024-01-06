using Microsoft.Extensions.Options;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Transactions;
using WiseControl.Domain.Entities;
using WiseControl.Domain.Interfaces.Repositories;
using WiseControl.Domain.Settings;

namespace WiseControl.Infra.Data.Repositories
{
    public class UserRepository : IUserRepository
    {

        private readonly IMongoCollection<User> _users;

        public UserRepository(IOptions<WiseControlDatabaseSettings> settings)
        {
            var client = new MongoClient(settings.Value.ConnectionString);
            var database = client.GetDatabase(settings.Value.DatabaseName);

            _users = database.GetCollection<User>("Users");

        }



        public async Task<bool> VerifyCredentialsAsync(string login, string encryptedPassword) {
            var result = await _users.FindAsync<User>(user => user.Email == login && user.Password == encryptedPassword);

            return result.Any();
        }

        public async Task<User> CreateAsync(User user) {
            var count = _users.CountDocuments(user => true);

            user.UserId = count + 1;

            await _users.InsertOneAsync(user);

            return user;

        }

    }
}
