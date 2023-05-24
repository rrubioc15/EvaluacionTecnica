using System.Data;
using System.Security.Claims;

namespace EvaluacionTecnica.Models
{
    public class Utility
    {

        public static string GetUsuarioId(IEnumerable<Claim> claims)
        {
            return !claims.Any() ? "" : claims.FirstOrDefault(c => c.Type == "UsuarioId").Value.ToString();
        }

        public static List<Dictionary<string, object>> DataTableToDictionary(DataTable dt)
        {
            List<Dictionary<string, object>> filas = new();
            Dictionary<string, object> fila;

            foreach (DataRow row in dt.Rows)
            {

                fila = new Dictionary<string, object>();

                foreach (DataColumn col in dt.Columns)
                {
                    fila.Add(col.ColumnName, row[col]);
                }
                filas.Add(fila);
            }
            return filas;
        }

    }
}
