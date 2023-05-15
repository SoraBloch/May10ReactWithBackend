﻿using Microsoft.EntityFrameworkCore;

namespace May10ReactWithBackend.Data
{
    public class PersonRepository
    {
        private string _connectionString;

        public PersonRepository(string connectionString)
        {
            _connectionString = connectionString;
        }

        public List<Person> GetAll()
        {
            using var context = new PeopleDbContext(_connectionString);
            return context.People.ToList();
        }

        public void Add(Person person)
        {
            using var context = new PeopleDbContext(_connectionString);
            context.People.Add(person);
            context.SaveChanges();
        }
        public void Update(Person person)
        {
            using var context = new PeopleDbContext(_connectionString);
            context.People.Attach(person);
            context.Entry(person).State = EntityState.Modified;
            context.SaveChanges();
        }

        public void Delete(int id)
        {
            using var context = new PeopleDbContext(_connectionString);
            context.Database.ExecuteSqlInterpolated($"DELETE FROM People WHERE Id = {id}");
        }
    }
}