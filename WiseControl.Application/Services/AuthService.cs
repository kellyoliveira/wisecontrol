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
using System.Security.Cryptography;


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


        private string EncryptPassword(string pwd)
        {
            SHA256 sha256 = SHA256Managed.Create();
            UTF8Encoding objUtf8 = new UTF8Encoding();
            byte[] hashValue = sha256.ComputeHash(objUtf8.GetBytes(pwd));

            var hash = Convert.ToBase64String(hashValue);

            return hash;
        }


        public async Task<bool> Authenticate(UserCredentialDTO userCredentialDTO)
        {
            return await _userRepository.VerifyCredentialsAsync(userCredentialDTO.Email, this.EncryptPassword(userCredentialDTO.Password));
        }

        public async Task<UserDTO> GetUserByEmail(string email) {
            var userEntity = await _userRepository.GetUserByEmailAsync(email);
            return _mapper.Map<UserDTO>(userEntity);
        }


        public async Task<UserDTO> GetUserById(long id)
        {
            var userEntity = await _userRepository.GetUserByIdAsync(id);
            return _mapper.Map<UserDTO>(userEntity);
        }
        
        public async Task<UserDTO> Add(UserDTO userDTO) {
            var userEntity = _mapper.Map<User>(userDTO);

            userEntity.Password = this.EncryptPassword(userEntity.Password);

            var user = await _userRepository.CreateAsync(userEntity); 


            return _mapper.Map<UserDTO>(user);
        }
        

    }
}
