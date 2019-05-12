using System;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Common.Entities;
using Common.Interfaces;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace Infrastructure.Services
{
    public class ParserService : IParserService
    {
        private readonly AppContext _context;
        private readonly ILogger<IParserService> _logger;
        private readonly IConfiguration _configuration;

        public ParserService(AppContext context, ILogger<IParserService> logger, IConfiguration configuration)
        {
            _context = context;
            _logger = logger;
            _configuration = configuration;
        }

        public async Task GetTrafficData()
        {
            var urlPage = _configuration.GetSection("UrlPageForParse").Value;
            using (var webClient = new WebClient())
            {
                _logger.LogInformation($"Получение HTML кода веб-страницы URL:{urlPage}");
                string htmlBody;
                try
                {
                    htmlBody = await webClient.DownloadStringTaskAsync(urlPage);
                }
                catch (Exception e)
                {
                    _logger.LogError(e, "Ошибка в получении страницы сайта");
                    _context.TrafficData.Add(GetLastTrafficData());
                    return;
                }

                if (string.IsNullOrWhiteSpace(htmlBody))
                {
                    _logger.LogError($"Значение для {nameof(htmlBody)} для веб-страницы URL: {urlPage} является пустым!");
                    _context.TrafficData.Add(GetLastTrafficData());
                }
                else
                {
                    var data = ParseHtmlCode(htmlBody);
                    if (data == null)
                    {
                        _logger.LogError($"Значение является нулевым для {nameof(data)}");
                        _context.TrafficData.Add(GetLastTrafficData());
                    }
                    else
                    {
                        _context.TrafficData.Add(data);
                    }
                }

            }

            _context.SaveChanges();
        }

        private TrafficData ParseHtmlCode(string htmlBody)
        {
            TrafficData trafficData = null;
            try
            {
                var match = Regex.Match(htmlBody, 
                    @"<level>(?<value>\d+)</level>");
                if (match.Success)
                {
                    trafficData = new TrafficData
                    {
                        Value = Convert.ToUInt16(match.Groups["value"].Value),
                        DateCreate = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow,
                            TimeZoneInfo.FindSystemTimeZoneById("North Asia Standard Time")),
                    };
                }
            }
            catch (Exception e)
            {
                _logger.LogError(e, "Ошибка при разборе HTML-кода");
            }
            
            return trafficData;
        }

        private TrafficData GetLastTrafficData()
        {
            var data = _context.TrafficData.OrderByDescending(x => x.DateCreate).First();
            data.Id = 0;
            return data;
        }
    }
}