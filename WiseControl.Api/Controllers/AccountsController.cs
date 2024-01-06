using Microsoft.AspNetCore.Mvc;
using WiseControl.Domain.Interfaces.Services;
using WiseControl.DTOs;

namespace WiseControl.Api.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class AccountsController : Controller { 
    
        private readonly ILogger<AccountsController> _logger;
        private readonly IAccountService _accountService;

        public AccountsController(ILogger<AccountsController> logger, IAccountService accountService)
        {
            _logger = logger;
            _accountService = accountService;
        }

        [HttpGet]
        public async Task<ActionResult<ListDTO<AccountDTO>>> Get()
        {
            var accounts = await _accountService.GetAccounts();
            if (accounts == null)
            {
                return NotFound("Accounts not found");
            }
            return Ok(new ListDTO<AccountDTO>(accounts.ToArray()));
        }

        [HttpGet("{id}", Name = "GetAccount")]
        public async Task<ActionResult<AccountDTO>> Get(int id)
        {
            var accountDTO = await _accountService.GetById(id);
            if (accountDTO == null)
            {
                return NotFound("Account not found");
            }
            return Ok(accountDTO);
        }

        [HttpPost]
        public async Task<ActionResult> Post([FromBody] AccountDTO accountDTO)
        {
            if (accountDTO == null)
                return BadRequest("Data Invalid");

            await _accountService.Add(accountDTO);

            return new CreatedAtRouteResult("GetAccount",
                new { id = accountDTO.AccountId }, accountDTO);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, [FromBody] AccountDTO accountDTO)
        {
            if (id != accountDTO.AccountId)
            {
                return BadRequest("Data invalid");
            }

            if (accountDTO == null)
                return BadRequest("Data invalid");

            await _accountService.Update(accountDTO);

            return Ok(accountDTO);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<AccountDTO>> Delete(int id)
        {
            var accountDTO = await _accountService.GetById(id);

            if (accountDTO == null)
            {
                return NotFound("Transaction not found");
            }

            await _accountService.Remove(id);

            return Ok(accountDTO);
        }

}
}
