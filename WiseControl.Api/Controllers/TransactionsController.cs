using Microsoft.AspNetCore.Mvc;
using WiseControl.DTOs;
using WiseControl.Domain.Interfaces;
using WiseControl.Application.Services;


namespace WiseControl.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TransactionsController : ControllerBase
    {
        
        private readonly ILogger<TransactionsController> _logger;
        private readonly ITransactionService _transactionService;

        public TransactionsController(ILogger<TransactionsController> logger, ITransactionService transactionService)
        {
            _logger = logger;
            _transactionService = transactionService;
        }


        [HttpGet]
        public async Task<ActionResult<ListDTO<TransactionDTO>>> Get()
        {
            var transactions = await _transactionService.GetTransactions();
            if (transactions == null)
            {
                return NotFound("Transactions not found");
            }
            return Ok(new ListDTO<TransactionDTO>(transactions.ToArray()));
        }


        [HttpGet("{id}", Name = "GetTransaction")]
        public async Task<ActionResult<TransactionDTO>> Get(int id)
        {
            var transaction = await _transactionService.GetById(id);
            if (transaction == null)
            {
                return NotFound("Transaction not found");
            }
            return Ok(transaction);
        }

        [HttpPost]
        public async Task<ActionResult> Post([FromBody] TransactionDTO transactionDTO)
        {
            if (transactionDTO == null)
                return BadRequest("Data Invalid");

            await _transactionService.Add(transactionDTO);

            return new CreatedAtRouteResult("GetTransaction",
                new { id = transactionDTO.TransactionId }, transactionDTO);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, [FromBody] TransactionDTO transactionDTO)
        {
            if (id != transactionDTO.TransactionId)
            {
                return BadRequest("Data invalid");
            }

            if (transactionDTO == null)
                return BadRequest("Data invalid");

            await _transactionService.Update(transactionDTO);

            return Ok(transactionDTO);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<TransactionDTO>> Delete(int id)
        {
            var transactionDTO = await _transactionService.GetById(id);

            if (transactionDTO == null)
            {
                return NotFound("Transaction not found");
            }

            await _transactionService.Remove(id);

            return Ok(transactionDTO);
        }

    }
}