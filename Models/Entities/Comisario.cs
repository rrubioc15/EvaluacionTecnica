namespace EvaluacionTecnica.Models.Entities
{
    public class Comisario
    {

        public int ComisarioId { get; set; }
        private string Nombres { get; set; }
        private string ApellidoPaterno { get; set; }
        private string ApellidoMaterno { get; set; }
        private string NroDocumento { get; set; }

        private int Estado { get; set; }

        private int UsuarioCreacion { get; set; }

        private Nullable<DateTime> FechaCreacion { get; set; }

        public Comisario()
        {
            ComisarioId = 0;
            Nombres = string.Empty;
            ApellidoPaterno = string.Empty;
            ApellidoMaterno = string.Empty;
            NroDocumento = string.Empty;
            Estado = 0;
            UsuarioCreacion = 0;
            FechaCreacion = null;
        }

    }
}
