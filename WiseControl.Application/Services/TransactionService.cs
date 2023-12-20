using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using WiseControl.Domain.Entities;
using WiseControl.Domain.Interfaces;
using WiseControl.DTOs;

namespace WiseControl.Application.Services
{
    public class TransactionService : ITransactionService
    {

        private ITransactionRepository _transactionRepository;
        private readonly IMapper _mapper;

        public TransactionService(ITransactionRepository transactionRepository, IMapper mapper)
        {
            _transactionRepository = transactionRepository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<TransactionDTO>> GetTransactions()
        {
            var transactions= await _transactionRepository.GetTransactionsAsync();
            return _mapper.Map<IEnumerable<TransactionDTO>>(transactions);
        }

        public async Task<TransactionDTO> GetById(int? id)
        {
            var transactionEntity = await _transactionRepository.GetByIdAsync(id);
            return _mapper.Map<TransactionDTO>(transactionEntity);
        }

        public async Task Add(TransactionDTO transactionDto)
        {
            var transactionEntity = _mapper.Map<Transaction>(transactionDto);
            await _transactionRepository.CreateAsync(transactionEntity);
        }

        public async Task Update(TransactionDTO transactionDto)
        {
            var transactionEntity = _mapper.Map<Transaction>(transactionDto);
            await _transactionRepository.UpdateAsync(transactionEntity);
        }

        public async Task Remove(int? id)
        {
            var transactionEntity = _transactionRepository.GetByIdAsync(id).Result;
            await _transactionRepository.RemoveAsync(transactionEntity);
        }


    }
}
