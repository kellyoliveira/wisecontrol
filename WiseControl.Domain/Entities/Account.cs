using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WiseControl.Domain.Entities
{
    public class Account
    {

        public int AccountId { get; set; }

        public String Description { get; set; }


        public decimal Balance { get; set; }


        public string Owner { get; set; }

    }
}
