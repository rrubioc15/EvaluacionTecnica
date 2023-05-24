using System.Data.SqlClient;
using System.Data;
using Dapper;

namespace EvaluacionTecnica.Models
{
    public class ComplejoModel
    {
        private readonly IConfiguration _config;

        public ComplejoModel(IConfiguration config)
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

        public List<Dictionary<string, object>> ListarComplejos(int ComplejoId)
        {
            DataTable dt = new();
            List<Dictionary<string, object>> data;

            using (var db = Connection)
            {
                using SqlCommand comm = new("Complejo_GetComplejos");
                comm.CommandType = CommandType.StoredProcedure;
                comm.Connection = (SqlConnection)db;
                SqlParameter Param1 = comm.Parameters.AddWithValue("@ComplejoId", ComplejoId);
                Param1.SqlDbType = SqlDbType.NVarChar;

                db.Open();
                SqlDataAdapter da = new(comm);
                da.Fill(dt);
                db.Close();
            }

            data = Utility.DataTableToDictionary(dt);

            return data;
        }

        public List<Dictionary<string, object>> ListarJefes()
        {
            DataTable dt = new();
            List<Dictionary<string, object>> data;

            using (var db = Connection)
            {
                using SqlCommand comm = new("Jefe_GetJefes");
                comm.CommandType = CommandType.StoredProcedure;
                comm.Connection = (SqlConnection)db;

                db.Open();
                SqlDataAdapter da = new(comm);
                da.Fill(dt);
                db.Close();
            }

            data = Utility.DataTableToDictionary(dt);

            return data;
        }

        public void CreateComplejo(string Nombre, int Sede, string Localizacion, int Jefe, float Area, string usuarioId)
        {
            var parameters = new DynamicParameters();
            parameters.Add("@Nombre", Nombre);
            parameters.Add("@Sede", Sede);
            parameters.Add("@Localizacion", Localizacion);
            parameters.Add("@Jefe", Jefe);
            parameters.Add("@Area", Area);
            parameters.Add("@UsuarioId", usuarioId);

            using var db = Connection;
            db.Execute("Complejo_CreateComplejo", parameters, commandType: CommandType.StoredProcedure);
        }

        public void UpdateComplejo(int ComplejoId, string Nombre, int Sede, string Localizacion, int Jefe, float Area)
        {
            var parameters = new DynamicParameters();
            parameters.Add("@ComplejoId", ComplejoId);
            parameters.Add("@Nombre", Nombre);
            parameters.Add("@Sede", Sede);
            parameters.Add("@Localizacion", Localizacion);
            parameters.Add("@Jefe", Jefe);
            parameters.Add("@Area", Area);

            using var db = Connection;
            db.Execute("Complejo_UpdateComplejo", parameters, commandType: CommandType.StoredProcedure);
        }

        public void DeleteComplejo(int ComplejoId)
        {
            var parameters = new DynamicParameters();
            parameters.Add("@ComplejoId", ComplejoId);

            using var db = Connection;
            db.Execute("Complejo_DeleteComplejo", parameters, commandType: CommandType.StoredProcedure);
        }
    }
}
