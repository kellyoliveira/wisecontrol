using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Transactions;
using WiseControl.Domain.Entities;
using WiseControl.DTOs;
using Transaction = WiseControl.Domain.Entities.Transaction;

namespace WiseControl.Application.Mappings
{
    public class DomainToDTOMappingProfile : Profile
    {
        public DomainToDTOMappingProfile()
        {
            //CreateMap<Transaction, TransactionDTO>().ReverseMap();

            CreateMap<Transaction, TransactionDTO>().ReverseMap();
            CreateMap<Account, AccountDTO>().ReverseMap();
            CreateMap<User, UserDTO>().ReverseMap();

        }
    }
}
