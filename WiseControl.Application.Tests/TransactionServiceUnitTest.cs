using AutoMapper;
using Moq;
using System.Transactions;
using WiseControl.Application.Mappings;
using WiseControl.Application.Services;
using WiseControl.Domain.Entities;
using WiseControl.Domain.Interfaces.Repositories;
using WiseControl.Domain.Interfaces.Services;
using WiseControl.DTOs;
using Transaction = WiseControl.Domain.Entities.Transaction;

namespace WiseControl.Application.Tests
{
    public class TransactionUnitTest
    {
        Mock<ITransactionRepository> mockTransactionRepo = new Mock<ITransactionRepository>();


        [Fact]
        public async void VerifyTransactionList()
        {

            var  transactions = new List<Transaction>(){
                new Transaction() { TransactionId=1, Description = "Transaction 1" },
                new Transaction() { TransactionId=2, Description = "Transaction 2" },
                new Transaction() { TransactionId=3, Description = "Transaction 3" }
            }.AsEnumerable();


            mockTransactionRepo.Setup(x => x.GetTransactionsAsync()).Returns(Task.FromResult(transactions));

            var mockMapper = new MapperConfiguration(cfg =>
            {
                cfg.AddProfile(new DomainToDTOMappingProfile());
            });
            var mapper = mockMapper.CreateMapper();


            ITransactionService transactionService = new TransactionService(mockTransactionRepo.Object, mapper);

            var list = await transactionService.GetTransactions();

            Assert.True(list.Count() == transactions.Count());
        }


        [Fact]
        public async void VerifyTransactionRegistrationn()
        {
            //Arrange
            mockTransactionRepo.Setup(x => x.CreateAsync(It.IsAny<Transaction>())).Returns(Task.FromResult(new Transaction() { }));

            var mockMapper = new MapperConfiguration(cfg =>
            {
                cfg.AddProfile(new DomainToDTOMappingProfile());
            });
            var mapper = mockMapper.CreateMapper();


            ITransactionService transactionService = new TransactionService(mockTransactionRepo.Object, mapper);

            TransactionDTO transactionDTO = new TransactionDTO() { Description = "Account" };

            await transactionService.Add(transactionDTO);


        }

    }
}