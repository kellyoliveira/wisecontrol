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
using WiseControl.Domain.Settings;
using static System.Runtime.InteropServices.JavaScript.JSType;
using Transaction = WiseControl.Domain.Entities.Transaction;

namespace WiseControl.Infra.Data.Repositories
{
    public class TransactionRepository : ITransactionRepository
    {


        private readonly IMongoCollection<Transaction> _transactions;


        public TransactionRepository(WiseControlDatabaseSettings settings) {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _transactions = database.GetCollection<Transaction>("Transactions");

        }

        public async Task<Transaction> CreateAsync(Transaction transaction)
        {

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

        public async Task<Transaction> GetByIdAsync(int? id)
        {

            var result = await _transactions.FindAsync<Transaction>(transaction => transaction.TransactionId == id);

            return result.FirstOrDefault();

        }

        public async Task<IEnumerable<Transaction>> GetTransactionsAsync()
        {
            var result = await _transactions.FindAsync(transaction => true);

            return result.ToEnumerable<Transaction>();


        }


    }
}
