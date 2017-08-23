using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace formulario.Servicios
{
    public interface IDomiciliosService
    {
        Domicilio Create(Domicilio domicilio);
        Domicilio Get(long id);
        IQueryable<Domicilio> Get();
        void Put(Domicilio domicilio);
        Domicilio Delete(long id);
    }
}
