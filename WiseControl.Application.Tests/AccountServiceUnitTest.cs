using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WiseControl.Application.Tests
{
    internal class AccountServiceUnitTest
    {
        [Fact]
        public void VerifyAccountAfterBeingAddedTest()
        {
            //Arrange
            var num = 6;
            //Act
            bool result = Mathematics.IsEvenNumber(num);
            //Assert
            Assert.True(result);
        }


    }
}
