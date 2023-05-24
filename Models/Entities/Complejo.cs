namespace EvaluacionTecnica.Models.Entities
{
    public class Complejo
    {

        protected int ComplejoId { get; set; }

        protected string Nombre { get; set; }

        protected Sede Sede { get; set; }

        protected string Localizacion { get; set; }

        protected Jefe Jefe { get; set; }

        protected float AreaTotal { get; set; }

        protected int Estado { get; set; }

        protected int UsuarioCreacion { get; set; }

        protected Nullable<DateTime> FechaCreacion { get; set; }

        public Complejo()
        {
            ComplejoId = 0;
            Nombre = string.Empty;
            Sede = new Sede();
            Localizacion = string.Empty;
            Jefe = new Jefe();
            AreaTotal = 0;
            Estado = 0;
            UsuarioCreacion = 0;
            FechaCreacion = null;
        }

    }
}
