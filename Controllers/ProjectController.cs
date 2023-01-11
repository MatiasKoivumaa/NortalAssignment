using AssignmentApi.Dtos;
using AssignmentApi.Models;
using Microsoft.AspNetCore.Mvc;

namespace AssignmentApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectController : ControllerBase
    {
        private readonly DataContext context;
        private readonly ILogger<EmployeeController> logger;

        public ProjectController(DataContext context, ILogger<EmployeeController> logger)
        {
            this.context = context;
            this.logger = logger;
        }

        [HttpGet]
        public async Task<ActionResult<List<ProjectDto>>> Get()
        {
            var projects = await context.Projects.Include(p => p.Employees).ToListAsync();
            return Ok(projects.Select(p => p.ProjectAsDto()));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ProjectDto>> GetProject(int id)
        {
            var project = await context.Projects.Where(p => p.Id == id).Include(p => p.Employees).FirstOrDefaultAsync();
            if (project == null)
            {
                logger.LogWarning($"Project with id {id} not found");
                return BadRequest("Project not found.");
            }
            return Ok(project.ProjectAsDto());
        }

        [HttpPost]
        public async Task<ActionResult> AddProject(Project project)
        {
            context.Projects.Add(project);
            await context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetProject), new { id = project.Id }, project.ProjectAsDto());
        }

        [HttpPut]
        public async Task<ActionResult> UpdateEmployee(Project project)
        {
            var dbProject = await context.Projects.FindAsync(project.Id);
            if (dbProject == null)
            {
                logger.LogWarning($"Project with id {project.Id} not found");
                return BadRequest("Project not found.");
            }
            dbProject.ProjectName = project.ProjectName;
            dbProject.Employees = project.Employees;

            await context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var dbProject = await context.Projects.FindAsync(id);
            if (dbProject == null)
            {
                logger.LogWarning($"Project with id {id} not found");
                return BadRequest("Project not found.");
            }
            context.Projects.Remove(dbProject);

            await context.SaveChangesAsync();

            return NoContent();
        }
    }
}
