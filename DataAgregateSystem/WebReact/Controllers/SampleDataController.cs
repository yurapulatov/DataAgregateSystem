using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Common.Entities;
using Infrastructure;
using Microsoft.AspNetCore.Mvc;
using AppContext = Infrastructure.AppContext;

namespace WebReact.Controllers
{
    [Route("api/[controller]")]
    public class SampleDataController : Controller
    {
        private readonly AppContext _context;

        public SampleDataController(AppContext context)
        {
            _context = context;
        }

        [HttpGet("[action]")]
        public IEnumerable<TrafficDataDTO> LoadTraffic(DateTime? date)
        {
            if (date == null)
                throw new ArgumentNullException(nameof(date));
            var dateB = date.Value;
            var traffic = _context.TrafficData.Where(x => dateB.Date.Equals(x.DateCreate.Date))
                .Select(x => new TrafficDataDTO
                {
                    Data = x.Value,
                    Name = x.Time.ToShortTimeString()
                });
            var result = traffic.ToList();
            return result;
        }
    }
}