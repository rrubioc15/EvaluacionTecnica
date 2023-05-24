namespace EvaluacionTecnica.Models.Entities
{
    public class Area
    {

        private int AreaId { get; set; }
        private ComplejoPolideportivo ComplejoPolideportivo { get; set; }
        private string Localizacion { get; set; }

        private int Estado { get; set; }

        private int UsuarioCreacion { get; set; }

        private Nullable<DateTime> FechaCreacion { get; set; }

        public Area()
        {
            AreaId = 0;
            ComplejoPolideportivo = new();
            Localizacion = string.Empty;
            Estado = 0;
            UsuarioCreacion = 0;
            FechaCreacion = null;
        }

    }
}
