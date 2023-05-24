namespace EvaluacionTecnica.Models.Entities
{
    public class Sede
    {

        private int SedeId { get; set; }

        private string Nombre { get; set; }

        private string Ubicacion { get; set; }

        private int NroComplejos { get; set; }

        private int Estado { get; set; }

        private int UsuarioCreacion { get; set; }

        private Nullable<DateTime> FechaCreacion { get; set; }

        public Sede() { 
            SedeId = 0;
            Nombre = string.Empty;
            Ubicacion = string.Empty;
            NroComplejos = 0;
            Estado = 0;
            UsuarioCreacion = 0;
            FechaCreacion = null;

        }

    }
}
