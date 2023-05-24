namespace EvaluacionTecnica.Models.Entities
{
    public class Equipamiento
    {
        private int EquipamientoId { get; set; }
        private string Nombre { get; set; }
        private string Descripcion { get; set; }
        private int Estado { get; set; }

        private int UsuarioCreacion { get; set; }

        private Nullable<DateTime> FechaCreacion { get; set; }

        public Equipamiento() { 
            EquipamientoId = 0;
            Nombre = string.Empty;
            Descripcion = string.Empty;
            Estado = 0;
            UsuarioCreacion = 0;
            FechaCreacion = null;

        }
    }
}
