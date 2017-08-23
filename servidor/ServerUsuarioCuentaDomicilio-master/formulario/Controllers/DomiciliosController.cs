using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using formulario;
using formulario.Models;
using formulario.Servicios;
using System.Web.Http.Cors;

namespace formulario.Controllers
{
    [EnableCors(origins: "http://localhost:8080, http://localhost:3000", headers: "*", methods: "*")]

    public class DomiciliosController : ApiController
    {
        private IDomiciliosService domiciliosService;

        public DomiciliosController(IDomiciliosService _domiciliosService)
        {
            this.domiciliosService = _domiciliosService;
        }

        // GET: api/Domicilios
        public IQueryable<Domicilio> GetDomicilios()
        {
            return domiciliosService.Get();
        }

        // GET: api/Domicilios/5
        [ResponseType(typeof(Domicilio))]
        public IHttpActionResult GetDomicilio(long id)
        {
            Domicilio domicilio = domiciliosService.Get(id);
            if (domicilio == null)
            {
                return NotFound();
            }

            return Ok(domicilio);
        }

        // PUT: api/Domicilios/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutDomicilio(long id, Domicilio domicilio)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != domicilio.Id)
            {
                return BadRequest();
            }

            try
            {
                domiciliosService.Put(domicilio);
            }
            catch (NoEncontradoException)
            {
                return NotFound();
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Domicilios
        [ResponseType(typeof(Domicilio))]
        public IHttpActionResult PostDomicilio(Domicilio domicilio)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            domicilio = domiciliosService.Create(domicilio);

            return CreatedAtRoute("DefaultApi", new { id = domicilio.Id }, domicilio);
        }

        // DELETE: api/Domicilios/5
        [ResponseType(typeof(Domicilio))]
        public IHttpActionResult DeleteDomicilio(long id)
        {
            Domicilio domicilio;
            try
            {
                domicilio = domiciliosService.Delete(id);
            }
            catch (NoEncontradoException)
            {
                return NotFound();
            }

            return Ok(domicilio);
        }
    }
}