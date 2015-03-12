using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace GBSPM_WebAPI
{
    public static class WebApiConfig
    {
        public const string DEFAULT_ROUTE_NAME = "DefaultApi";
        public static void Register(HttpConfiguration config)
        {
            config.Routes.MapHttpRoute(
                name: DEFAULT_ROUTE_NAME,
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
        }
    }
}
