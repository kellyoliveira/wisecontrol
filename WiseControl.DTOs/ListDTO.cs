using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WiseControl.DTOs
{
    public class ListDTO<T>
    {

        public ListDTO(T[] results) {
            this.Results = results;
            this.TotalCount = this.Results.Length;
        }

        public T[] Results
        {
            get;
            private set;
        }

       

        public int TotalCount { get; private set; }
    }
}
