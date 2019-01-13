using Microsoft.EntityFrameworkCore;

namespace EngineeringFactory.Models
{
    public class EngineeringFactoryContext: DbContext
    {
        public EngineeringFactoryContext(DbContextOptions<EngineeringFactoryContext> options) : base(options)
        {
        }

        public DbSet<Product> Products {get;set;}
        public DbSet<Resource> Resources {get;set;}
        public DbSet<Forecast> Forecasts {get;set;}
        public DbSet<Coefficient> Coefficients {get;set;}

         protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Forecast>()
                .HasOne(t => t.Product)
                .WithMany(e => e.Forecasts)
                .HasForeignKey(t => t.ProductCode);

            modelBuilder.Entity<Coefficient>()
                .HasOne(t => t.Product)
                .WithMany(e => e.Coefficients)
                .HasForeignKey(t => t.ProductCode);

            modelBuilder.Entity<Coefficient>()
                .HasOne(t => t.Resource)
                .WithMany(e => e.Coefficients)
                .HasForeignKey(t => t.ResourceId);
        }
        
    }
}