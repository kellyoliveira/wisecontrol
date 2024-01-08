using System;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver.Core.Authentication;
using System.Security.Claims;
using System.Text;
using WiseControl.Domain.Interfaces.Services;
using WiseControl.DTOs;
using Microsoft.Extensions.Configuration;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Threading.Tasks;

namespace WiseControl.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class AuthController : ControllerBase
    {

        private readonly IAuthService _authService;
        private readonly IConfiguration _configuration;

        public AuthController(IAuthService authService, IConfiguration configuration)
        {
            _authService = authService;
            _configuration = configuration;
        }


        [HttpGet()]
        public async Task<ActionResult> Get()
        {
            if (User == null) {
                ModelState.AddModelError(string.Empty, "Invalid User.");
                return BadRequest(ModelState);
            }

            var userId = long.Parse(User.Claims.Where(p => p.ValueType == "userId").FirstOrDefault().Value);

            var userDTO = await _authService.GetUserById(userId);
            userDTO.Password = "";

            //return GenerateToken(userInfo);
            return Ok(userDTO);


          
        }

        [AllowAnonymous]
        [HttpPost("CreateUser")]
        public async Task<ActionResult> CreateUser([FromBody] UserDTO userDTO)
        {
            var result = await _authService.Add(userDTO);

            if (result != null)
            {
                //return GenerateToken(userInfo);
                return Ok($"User {userDTO.Email} was created successfully");
            }
            else
            {
                ModelState.AddModelError(string.Empty, "Invalid Login attempt.");
                return BadRequest(ModelState);
            }
        }

        [AllowAnonymous]
        [HttpPost("Login")]
        public async Task<ActionResult<UserTokenDTO>> Login([FromBody] UserCredentialDTO userCredentialDTO)
        {
            var result = await _authService.Authenticate(userCredentialDTO);

            var userDTO = await _authService.GetUserByEmail(userCredentialDTO.Email);


            if (result)
            {
                return GenerateToken(userDTO);
                //return Ok($"User {userInfo.Email} login successfully");
            }
            else
            {
                ModelState.AddModelError(string.Empty, "Invalid Login attempt.");
                return BadRequest(ModelState);
            }
        }

        private UserTokenDTO GenerateToken(UserDTO userDTO)
        {


            
            //declarações do usuário
            var claims = new[]
            {
                new Claim("email", userDTO.Email),
                new Claim("name", userDTO.Name),
                new Claim("userId", userDTO.UserId.ToString()),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };


            
            //gerar chave privada para assinar o token
            var privateKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(_configuration["Jwt:SecretKey"]));

            //gerar a assinatura digital
            var credentials = new SigningCredentials(privateKey, SecurityAlgorithms.HmacSha256);

            //definir o tempo de expiração
            var expiration = DateTime.UtcNow.AddMinutes(10);

            //gerar o token
            JwtSecurityToken token = new JwtSecurityToken(
                //emissor
                issuer: _configuration["Jwt:Issuer"],
                //audiencia
                audience: _configuration["Jwt:Audience"],
                //claims
                claims: claims,
                //data de expiracao
                expires: expiration,
                //assinatura digital
                signingCredentials: credentials
                );

            return new UserTokenDTO()
            {
                Email = userDTO.Email,
                Token = new JwtSecurityTokenHandler().WriteToken(token),
                Expiration = expiration
            };

            
        }
    }
}
