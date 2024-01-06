using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using System.Transactions;
using WiseControl.Domain.Entities;
using WiseControl.Domain.Interfaces;

using WiseControl.Domain.Interfaces.Repositories;
using WiseControl.Domain.Settings;
using static System.Runtime.InteropServices.JavaScript.JSType;
using Transaction = WiseControl.Domain.Entities.Transaction;
using Microsoft.Extensions.Options;
using WiseControl.DTOs;

namespace WiseControl.Infra.Data.Repositories
{
    public class TransactionRepository : ITransactionRepository
    {


        private readonly IMongoCollection<Transaction> _transactions;


        public TransactionRepository(IOptions<WiseControlDatabaseSettings> settings) {
            var client = new MongoClient(settings.Value.ConnectionString);
            var database = client.GetDatabase(settings.Value.DatabaseName);

            _transactions = database.GetCollection<Transaction>("Transactions");

        }


        public async Task<Transaction> CreateAsync(Transaction transaction)
        {

            var count = _transactions.CountDocuments(transaction => true);

            transaction.TransactionId = count + 1;

            await _transactions.InsertOneAsync(transaction);

            return transaction;

        }


        public async Task<Transaction> RemoveAsync(Transaction transaction)
        {
            var result = await _transactions.DeleteOneAsync(transactionDB => transactionDB.TransactionId == transaction.TransactionId);

            return transaction;

        }



        public async Task<Transaction> UpdateAsync(Transaction transaction)
        {
            var result = await _transactions.ReplaceOneAsync(transactionDB => transactionDB.TransactionId == transaction.TransactionId, transaction);

            return transaction;
        }

        public async Task<Transaction> GetByIdAsync(long? id)
        {

            var result = await _transactions.FindAsync<Transaction>(transaction => transaction.TransactionId == id);

            return result.FirstOrDefault();

        }

        public async Task<IEnumerable<Transaction>> GetTransactionsAsync()
        {
            var result = await _transactions.FindAsync(transaction => true);

            return result.ToEnumerable<Transaction>();


        }

        public async Task<IEnumerable<Transaction>> GetTransactionsByAccountAsync(long accountId) {
            var result = await _transactions.FindAsync(transaction => transaction.AccountId == accountId);

            return result.ToEnumerable<Transaction>();
        }


    }
}
