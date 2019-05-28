using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;
using Commons;

namespace DbContract.Entities
{
    public class Photo
    {
        private string _category;

        [Key]
        public int Id { get; set; }
        public string PhotoNum { get; set; }
        public string DisplayName { get; set; }
        public string FileName { get; set; }
        public string Category
        {
            get { return _category; }
            set { _category = value.Sanitize(); }
        }
        public byte[] Image { get; set; }

        public User User { get; set; }
    }
}
