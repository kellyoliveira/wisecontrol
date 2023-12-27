using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Reflection;
using WiseControl.Application.Mappings;
using WiseControl.Application.Services;
using WiseControl.Domain.Interfaces;
using WiseControl.Infra.Data.Repositories;

namespace WiseControl.Infra.IoC
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddInfrastructure(this IServiceCollection services)
        {


            services.AddScoped<IAccountRepository, AccountRepository>();
            services.AddScoped<IAccountService, AccountService>();

            services.AddScoped<ITransactionRepository, TransactionRepository>();
            services.AddScoped<ITransactionService, TransactionService>();

            
            //services.AddAutoMapper(() => xAppDomain.CurrentDomain.GetAssemblies());


            services.AddAutoMapper(typeof(DomainToDTOMappingProfile));

            return services;

        }
    }
}