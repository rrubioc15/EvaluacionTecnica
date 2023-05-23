using EvaluacionTecnica.Models.Entities;
using System.Data;
using System.Data.SqlClient;
using System.Security.Cryptography;
using System.Text;

namespace EvaluacionTecnica.Models
{
    public class SecurityModel
    {

        private readonly IConfiguration _config;

        public SecurityModel(IConfiguration config)
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

        public Usuario ValidarUsuario(string correo, string clave)
        {
            Usuario usuario = new();

            correo ??= "";
            clave ??= "";

            var cn = Connection;

            SqlCommand cmd = new("Usuario_Validar", (SqlConnection) cn);
            cmd.Parameters.AddWithValue("Correo", correo);
            cmd.Parameters.AddWithValue("Clave", clave);
            cmd.CommandType = CommandType.StoredProcedure;

            cn.Open();

            SqlDataReader reg = cmd.ExecuteReader();

            if (reg.Read())
            {
                int flag = (int)reg["flag"];

                if (flag == 1)
                {
                    usuario = new Usuario()
                    {
                        UsuarioId = (int)reg["usuario_id"],
                        Correo = reg["correo"].ToString()
                    };
                }
            }

            cn.Close();

            return usuario;
        }

        public string ConvertirSha256(string texto)
        {
            StringBuilder Sb = new();

            using(SHA256 hash = SHA256.Create())
            {
                Encoding enc = Encoding.UTF8;
                byte[] result = hash.ComputeHash(enc.GetBytes(texto));

                foreach(byte b in result)
                    Sb.Append(b.ToString("x2"));
            }

            return Sb.ToString();
        }

    }

}
