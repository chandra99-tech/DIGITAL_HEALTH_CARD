using HealthCardAPI.Data;
using HealthCardAPI.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace HealthCardAPI.Controllers
{
    [ApiController]
    [Route("api/nominee")]
    public class NomineeController : ControllerBase
    {
        private readonly AppDbContext _context;

        public NomineeController(AppDbContext context)
        {
            _context = context;
        }

        // 🚨 EMERGENCY ACCESS (NO AUTH)
        [HttpPost("emergency-access")]
        public IActionResult EmergencyAccess([FromBody] EmergencyAccessDto dto)
        {
            // 1️⃣ Find patient by health card
            var patient = _context.Patients
                .FirstOrDefault(p => p.HealthCardNumber == dto.HealthCardNumber);

            if (patient == null)
                return BadRequest("Invalid Health Card Number");

            if (patient.NomineeId == null)
                return BadRequest("No nominee linked to this patient");

            // 2️⃣ Verify nominee
            var nominee = _context.Nominees
                .FirstOrDefault(n =>
                    n.Id == patient.NomineeId &&
                    n.PhoneNumber == dto.NomineePhone);

            if (nominee == null)
                return Unauthorized("Nominee verification failed");

            // 3️⃣ Fetch reports (READ ONLY)
            var reports = _context.MedicalReports
                .Where(r => r.PatientId == patient.Id)
                .Select(r => new
                {
                    r.ReportName,
                    r.FilePath,
                    r.UploadedAt
                })
                .ToList();

            // 4️⃣ Return LIMITED patient data
            return Ok(new
            {
                patient.Name,
                patient.BloodGroup,
                patient.Gender,
                patient.PhoneNumber,
                Nominee = nominee.Name,
                Reports = reports
            });
        }
    }
}
