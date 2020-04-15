using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Context;
using Context.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Web.Controllers
{
    [ApiController]
    [Route("api/users")]
    public class UserController : ControllerBase
    {
        private readonly ILogger<DepartmentController> _logger;
        private readonly WorkDbContext _db;

        public UserController(ILogger<DepartmentController> logger, WorkDbContext db)
        {
            _logger = logger;
            _db = db;
        }

        [HttpGet]
        [Route("GetUsers")]
        public User[] GetUsers(){
            return _db.Users.ToArray();
        }

        [HttpGet]
        [Route("GetUser/{id}")]
        public User GetUser(int id){
            return _db.Users.FirstOrDefault(d => d.UserId == id);
        }

        [HttpPost]
        [Route("AddUser")]
        public void AddUser(User user){
            var retrievedDep = _db.Departments.FirstOrDefault(d => d.DepartmentId == user.DepartmentId);

            if (retrievedDep != null){
                _db.Users.Add(user);
                _db.SaveChanges();
            }
        }

        [HttpPut]
        [Route("EditUser/{id}")]
        public void EditUser(int id, User user){
            var retrievedUser = _db.Users.FirstOrDefault(d => d.UserId == id);
            var retrievedDep = _db.Departments.FirstOrDefault(d => d.DepartmentId == user.DepartmentId);
            
            if (retrievedUser != null && retrievedDep != null){
                retrievedUser.FirstName = user.FirstName;
                retrievedUser.LastName = user.LastName;
                retrievedUser.DepartmentId = user.DepartmentId;

                _db.SaveChanges();
            }
        }

        [HttpDelete]
        [Route("DeleteUser/{id}")]
        public void DeleteUser(int id){
            var retrievedUser = _db.Users.FirstOrDefault(d => d.UserId == id);

            if (retrievedUser != null){
                _db.Users.Remove(retrievedUser);
                _db.SaveChanges();
            }
        }
    }
}
