using System.ComponentModel.DataAnnotations;

namespace Context.Models{
    public class User{
        public int UserId { get; set; }
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
        public int DepartmentId { get; set; }
    }
}