using System.ComponentModel;
using System.ComponentModel.DataAnnotations;


namespace WiseControl.DTOs
{
    public class AccountDTO
    {
        public long AccountId { get; set; }



        [Required(ErrorMessage = "O campo descrição é obrigatório")]
        [MaxLength(100)]
        [DisplayName("Descrição")]
        public String Description { get; set; }

        public decimal Balance { get; set; }



    }
}