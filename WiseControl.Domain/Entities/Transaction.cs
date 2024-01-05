using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;


namespace WiseControl.Domain.Entities
{
    public class Transaction
    {

        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public String TransactionUId { get; set; }


        public long AccountId { get; set; }

        public long TransactionId { get; set; }
        
        
        public TransactionType Type { get; set; }
        public String Description { get; set; }
        public DateTimeOffset Date { get; set; }
        public decimal Value { get; set; }
        

        public enum TransactionType
        {
            Credit = 1,
            Debit = 2,
            None = 3
        }
    }
}
