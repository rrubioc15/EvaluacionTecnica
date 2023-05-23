using EvaluacionTecnica.Models;
using EvaluacionTecnica.Models.Entities;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace EvaluacionTecnica.Controllers
{

    //CONTROLADOR PARA INICIO DE SESIÓN Y REGISTRO
    public class LoginController : Controller
    {
        private readonly SecurityModel _securityModel;

        public LoginController(IConfiguration config)
        {
            _securityModel = new SecurityModel(config);
        }

        [HttpGet]
        public IActionResult Login()
        {
            ClaimsPrincipal claimUser = HttpContext.User;

            if (claimUser.Identity.IsAuthenticated)
            {
                return RedirectToAction("Index", "Home");
            }

            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Login(Usuario oUsuario, string returnUrl)
        {
            //Encriptamos la clave para consultar en la base de datos
            oUsuario.Clave = _securityModel.ConvertirSha256(oUsuario.Clave);
            Usuario user = _securityModel.ValidarUsuario(oUsuario.Correo, oUsuario.Clave);

            if (user.UsuarioId != 0)
            {

                var claims = new List<Claim>
                {
                    new Claim(ClaimTypes.Name, user.Correo)
                };

                var claimsIdentity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);

                await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, new ClaimsPrincipal(claimsIdentity));

                if (!string.IsNullOrEmpty(returnUrl))
                {
                    return Redirect(returnUrl);
                }
                else
                {
                    return RedirectToAction("Index", "Home");
                }
            }
            else
            {
                ViewData["Mensaje"] = "Usuario o contraseña incorrectos. ";
                return View();
            }
        }

        public async Task<IActionResult> Logout()
        {
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);

            return RedirectToAction("Login", "Login");
        }

    }
}
