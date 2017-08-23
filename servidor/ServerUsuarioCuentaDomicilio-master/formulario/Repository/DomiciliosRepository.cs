using formulario.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace formulario.Repository
{
    public class DomiciliosRepository : IDomiciliosRepository
    {
        public Domicilio Create(Domicilio domicilio)
        {
            return ApplicationDbContext.applicationDbContext.Domicilios.Add(domicilio);
        }

        public Domicilio Get(long id)
        {
            return ApplicationDbContext.applicationDbContext.Domicilios.Find(id);
        }

        public IQueryable<Domicilio> Get()
        {
            IList<Domicilio> lista = new List<Domicilio>(ApplicationDbContext.applicationDbContext.Domicilios);

            return lista.AsQueryable();
        }


        public void Put(Domicilio domicilio)
        {
            if (ApplicationDbContext.applicationDbContext.Domicilios.Count(e => e.Id == domicilio.Id) == 0)
            {
                throw new NoEncontradoException("No he encontrado la entidad");
            }
            ApplicationDbContext.applicationDbContext.Entry(domicilio).State = EntityState.Modified;
        }

        public Domicilio Delete(long id)
        {
            Domicilio domicilio = ApplicationDbContext.applicationDbContext.Domicilios.Find(id);
            if (domicilio == null)
            {
                throw new NoEncontradoException("No he encontrado la entidad");
            }

            ApplicationDbContext.applicationDbContext.Domicilios.Remove(domicilio);
            return domicilio;
        }
    }
}