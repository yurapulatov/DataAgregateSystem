using System;
using System.Threading;
using System.Threading.Tasks;
using Common.Interfaces;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace Infrastructure.Services
{
    public class ParserManagerService : BackgroundService
    {
        private readonly IServiceScopeFactory _serviceScope;
        private readonly ILogger<ParserManagerService> _logger;
        private readonly IConfiguration _configuration;

        public ParserManagerService(IServiceScopeFactory serviceScope, ILogger<ParserManagerService> logger, IConfiguration configuration)
        {
            _serviceScope = serviceScope;
            _logger = logger;
            _configuration = configuration;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            using (var scope = _serviceScope.CreateScope())
            {
                var parseService = scope.ServiceProvider.GetRequiredService<IParserService>();
                
                while(!stoppingToken.IsCancellationRequested)
                {
                    try
                    {
                        _logger.LogDebug($"Start parser. DateTime started: {DateTime.UtcNow}");
                        await parseService.GetTrafficData();
                        _logger.LogDebug($"Finish parser. DateTime finished: {DateTime.UtcNow}");
                    }
                    catch (Exception e)
                    {
                        _logger.LogError($"Error parser. Message: {e}. InnerMassage: {e.InnerException}");
                    }
                    await Task.Delay(10000, stoppingToken);
                }
            }

        }
    }
}