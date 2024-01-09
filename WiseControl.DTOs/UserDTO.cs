using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WiseControl.DTOs
{
    public class UserDTO
    {

        public long UserId {
            get;set;
        }

        [Required(ErrorMessage = "O campo nome é obrigatório")]
        [MaxLength(100)]
        [DisplayName("Nome")]
        public string Name
        {
            get; set;
        }

        [Required(ErrorMessage = "O campo e-mail é obrigatório")]
        [MaxLength(100)]
        [DisplayName("E-mail")]
        public string Email
        {
            get; set;
        }

        [Required(ErrorMessage = "O campo senha é obrigatório")]
        [MaxLength(100)]
        [DisplayName("Senha")]
        public string Password
        {
            get; set;
        }


    }
}
