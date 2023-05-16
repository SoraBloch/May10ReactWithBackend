using May10ReactWithBackend.Data;
using May10ReactWithBackend.Web.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;

namespace May10ReactWithBackend.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PeopleController : ControllerBase
    {
        private string _connectionString;

        public PeopleController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }

        [Route("getall")]
        public List<Person> GetAll()
        {
            var repo = new PersonRepository(_connectionString);
            return repo.GetAll();
        }

        [HttpPost]
        [Route("add")]
        public void Add(Person person)
        {
            var repo = new PersonRepository(_connectionString);
            repo.Add(person);
        }
        [HttpPost]
        [Route("delete")]
        public int Delete(int id)
        {
            var repo = new PersonRepository(_connectionString);
            repo.Delete(id);
            return id;
        }
        [HttpPost]
        [Route("update")]
        public void Update(Person person)
        {
            var repo = new PersonRepository(_connectionString);
            repo.Update(person);
        }
        [HttpPost]
        [Route("deleteall")]
        public void DeleteAll(DeleteAllViewModel vm)
        {
            var repo = new PersonRepository(_connectionString);
            repo.DeleteAll(vm.Ids);
        }
    }
 
}
