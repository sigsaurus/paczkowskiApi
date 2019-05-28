using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Commons;

namespace DbContract.Entities
{
    public class User
    {
        private string _email;

        [Key]
        public int Id { get; set; }
        public string Email
        {
            get { return _email; }
            set { _email = value.Sanitize(); }
        }
        public string Password { get; set; }
        public string Name { get; set; }

        public List<Photo> Photos { get; set; }
    }
}
