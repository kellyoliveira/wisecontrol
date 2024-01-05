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

            var transactionEntities = await _transactionRepository.GetTransactionsAsync();


            return _mapper.Map<IEnumerable<TransactionDTO>>(transactionEntities);

        }

        public async Task<TransactionDTO> GetById(long? id)
        {
            var transactionEntity = await _transactionRepository.GetByIdAsync(id);

            return _mapper.Map<TransactionDTO>(transactionEntity);
        }

        public async Task Add(TransactionDTO transactionDto)
        {
            var transactionEntity = _mapper.Map<Transaction>(transactionDto);

            transactionEntity.Date = System.DateTime.Now;

            await _transactionRepository.CreateAsync(transactionEntity);
        }

        public async Task Update(TransactionDTO transactionDto)
        {
            var transactionEntity = _mapper.Map<Transaction>(transactionDto);


            var oldTransactionEntity = await _transactionRepository.GetByIdAsync(transactionEntity.TransactionId);

            transactionEntity.TransactionUId = oldTransactionEntity.TransactionUId;

            

            await _transactionRepository.UpdateAsync(transactionEntity);
        }

        public async Task Remove(long? id)
        {
            var transactionEntity = _transactionRepository.GetByIdAsync(id).Result;
            await _transactionRepository.RemoveAsync(transactionEntity);
        }


    }
}
