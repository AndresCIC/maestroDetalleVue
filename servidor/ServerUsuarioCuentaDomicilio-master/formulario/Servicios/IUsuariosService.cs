using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace formulario.Servicios
{
    public interface IUsuariosService
    {
        Usuario Create(Usuario usuario);
        Usuario Get(long id);
        IQueryable<Usuario> Get();
        void Put(Usuario usuario);
        Usuario Delete(long id);
    }
}
