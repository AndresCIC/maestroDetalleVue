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

    public class CuentaBancariasController : ApiController
    {
        private ICuentaBancariasService cuentaBancariasService;

        public CuentaBancariasController(ICuentaBancariasService _cuentaBancariasService)
        {
            this.cuentaBancariasService = _cuentaBancariasService;
        }

        // GET: api/CuentaBancarias
        public IQueryable<CuentaBancaria> GetCuentaBancarias()
        {
            return cuentaBancariasService.Get();
        }

        // GET: api/CuentaBancarias/5
        [ResponseType(typeof(CuentaBancaria))]
        public IHttpActionResult GetCuentaBancaria(long id)
        {
            CuentaBancaria cuentaBancaria = cuentaBancariasService.Get(id);
            if (cuentaBancaria == null)
            {
                return NotFound();
            }

            return Ok(cuentaBancaria);
        }

        // PUT: api/CuentaBancarias/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutCuentaBancaria(long id, CuentaBancaria cuentaBancaria)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != cuentaBancaria.Id)
            {
                return BadRequest();
            }

            try
            {
                cuentaBancariasService.Put(cuentaBancaria);
            }
            catch (NoEncontradoException)
            {
                return NotFound();
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/CuentaBancarias
        [ResponseType(typeof(CuentaBancaria))]
        public IHttpActionResult PostCuentaBancaria(CuentaBancaria cuentaBancaria)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            cuentaBancaria = cuentaBancariasService.Create(cuentaBancaria);

            return CreatedAtRoute("DefaultApi", new { id = cuentaBancaria.Id }, cuentaBancaria);
        }

        // DELETE: api/CuentaBancarias/5
        [ResponseType(typeof(CuentaBancaria))]
        public IHttpActionResult DeleteCuentaBancaria(long id)
        {
            CuentaBancaria cuentaBancaria;
            try
            {
                cuentaBancaria = cuentaBancariasService.Delete(id);
            }
            catch (NoEncontradoException)
            {
                return NotFound();
            }

            return Ok(cuentaBancaria);
        }
    }
}