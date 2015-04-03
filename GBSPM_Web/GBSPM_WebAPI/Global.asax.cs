using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Routing;
using System.Data.Entity;

namespace GBSPM_WebAPI
{
    // Note: For instructions on enabling IIS6 or IIS7 classic mode, 
    // visit http://go.microsoft.com/?LinkId=9394801
    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();

            WebApiConfig.Register(GlobalConfiguration.Configuration);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);

            GlobalConfiguration.Configuration.Formatters.JsonFormatter.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
            GlobalConfiguration.Configuration.Formatters.Remove(GlobalConfiguration.Configuration.Formatters.XmlFormatter);       
        }

        protected void Application_EndRequest()
        {
            Response.Headers.Remove("Access-Control-Allow-Credentials");
            if (Response.Headers.GetValues("Access-Control-Allow-Credentials") == null)
                Response.Headers.Set("Access-Control-Allow-Credentials", "true");


            if (Request.Headers.GetValues("Origin") != null)
            {
                Response.Headers.Remove("Access-Control-Allow-Origin");
                if (Response.Headers.GetValues("Access-Control-Allow-Origin") == null)
                    Response.Headers.Set("Access-Control-Allow-Origin", Request.Headers.GetValues("Origin").First());

            }

            if (HttpContext.Current.Request.HttpMethod == "OPTIONS")
            {
                //These headers are handling the "pre-flight" OPTIONS call sent by the browser
                HttpContext.Current.Response.AddHeader("Access-Control-Max-Age", "1728000");


                if (HttpContext.Current.Response.StatusCode == 401)
                    HttpContext.Current.Response.StatusCode = 200;
            }



            Response.Headers.Remove("Access-Control-Allow-Headers");
            if (Response.Headers.GetValues("Access-Control-Allow-Headers") == null)
                Response.Headers.Add("Access-Control-Allow-Headers", "Content-Type");

            Response.Headers.Remove("Access-Control-Allow-Methods");
            if (Response.Headers.GetValues("Access-Control-Allow-Methods") == null)
                Response.Headers.Add("Access-Control-Allow-Methods", "PUT, GET, POST, MERGE, DELETE, OPTIONS, PATCH");

        }
    }
}