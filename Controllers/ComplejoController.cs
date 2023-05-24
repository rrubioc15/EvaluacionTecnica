using EvaluacionTecnica.Models;
using Microsoft.AspNetCore.Mvc;

namespace EvaluacionTecnica.Controllers
{
    public class ComplejoController : Controller
    {

        //private readonly SedeModel _sedeModel;

        //public SedeController(IConfiguration config)
        //{
        //    _sedeModel = new SedeModel(config);
        //}

        public IActionResult Complejo()
        {
            return View();
        }
    }
}
