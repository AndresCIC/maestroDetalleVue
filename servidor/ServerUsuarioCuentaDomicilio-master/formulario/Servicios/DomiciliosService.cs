using formulario.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace formulario.Servicios
{
    public class DomiciliosService : IDomiciliosService
    {
        private IDomiciliosRepository domiciliosRepository;
        public DomiciliosService(IDomiciliosRepository _domiciliosRepository)
        {
            this.domiciliosRepository = _domiciliosRepository;
        }

        public Domicilio Get(long id)
        {
            return domiciliosRepository.Get(id);
        }

        public IQueryable<Domicilio> Get()
        {
            return domiciliosRepository.Get();
        }

        public Domicilio Create(Domicilio domicilio)
        {
            return domiciliosRepository.Create(domicilio);
        }

        public void Put(Domicilio domicilio)
        {
            domiciliosRepository.Put(domicilio);
        }

        public Domicilio Delete(long id)
        {
            return domiciliosRepository.Delete(id);
        }
    }
}