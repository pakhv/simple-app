using System;
using Context.Models;
using Microsoft.EntityFrameworkCore;

namespace Context
{
    public class WorkDbContext: DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Department> Departments { get; set; }
        
        public WorkDbContext(DbContextOptions options) : base(options) { }
    }
}
