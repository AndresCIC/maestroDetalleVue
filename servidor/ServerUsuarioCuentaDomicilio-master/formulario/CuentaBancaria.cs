using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace formulario
{
    public class CuentaBancaria
    {
        public long Id { get; set; }
        public bool Credito { get; set; }
        public string Numero { get; set; }
        public float Saldo { get; set; }
    }
}