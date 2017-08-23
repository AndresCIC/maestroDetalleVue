using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace formulario.Servicios
{
    public interface ICuentaBancariasService
    {
        CuentaBancaria Create(CuentaBancaria cuentaBancaria);
        CuentaBancaria Get(long id);
        IQueryable<CuentaBancaria> Get();
        void Put(CuentaBancaria cuentaBancaria);
        CuentaBancaria Delete(long id);
    }
}
