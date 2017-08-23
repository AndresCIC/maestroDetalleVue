using formulario.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace formulario.Servicios
{
    public class CuentaBancariasService : ICuentaBancariasService
    {
        private ICuentaBancariasRepository cuentaBancariasRepository;
        public CuentaBancariasService(ICuentaBancariasRepository _cuentaBancariasRepository)
        {
            this.cuentaBancariasRepository = _cuentaBancariasRepository;
        }

        public CuentaBancaria Get(long id)
        {
            return cuentaBancariasRepository.Get(id);
        }

        public IQueryable<CuentaBancaria> Get()
        {
            return cuentaBancariasRepository.Get();
        }

        public CuentaBancaria Create(CuentaBancaria cuentaBancaria)
        {
            return cuentaBancariasRepository.Create(cuentaBancaria);
        }

        public void Put(CuentaBancaria cuentaBancaria)
        {
            cuentaBancariasRepository.Put(cuentaBancaria);
        }

        public CuentaBancaria Delete(long id)
        {
            return cuentaBancariasRepository.Delete(id);
        }
    }
}