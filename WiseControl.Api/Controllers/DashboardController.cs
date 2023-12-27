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


        [HttpGet]
        public async Task<ActionResult<DashboardDTO>> Get()
        {
            var dashboardDTO = new DashboardDTO();

            dashboardDTO.TotalDebitDescription = "0";

            dashboardDTO.TotalCreditDescription = "0";


            dashboardDTO.TotalBalanceDescription = "0";


            

            var transactionsDTOs = await _transactionService.GetTransactions();
            if (transactionsDTOs == null)
            {
                return NotFound("Transactions not found");
            }


            dashboardDTO.Transactions = transactionsDTOs.ToArray();


            var accountsDTOs = await _accountService.GetAccounts();
            if (accountsDTOs == null)
            {
                return NotFound("Accounts not found");
            }


            dashboardDTO.Accounts = accountsDTOs.ToArray();



            return await Task.FromResult(Ok(dashboardDTO));
        }

    }
}
