using System;
using System.Threading.Tasks;
using LIVLens.Interfaces;
using LIVLens.Models;
using Microsoft.EntityFrameworkCore;

namespace LIVLens.Services
{
    public class Repository<T> : IRepository<T> where T : class
    {
        private readonly LIVLensContext context;
        private DbSet<T> DbSet;


        public IQueryable<T> Queryable => DbSet.AsQueryable();

        public Repository(LIVLensContext _context)
        {
            this.context = _context;
            DbSet = context.Set<T>();
        }

        public async Task<List<T>> GetAll()
        {
            return await DbSet.ToListAsync();
        }

        public async Task Add(T entity)
        {
            DbSet.Add(entity);
            await context.SaveChangesAsync();
        }

        public async Task Update(T entity)
        {
            DbSet.Attach(entity);
            context.Entry(entity).State = EntityState.Modified;
            await context.SaveChangesAsync();
        }

        public async Task Delete(T entity)
        {
            DbSet.Remove(entity);
            await context.SaveChangesAsync();
        }

        public async Task<T> FindById(int id)
        {
            return await DbSet.FindAsync(id);
        }
    }
}

