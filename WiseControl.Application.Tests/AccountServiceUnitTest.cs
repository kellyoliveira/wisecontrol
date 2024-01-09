using AutoMapper;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WiseControl.Application.Mappings;
using WiseControl.Application.Services;
using WiseControl.Domain.Entities;
using WiseControl.Domain.Interfaces.Repositories;
using WiseControl.Domain.Interfaces.Services;
using WiseControl.DTOs;

namespace WiseControl.Application.Tests
{
    public class AccountServiceUnitTest
    {

        Mock<IAccountRepository> mockAccountRepo = new Mock<IAccountRepository>();

        [Fact]
        public async void VerifyAccountList()
        {

            var accounts = new List<Account>(){
                new Account() { AccountId=1, Description = "Transaction 1" },
                new Account() { AccountId=2, Description = "Transaction 2" },
                new Account() { AccountId=3, Description = "Transaction 3" }
            }.AsEnumerable();


            mockAccountRepo.Setup(x => x.GetAccountsAsync()).Returns(Task.FromResult(accounts));

            var mockMapper = new MapperConfiguration(cfg =>
            {
                cfg.AddProfile(new DomainToDTOMappingProfile());
            });
            var mapper = mockMapper.CreateMapper();


            IAccountService accountService = new AccountService(mockAccountRepo.Object, mapper);

            var list = await accountService.GetAccounts();

            Assert.True(list.Count() == accounts.Count());
        }

        [Fact]
        public async void VerifyAccountRegistrationn()
        {
            //Arrange
            mockAccountRepo.Setup(x => x.CreateAsync(It.IsAny<Account>())).Returns(Task.FromResult(new Account() { }));

            var mockMapper = new MapperConfiguration(cfg =>
            {
                cfg.AddProfile(new DomainToDTOMappingProfile());
            });
            var mapper = mockMapper.CreateMapper();


            IAccountService accountService = new AccountService(mockAccountRepo.Object, mapper);

            AccountDTO accountDTO = new AccountDTO() { Description = "Account" };

            await accountService.Add(accountDTO);

            
        }

    }
}
