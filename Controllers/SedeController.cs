using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using EvaluacionTecnica.Models;
using System.ComponentModel.Design;
using EvaluacionTecnica.Models.Entities;


namespace EvaluacionTecnica.Controllers
{
    public class SedeController : Controller
    {

        private readonly SedeModel _sedeModel;

        public SedeController(IConfiguration config)
        {
            _sedeModel = new SedeModel(config);
        }

        public IActionResult Sede()
        {
            return View();
        }

        [HttpPost]
        public IActionResult Listar(int SedeId)
        {
            RouteData.Values["ActionTitle"] = "Listar Sedes";

            List<Dictionary<string, object>> data = new();
            ClaimsPrincipal claimUser = HttpContext.User;


            var usuarioId = Utility.GetUsuarioId(claimUser.Claims);

            if (usuarioId != null)
            {
                data = _sedeModel.ListarSedes(SedeId);
            }

            return Json(data);
        }


        [HttpPost()]
        public IActionResult SaveSede(int SedeId, string Nombre, string Ubicacion, int Complejos, float Presupuesto)
        {
            RouteData.Values["ActionTitle"] = "Guardar sedes";

            ClaimsPrincipal claimUser = HttpContext.User;
            var usuarioId = Utility.GetUsuarioId(claimUser.Claims);

            Nombre ??= "";
            Ubicacion ??= "";

            if (usuarioId != null)
            {
                if (SedeId != 0)
                {
                    _sedeModel.UpdateSede(SedeId, Nombre, Ubicacion, Complejos, Presupuesto);
                }
                else
                {
                    _sedeModel.CreateSede(Nombre, Ubicacion, Complejos, Presupuesto, usuarioId);
                }

            }

            return new JsonResult("ok");
        }

        [HttpPost()]
        public IActionResult DeleteSede(int SedeId)
        {
            RouteData.Values["ActionTitle"] = "Eliminación de sedes";

            ClaimsPrincipal claimUser = HttpContext.User;
            var usuarioId = Utility.GetUsuarioId(claimUser.Claims);

            if (usuarioId != null)
            {
                _sedeModel.DeleteSede(SedeId);
            }

            return new JsonResult("ok");
        }

    }
}
