using formulario.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace formulario.Repository
{
    public class UsuariosRepository : IUsuariosRepository
    {
        public Usuario Create(Usuario usuario)
        {
            return ApplicationDbContext.applicationDbContext.Usuarios.Add(usuario);
        }

        public Usuario Get(long id)
        {
            return ApplicationDbContext.applicationDbContext.Usuarios.Find(id);
        }

        public IQueryable<Usuario> Get()
        {
            IList<Usuario> lista = new List<Usuario>(ApplicationDbContext.applicationDbContext.Usuarios);

            return lista.AsQueryable();
        }


        public void Put(Usuario usuario)
        {
            if (ApplicationDbContext.applicationDbContext.Usuarios.Count(e => e.Id == usuario.Id) == 0)
            {
                throw new NoEncontradoException("No he encontrado la entidad");
            }
            ApplicationDbContext.applicationDbContext.Entry(usuario).State = EntityState.Modified;
        }

        public Usuario Delete(long id)
        {
            Usuario usuario = ApplicationDbContext.applicationDbContext.Usuarios.Find(id);
            if (usuario == null)
            {
                throw new NoEncontradoException("No he encontrado la entidad");
            }

            ApplicationDbContext.applicationDbContext.Usuarios.Remove(usuario);
            return usuario;
        }
    }
}