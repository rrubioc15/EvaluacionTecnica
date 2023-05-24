using System.Data.SqlClient;
using System.Data;
using Dapper;
using System.ComponentModel.Design;

namespace EvaluacionTecnica.Models
{
    public class SedeModel
    {

        private readonly IConfiguration _config;

        public SedeModel(IConfiguration config)
        {
            _config = config;
        }

        public IDbConnection Connection
        {
            get
            {
                return new SqlConnection(_config.GetConnectionString("DefaultConnection"));
            }
        }

        public List<Dictionary<string, object>> ListarSedes(int SedeId)
        {
            DataTable dt = new();
            List<Dictionary<string, object>> data;

            using (var db = Connection)
            {
                using SqlCommand comm = new("Sede_GetSedes");
                comm.CommandType = CommandType.StoredProcedure;
                comm.Connection = (SqlConnection)db;
                SqlParameter Param1 = comm.Parameters.AddWithValue("@SedeId", SedeId);
                Param1.SqlDbType = SqlDbType.NVarChar;

                db.Open();
                SqlDataAdapter da = new(comm);
                da.Fill(dt);
                db.Close();
            }

            data = Utility.DataTableToDictionary(dt);

            return data;
        }

        public void CreateSede(string Nombre, string Ubicacion, int Complejos, float Presupuesto, string usuarioId)
        {
            var parameters = new DynamicParameters();
            parameters.Add("@Nombre", Nombre);
            parameters.Add("@Ubicacion", Ubicacion);
            parameters.Add("@Complejos", Complejos);
            parameters.Add("@Presupuesto", Presupuesto);
            parameters.Add("@UsuarioId", usuarioId);

            using var db = Connection;
            db.Execute("Sede_CreateSede", parameters, commandType: CommandType.StoredProcedure);
        }

        public void UpdateSede(int SedeId, string Nombre, string Ubicacion, int Complejos, float Presupuesto)
        {
            var parameters = new DynamicParameters();
            parameters.Add("@SedeId", SedeId);
            parameters.Add("@Nombre", Nombre);
            parameters.Add("@Ubicacion", Ubicacion);
            parameters.Add("@Complejos", Complejos);
            parameters.Add("@Presupuesto", Presupuesto);

            using var db = Connection;
            db.Execute("Sede_UpdateSede", parameters, commandType: CommandType.StoredProcedure);
        }

        public void DeleteSede(int SedeId)
        {
            var parameters = new DynamicParameters();
            parameters.Add("@SedeId", SedeId);

            using var db = Connection;
            db.Execute("Sede_DeleteSede", parameters, commandType: CommandType.StoredProcedure);
        }
    }
}
