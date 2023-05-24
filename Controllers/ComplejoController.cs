using EvaluacionTecnica.Models;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace EvaluacionTecnica.Controllers
{
    public class ComplejoController : Controller
    {

        private readonly ComplejoModel _complejoModel;

        public ComplejoController(IConfiguration config)
        {
            _complejoModel = new ComplejoModel(config);
        }

        public IActionResult Complejo()
        {
            return View();
        }

        [HttpPost]
        public IActionResult Listar(int ComplejoId)
        {
            RouteData.Values["ActionTitle"] = "Listar complejos";

            List<Dictionary<string, object>> data = new();
            ClaimsPrincipal claimUser = HttpContext.User;


            var usuarioId = Utility.GetUsuarioId(claimUser.Claims);

            if (usuarioId != null)
            {
                data = _complejoModel.ListarComplejos(ComplejoId);
            }

            return Json(data);
        }

        [HttpPost]
        public IActionResult ListarJefes()
        {
            RouteData.Values["ActionTitle"] = "Listar jefe";

            List<Dictionary<string, object>> data = new();
            ClaimsPrincipal claimUser = HttpContext.User;


            var usuarioId = Utility.GetUsuarioId(claimUser.Claims);

            if (usuarioId != null)
            {
                data = _complejoModel.ListarJefes();
            }

            return Json(data);
        }

        [HttpPost()]
        public IActionResult SaveComplejo(int ComplejoId, string Nombre, int Sede, string Localizacion, int Jefe, float Area)
        {
            RouteData.Values["ActionTitle"] = "Guardar complejos";

            ClaimsPrincipal claimUser = HttpContext.User;
            var usuarioId = Utility.GetUsuarioId(claimUser.Claims);

            Nombre ??= "";
            Localizacion ??= "";

            if (usuarioId != null)
            {
                if (ComplejoId != 0)
                {
                    //_complejoModel.UpdateSede(SedeId, Nombre, Ubicacion, Complejos, Presupuesto);
                    _complejoModel.UpdateComplejo(ComplejoId, Nombre, Sede, Localizacion, Jefe, Area);
                }
                else
                {
                    _complejoModel.CreateComplejo(Nombre, Sede, Localizacion, Jefe, Area, usuarioId);
                }

            }

            return new JsonResult("ok");
        }

        [HttpPost()]
        public IActionResult DeleteComplejo(int ComplejoId)
        {
            RouteData.Values["ActionTitle"] = "Eliminación de complejo";

            ClaimsPrincipal claimUser = HttpContext.User;
            var usuarioId = Utility.GetUsuarioId(claimUser.Claims);

            if (usuarioId != null)
            {
                _complejoModel.DeleteComplejo(ComplejoId);
            }

            return new JsonResult("ok");
        }
    }
}
