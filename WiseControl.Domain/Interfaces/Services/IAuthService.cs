using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WiseControl.DTOs;

namespace WiseControl.Domain.Interfaces.Services
{
    public interface IAuthService
    {

        Task<bool> Authenticate(UserCredentialDTO userCredentialDTO);
        Task<UserDTO> Add(UserDTO userDTO);
        
    }
}
