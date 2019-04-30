using System;
using Common.Entities;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure
{
    public class AppContext : DbContext
    {
        public DbSet<FacebookPage> FacebookPages { get; set; }
        public DbSet<FacebookPageData> FacebookPageData { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseNpgsql("Host=localhost;Port=5432;Database=parserdb;Username=postgres;Password=12345");
        }
    }
}