using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WiseControl.Application.Services;
using WiseControl.Domain.Interfaces.Repositories;
using WiseControl.Domain.Interfaces.Services;
using AutoMapper;
using WiseControl.Application.Mappings;
using WiseControl.DTOs;
using WiseControl.Domain.Entities;

namespace WiseControl.Application.Tests
{
    public class AuthServiceUnitTest
    {
        Mock<IUserRepository> mockAuthRepo = new Mock<IUserRepository>();

        [Fact]
        public void VerifyAuthentication()
        {
            //Arrange
            mockAuthRepo.Setup(x => x.VerifyCredentialsAsync(It.IsAny<string>(), It.IsAny<string>())).Returns(Task.FromResult(true));

            var mockMapper = new MapperConfiguration(cfg =>
            {
                cfg.AddProfile(new DomainToDTOMappingProfile());
            });
            var mapper = mockMapper.CreateMapper();


            IAuthService authService = new AuthService(mockAuthRepo.Object, mapper);

            UserCredentialDTO userCredential = new UserCredentialDTO() { Email = "kellyoliveira@gmail.com", Password = "2024" };

            var authenticationResult = authService.Authenticate(userCredential);

            Assert.True(authenticationResult.Result);
            

        }

        [Fact]
        public void VerifyUserRegistrationn()
        {
            //Arrange
            mockAuthRepo.Setup(x => x.CreateAsync(It.IsAny<User>())).Returns(Task.FromResult(new User() { }));

            var mockMapper = new MapperConfiguration(cfg =>
            {
                cfg.AddProfile(new DomainToDTOMappingProfile());
            });
            var mapper = mockMapper.CreateMapper();


            IAuthService authService = new AuthService(mockAuthRepo.Object, mapper);

            UserDTO user = new UserDTO() {Name = "Kelly Oliveira" ,Email = "kellyoliveira@gmail.com", Password = "2024" };

            var authenticationResult = authService.Add(user);

            Assert.True(authenticationResult.Result != null);


        }

    }
}
