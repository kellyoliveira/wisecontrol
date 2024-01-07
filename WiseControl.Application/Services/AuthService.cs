using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WiseControl.Domain.Entities;
using WiseControl.Domain.Interfaces.Repositories;
using WiseControl.Domain.Interfaces.Services;
using WiseControl.DTOs;

namespace WiseControl.Application.Services
{
    public class AuthService : IAuthService
    {
        private IUserRepository _userRepository;
        private readonly IMapper _mapper;

        public AuthService(IUserRepository userRepository, IMapper mapper)
        {
            _userRepository = userRepository;
            _mapper = mapper;
        }

        

        public async Task<bool> Authenticate(UserCredentialDTO userCredentialDTO) {
            return await _userRepository.VerifyCredentialsAsync(userCredentialDTO.Email, userCredentialDTO.Password);
        }

        public async Task<UserDTO> Add(UserDTO userDTO) {
            var userEntity = _mapper.Map<User>(userDTO);
            var user = await _userRepository.CreateAsync(userEntity); 


            return _mapper.Map<UserDTO>(user);
        }
        

    }
}
