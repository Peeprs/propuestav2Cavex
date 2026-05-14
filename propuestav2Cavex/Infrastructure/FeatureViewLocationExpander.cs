using Microsoft.AspNetCore.Mvc.Razor;

namespace propuestav2Cavex.Infrastructure
{
    public class FeatureViewLocationExpander : IViewLocationExpander
    {
        public void PopulateValues(ViewLocationExpanderContext context)
        {
            // Empty, not needed for this requirement
        }

        public IEnumerable<string> ExpandViewLocations(ViewLocationExpanderContext context, IEnumerable<string> viewLocations)
        {
            // The format is: Views/{Controller}/{Action}/{Action}.cshtml
            // {1} = Controller
            // {0} = Action
            return new[]
            {
                "/Views/{1}/{0}/{0}.cshtml",
                "/Views/Shared/{0}/{0}.cshtml",
                "/Views/{1}/{0}.cshtml",
                "/Views/Shared/{0}.cshtml"
            };
        }
    }
}
