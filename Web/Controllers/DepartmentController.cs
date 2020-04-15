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
    [Route("api/departments")]
    public class DepartmentController : ControllerBase
    {
        private readonly ILogger<DepartmentController> _logger;
        private readonly WorkDbContext _db;

        public DepartmentController(ILogger<DepartmentController> logger, WorkDbContext db)
        {
            _logger = logger;
            _db = db;
        }

        [HttpGet]
        [Route("GetDepartments")]
        public Department[] GetDepartments(){
            return _db.Departments.ToArray();
        }

        [HttpGet]
        [Route("GetDepartment/{id}")]
        public Department GetDepartment(int id){
            return _db.Departments.FirstOrDefault(d => d.DepartmentId == id);
        }

        [HttpPost]
        [Route("AddDepartment")]
        public void AddDepartment(Department department){
            _db.Departments.Add(department);
            _db.SaveChanges();
        }

        [HttpPut]
        [Route("EditDepartment/{id}")]
        public void EditDepartment(int id, Department department){
            var dep = _db.Departments.FirstOrDefault(d => d.DepartmentId == id);

            if (dep != null){
                dep.Name = department.Name;
                _db.SaveChanges();
            }
        }

        [HttpDelete]
        [Route("DeleteDepartment/{id}")]
        public void DeleteDepartment(int id){
            var dep = _db.Departments.FirstOrDefault(d => d.DepartmentId == id);

            if (dep != null){
                _db.Departments.Remove(dep);
                _db.SaveChanges();
            }
        }
    }
}
