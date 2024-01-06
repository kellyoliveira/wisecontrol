using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace WiseControl.Domain.Entities
{
    public class User
    {

        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public String UserUId { get; set; }


        public long UserId
        {
            get; set;
        }

        public string Name
        {
            get; set;
        }

        public string Email
        {
            get; set;
        }

        public string Password
        {
            get; set;
        }
    }
}
