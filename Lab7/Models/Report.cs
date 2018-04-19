using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Lab7.Models
{
    public class Report
    {
        public int CategoryId { get; set; }
        public string Name { get; set; }
        public int Count { get; set; }
        public double Max { get; set; }
        public double Min { get; set; }
        public double Average { get; set; }
    }
}
