using System.Threading;
using System.Threading.Tasks;
using Common.Interfaces;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace Infrastructure.Services
{
    public class ParserManagerService : BackgroundService
    {
        private readonly IServiceScope _serviceScope;

        public ParserManagerService(IServiceScope serviceScope)
        {
            _serviceScope = serviceScope;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            using (var scope = _serviceScope.ServiceProvider.CreateScope())
            {
                var parseService = scope.ServiceProvider.GetRequiredService<IParserService>();
                
                while(!stoppingToken.IsCancellationRequested)
                {
                    await Task.Delay(10000, stoppingToken);
                }
            }

        }
    }
}