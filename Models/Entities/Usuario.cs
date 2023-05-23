namespace EvaluacionTecnica.Models.Entities
{
    public class Usuario
    {

        public int UsuarioId { get; set; }

        public string Correo { get; set; }

        public string Clave { get; set; }

        public int Estado { get; set; }

        public int UsuarioCreacion { get; set; }

        public Nullable<DateTime> FechaCreacion { get; set; }

        public Usuario() { 
        
            UsuarioId = 0;
            Correo = "";
            Clave = "";
            Estado = 0;
            UsuarioCreacion = 0;
            FechaCreacion = null;
        }

    }
}
