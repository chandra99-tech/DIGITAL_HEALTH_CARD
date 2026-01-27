namespace HealthCardAPI.DTOs
{
    public class VerifyLoginOtpDto
    {
        public long PhoneNumber { get; set; }
        public string Otp { get; set; }
    }
}
