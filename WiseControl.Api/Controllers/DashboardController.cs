using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WiseControl.Domain.Interfaces.Services;
using WiseControl.DTOs;

namespace WiseControl.Api.Controllers
{

    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class DashboardController : ControllerBase
    {
        private readonly ILogger<DashboardController> _logger;
        private readonly ITransactionService _transactionService;
        private readonly IAccountService _accountService;


        public DashboardController(ILogger<DashboardController> logger, ITransactionService transactionService, IAccountService accountService)
        {
            _logger = logger;
            _transactionService = transactionService;
            _accountService = accountService;

        }


        [HttpGet()]
        public async Task<ActionResult<TransactionDTO>> Get()
        {
            
            var transactions = await _transactionService.GetTransactions();


            var accounts = await _accountService.GetAccounts();

          

            if (transactions == null || accounts == null)
            {
                return NotFound("Dashboard not found");
            }


            var dashboardDTO = new DashboardDTO(transactions.ToArray(), accounts.ToArray());


            return Ok(dashboardDTO);
        }

        
    }
}
