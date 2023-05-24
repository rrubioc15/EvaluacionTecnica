namespace EvaluacionTecnica.Models.Entities
{
    public class Evento
    {

        private int EventoId;
        private Complejo Complejo { get; set; }

        private string Nombre { get; set; }
        private DateTime FechaHora { get; set; }
        private float Duracion { get; set; }
        private int NroParticipantes { get; set; }
        private int NroComisarios { get; set; }
        private string Categoria { get; set; }
        private int Estado { get; set; }

        private int UsuarioCreacion { get; set; }

        private Nullable<DateTime> FechaCreacion { get; set; }

        public Evento()
        {
            EventoId = 0;
            Complejo = new();
            Nombre = string.Empty;
            FechaHora = DateTime.MinValue;
            Duracion = 0;
            NroParticipantes = 0;
            NroComisarios = 0;
            Categoria = string.Empty;
            Estado = 0;
            UsuarioCreacion = 0;
            FechaCreacion = null;
        }

    }
}
