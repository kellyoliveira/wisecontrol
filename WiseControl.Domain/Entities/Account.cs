using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace WiseControl.Domain.Entities
{
    public class Account
    {

        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public String AccountUId { get; set; }


       
        public long AccountId { get; set; }


        public String Description { get; set; }


        public decimal Balance { get; set; }


    }
}
