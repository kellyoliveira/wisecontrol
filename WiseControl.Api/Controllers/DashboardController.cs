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
        public ActionResult<DashboardDTO> Get()
        {
            var dashboardDTO = new DashboardDTO();

            dashboardDTO.TotalDebitDescription = "0";

            dashboardDTO.TotalCreditDescription = "0";


            dashboardDTO.TotalBalanceDescription = "0";


            List<TransactionDTO> transactionsDTos = new List<TransactionDTO>();
            transactionsDTos.Add(new TransactionDTO() { Description = "Lançamento", TransactionId = 1 });


          

            dashboardDTO.Transactions = transactionsDTos.ToArray();


            List<AccountDTO> accountsDTos = new List<AccountDTO>();

            //transactionsDTos.Add(new TransactionDTO() { Description = "Lançamento", Date = System.DateTime.Now, Id = 1, Value = 100 });

            accountsDTos.Add(new AccountDTO() { Description = "Lançamento", AccountId = 1 });

            dashboardDTO.Accounts = accountsDTos.ToArray();


            return Ok(dashboardDTO);
        }

    }
}
