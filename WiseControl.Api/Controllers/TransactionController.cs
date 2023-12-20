using Microsoft.AspNetCore.Mvc;
using WiseControl.DTOs;
using WiseControl.Domain.Interfaces;


namespace WiseControl.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TransactionController : ControllerBase
    {
        
        private readonly ILogger<TransactionController> _logger;
        private readonly ITransactionService _transactionService;

        public TransactionController(ILogger<TransactionController> logger, ITransactionService transactionService)
        {
            _logger = logger;
            _transactionService = transactionService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<TransactionDTO>>> Get()
        {
            var transactions = await _transactionService.GetTransactions();
            if (transactions == null)
            {
                return NotFound("Transactions not found");
            }
            return Ok(transactions);
        }

        [HttpGet("{id}", Name = "GetTransaction")]
        public async Task<ActionResult<TransactionDTO>> Get(int id)
        {
            var produto = await _transactionService.GetById(id);
            if (produto == null)
            {
                return NotFound("Transaction not found");
            }
            return Ok(produto);
        }

        [HttpPost]
        public async Task<ActionResult> Post([FromBody] TransactionDTO transactionDTO)
        {
            if (transactionDTO == null)
                return BadRequest("Data Invalid");

            await _transactionService.Add(transactionDTO);

            return new CreatedAtRouteResult("GetTransaction",
                new { id = transactionDTO.Id }, transactionDTO);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, [FromBody] TransactionDTO transactionDTO)
        {
            if (id != transactionDTO.Id)
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