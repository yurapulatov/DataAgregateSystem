using System;
using System.IO;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;

namespace Infrastructure
{
    public class AppContextFactory : IDesignTimeDbContextFactory<AppContext>
    {
        private static string _connectionString;

        public AppContext CreateDbContext()
        {
            return CreateDbContext(null);
        }

        public AppContext CreateDbContext(string[] args)
        {
            if (string.IsNullOrEmpty(_connectionString)) LoadConnectionString();

            var builder = new DbContextOptionsBuilder<AppContext>();
            builder.UseNpgsql(_connectionString);

            return new AppContext(builder.Options);
        }

        private static void LoadConnectionString()
        {
            var builder = new ConfigurationBuilder();
            builder
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json", optional: false);

            var configuration = builder.Build();

            _connectionString = configuration.GetConnectionString("Connection");

            if (string.IsNullOrEmpty(_connectionString))
                throw new Exception("Not able to load connection string from appsettings.json");
        }
    }
}