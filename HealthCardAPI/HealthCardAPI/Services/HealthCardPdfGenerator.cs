using HealthCardAPI.Models;
using QuestPDF.Fluent;          
using QuestPDF.Helpers;
using QuestPDF.Infrastructure;

namespace HealthCardAPI.Services
{
    public class HealthCardPdfGenerator
    {
        public static byte[] Generate(Patient patient, Nominee nominee)
        {
            

            var document = Document.Create(container =>
            {
                container.Page(page =>
                {
                    page.Size(PageSizes.A4);
                    page.Margin(30);
                    page.DefaultTextStyle(x => x.FontSize(12));

                    page.Header()
                        .Text("SMART HEALTH CARD")
                        .FontSize(22)
                        .Bold()
                        .AlignCenter();

                    page.Content().Column(col =>
                    {
                        col.Spacing(10);

                        col.Item().Text($"Health Card Number: {patient.HealthCardNumber}").Bold();
                        col.Item().Text($"Name: {patient.Name}");
                        col.Item().Text($"Date of Birth: {patient.DateOfBirth:dd-MM-yyyy}");
                        col.Item().Text($"Gender: {patient.Gender}");
                        col.Item().Text($"Blood Group: {patient.BloodGroup}");
                        col.Item().Text($"Phone: {patient.PhoneNumber}");
                        col.Item().Text($"Aadhaar: XXXX-XXXX-{patient.AadhaarNumber % 10000}");
                        col.Item().Text($"Nominee: {nominee?.Name ?? "Not Added"}");
                        col.Item().Text($"Issued On: {DateTime.Now:dd-MM-yyyy}");
                    });

                    page.Footer()
                        .AlignCenter()
                        .Text("AarogyaCard • Digital Health Identity")
                        .FontSize(10);
                });
            });

            return document.GeneratePdf();
        }
    }
}
