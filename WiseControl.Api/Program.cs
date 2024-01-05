using Microsoft.AspNetCore.Localization;
using Microsoft.Extensions.Configuration;
using System.Globalization;
using WiseControl.Domain.Settings;
using WiseControl.Infra.IoC;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.Configure<WiseControlDatabaseSettings>(builder.Configuration.GetSection("WiseControlDatabaseSettings"));


builder.Services.AddInfrastructure();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(builder =>
        builder
        .AllowAnyOrigin()
        .AllowAnyMethod()
        .AllowAnyHeader());


var supportedCultures = new[] { new CultureInfo("pt") };

app.UseRequestLocalization(new RequestLocalizationOptions
{
    DefaultRequestCulture = new RequestCulture("pt"),
    SupportedCultures = supportedCultures, // Formatting numbers, dates, etc.                
    SupportedUICultures = supportedCultures // UI strings that we have localized.
});

//app.UseHttpsRedirection();

app.UseAuthorization();
app.MapControllers();
app.Run();

