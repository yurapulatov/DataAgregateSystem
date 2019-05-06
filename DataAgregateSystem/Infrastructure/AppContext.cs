using System;
using Common.Entities;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure
{
    public class AppContext : DbContext
    {
        public DbSet<TrafficData> TrafficData { get; set; }

        public AppContext(DbContextOptions<AppContext> options)
            : base(options)
        {
            Database.EnsureCreated();
        }
        
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
        }
    }
}