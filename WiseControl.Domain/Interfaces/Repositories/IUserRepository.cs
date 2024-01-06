using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WiseControl.Domain.Entities;

namespace WiseControl.Domain.Interfaces.Repositories
{
    public interface IUserRepository
    {
        Task<bool> VerifyCredentialsAsync(string login, string encryptedPassword);

        Task<User> CreateAsync(User user);
    }
}
