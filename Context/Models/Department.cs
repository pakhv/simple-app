using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Context.Models{
    public class Department{
        public int DepartmentId { get; set; }
        [Required]
        public string Name { get; set; }
        public ICollection<User> Users { get; set; }
    }
}