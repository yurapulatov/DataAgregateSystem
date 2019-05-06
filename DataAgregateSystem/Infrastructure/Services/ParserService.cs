using System;
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
            var urlPage = _configuration.GetValue<string>("UrlPageForParse");
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
                    Console.WriteLine(e);
                    throw;
                }

                if (string.IsNullOrWhiteSpace(htmlBody))
                {
                    _logger.LogError($"Значение для {nameof(htmlBody)} для веб-страницы URL: {urlPage} является пустым!");
                }
                else
                {
                    var data = ParseHtmlCode(htmlBody);
                    if (data == null)
                    {
                        _logger.LogError($"Значение является нулевым для {nameof(data)}");
                    }
                    else
                    {
                        _context.TrafficData.Add(data);
                    }
                }

            }
        }

        private TrafficData ParseHtmlCode(string htmlBody)
        {
            TrafficData trafficData = null;
            try
            {
                var match = Regex.Match(htmlBody, 
                    "");
                if (match.Success)
                {
                    trafficData = new TrafficData
                    {
                        Value = Convert.ToUInt16(match.Groups["value"]),
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
    }
}