using formulario.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace formulario.Repository
{
    public class CuentaBancariasRepository : ICuentaBancariasRepository
    {
        public CuentaBancaria Create(CuentaBancaria cuentaBancaria)
        {
            return ApplicationDbContext.applicationDbContext.CuentaBancarias.Add(cuentaBancaria);
        }

        public CuentaBancaria Get(long id)
        {
            return ApplicationDbContext.applicationDbContext.CuentaBancarias.Find(id);
        }

        public IQueryable<CuentaBancaria> Get()
        {
            IList<CuentaBancaria> lista = new List<CuentaBancaria>(ApplicationDbContext.applicationDbContext.CuentaBancarias);

            return lista.AsQueryable();
        }


        public void Put(CuentaBancaria cuentaBancaria)
        {
            if (ApplicationDbContext.applicationDbContext.CuentaBancarias.Count(e => e.Id == cuentaBancaria.Id) == 0)
            {
                throw new NoEncontradoException("No he encontrado la entidad");
            }
            ApplicationDbContext.applicationDbContext.Entry(cuentaBancaria).State = EntityState.Modified;
        }

        public CuentaBancaria Delete(long id)
        {
            CuentaBancaria cuentaBancaria = ApplicationDbContext.applicationDbContext.CuentaBancarias.Find(id);
            if (cuentaBancaria == null)
            {
                throw new NoEncontradoException("No he encontrado la entidad");
            }

            ApplicationDbContext.applicationDbContext.CuentaBancarias.Remove(cuentaBancaria);
            return cuentaBancaria;
        }
    }
}