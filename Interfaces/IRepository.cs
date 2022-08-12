using System;
using System.Security.Claims;

namespace LIVLens.Interfaces
{
    public interface IRepository<T> where T : class
    {
        Task<List<T>> GetAll();
        IQueryable<T> Queryable
        {
            get;
        }
        Task Add(T entity);
        Task Delete(T entity);
        Task Update(T entity);
        Task<T> FindById(int Id);
    }
}

