using Lab7.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Lab7.Models
{
    public class People
    {
        public int Id { get; set; }
        public string FullName { get; set; }
        [Range(1, 5)]
        public int Rating { get; set; }
        public int CategoryId { get; set; }
        public Category Category { get; set; }
    }
}
