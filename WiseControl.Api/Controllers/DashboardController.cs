using Microsoft.AspNetCore.Mvc;
using WiseControl.Domain.Interfaces;
using WiseControl.DTOs;

namespace WiseControl.Api.Controllers
{

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
            var dashboardDTO = await _transactionService.GetDashboard();
            if (dashboardDTO == null)
            {
                return NotFound("Dashboard not found");
            }

            dashboardDTO.Transactions = new TransactionDTO[] { new TransactionDTO { Description = "Lançamento", TransactionId=1} };
            dashboardDTO.Accounts = new AccountDTO[] { new AccountDTO { Description = "Lançamento", AccountId = 1 } };



            return Ok(dashboardDTO);
        }

        
    }
}
