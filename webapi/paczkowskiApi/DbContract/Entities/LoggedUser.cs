using System.ComponentModel.DataAnnotations;
using Commons;

namespace DbContract.Entities
{
    public class LoggedUser
    {
        private string _email;

        [Key]
        public int Id { get; set; }
        public string Email
        {
            get { return _email; }
            set { _email = value.Sanitize(); }
        }
        public string Token { get; set; }
    }
}
