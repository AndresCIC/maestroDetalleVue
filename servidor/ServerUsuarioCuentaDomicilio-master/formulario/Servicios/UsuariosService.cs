using formulario.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace formulario.Servicios
{
    public class UsuariosService : IUsuariosService
    {
        private IUsuariosRepository usuariosRepository;
        public UsuariosService(IUsuariosRepository _usuariosRepository)
        {
            this.usuariosRepository = _usuariosRepository;
        }

        public Usuario Get(long id)
        {
            return usuariosRepository.Get(id);
        }

        public IQueryable<Usuario> Get()
        {
            return usuariosRepository.Get();
        }

        public Usuario Create(Usuario usuario)
        {
            return usuariosRepository.Create(usuario);
        }

        public void Put(Usuario usuario)
        {
            usuariosRepository.Put(usuario);
        }

        public Usuario Delete(long id)
        {
            return usuariosRepository.Delete(id);
        }
    }
}