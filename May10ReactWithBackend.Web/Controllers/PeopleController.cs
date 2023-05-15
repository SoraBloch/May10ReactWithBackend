using May10ReactWithBackend.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

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
        public void Delete(int id)
        {
            var repo = new PersonRepository(_connectionString);
            repo.Delete(id);
        }
        [HttpPost]
        [Route("edit")]
        public void Edit(Person person)
        {
            var repo = new PersonRepository(_connectionString);
            repo.Update(person);
        }
    }
}
