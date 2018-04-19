using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Lab7.Data;
using Lab7.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Lab7.Controllers
{
    [Produces("application/json")]
    [Route("api/Report")]
    public class ReportController : Controller
    {
        private readonly MyContext _context;

        public ReportController(MyContext context)
        {
            _context = context;
        }
        // GET: api/Report
        [HttpGet]
        public IEnumerable<Report> Get()
        {
            var categories = _context.Category.ToList();
            var peoples = _context.People.ToList();
            List<Report> reports = new List<Report>();

            foreach (var item in categories)
            {
                Report r = new Report();
                r.CategoryId = item.Id;
                r.Name = item.Name;
                reports.Add(r);
            }
            
            foreach (var report in reports)
            {
                int max = -1;
                int min = 10;
                double average = 0;
                double total = 0;
                var peopleList = peoples.Where(p => p.CategoryId == report.CategoryId).ToList();
                foreach(var item in peopleList)
                {
                    if (max < item.Rating)
                    {
                        max = item.Rating;
                    }
                    if(min > item.Rating)
                    {
                        min = item.Rating;
                    }
                    total += item.Rating;
                }
                average = total / peopleList.Count;
                report.Count = peopleList.Count;
                if (report.Count == 0)
                {
                    report.Max = 0;
                    report.Min = 0;
                    report.Average = 0;
                }
                else
                {
                    report.Max = max;
                    report.Min = min;
                    report.Average = average;
                }
            }
            return reports;
        }
    }
}