using AssignmentApi.Models;
using Microsoft.AspNetCore.Mvc;

namespace AssignmentApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly DataContext context;
        private readonly ILogger<EmployeeController> logger;

        public EmployeeController(DataContext context, ILogger<EmployeeController> logger)
        {
            this.context = context;
            this.logger = logger;
        }

        [HttpGet]
        public async Task<ActionResult<List<EmployeeDto>>> Get()
        {
            var employees = await context.Employees.Include(e => e.Projects).ToListAsync();
            return Ok(employees.Select(e => e.EmployeeAsDto()));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<EmployeeDto>> GetEmployee(int id)
        {
            var employee = await context.Employees.Where(e => e.Id == id).Include(e => e.Projects).FirstOrDefaultAsync();
            if (employee == null)
            {
                logger.LogWarning($"Employee with id {id} not found");
                return BadRequest("Employee not found.");
            }
            return Ok(employee.EmployeeAsDto());
        }

        [HttpPost]
        public async Task<ActionResult> AddEmployee(Employee employee)
        {
            context.Employees.Add(employee);
            await context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetEmployee), new { id = employee.Id }, employee.EmployeeAsDto());
        }

        [HttpPut]
        public async Task<ActionResult> UpdateEmployee(Employee request)
        {
            var dbEmployee = await context.Employees.FindAsync(request.Id);
            if (dbEmployee == null)
            {
                logger.LogWarning($"Employee with id {request.Id} not found");
                return BadRequest("Employee not found.");
            }
            dbEmployee.FirstName = request.FirstName;
            dbEmployee.LastName = request.LastName;
            dbEmployee.JobTitle = request.JobTitle;

            await context.SaveChangesAsync();

            return NoContent();
        }

        [HttpPut("{employeeId}/{projectId}")]
        public async Task<ActionResult> AddEmployeeToProject(int employeeId, int projectId)
        {
            var dbEmployee = await context.Employees.Where(e => e.Id == employeeId).Include(e => e.Projects).FirstOrDefaultAsync();
            var dbProject = await context.Projects.Where(p => p.Id == projectId).Include(p => p.Employees).FirstOrDefaultAsync();
            if (dbEmployee == null)
            {
                logger.LogWarning($"Employee with id {employeeId} not found");
                return BadRequest("Employee not found.");
            }
            if (dbProject == null)
            {
                logger.LogWarning($"Project with id {projectId} not found");
                return BadRequest("Project not found.");
            }
            dbEmployee.Projects.Add(dbProject);
            dbProject.Employees.Add(dbEmployee);
            await context.SaveChangesAsync();

            return NoContent();
        }

        [HttpPut("RemoveEmployeeFromProject/{employeeId}/{projectId}")]
        public async Task<ActionResult> DeleteEmployeeFromProject(int employeeId, int projectId)
        {
            var dbEmployee = await context.Employees.Where(e => e.Id == employeeId).Include(e => e.Projects).FirstOrDefaultAsync();
            var dbProject = await context.Projects.Where(p => p.Id == projectId).Include(p => p.Employees).FirstOrDefaultAsync();
            if (dbEmployee == null)
            {
                logger.LogWarning($"Employee with id {employeeId} not found");
                return BadRequest("Employee not found.");
            }
            if (dbProject == null)
            {
                logger.LogWarning($"Project with id {projectId} not found");
                return BadRequest("Project not found.");
            }
            dbEmployee.Projects.Remove(dbProject);
            dbProject.Employees.Remove(dbEmployee);
            await context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var dbEmployee = await context.Employees.FindAsync(id);
            if (dbEmployee == null)
            {
                logger.LogWarning($"Project with id {id} not found");
                return BadRequest("Employee not found.");
            }
            context.Employees.Remove(dbEmployee);

            await context.SaveChangesAsync();

            return NoContent();
        } 
    }
}