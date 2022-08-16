using LIVLens.Interfaces;
using LIVLens.Models;
using LIVLens.Security;
using LIVLens.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllersWithViews();

string domain = $"https://{builder.Configuration["Auth0:Domain"]}/";
builder.Services
    .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.Authority = domain;
        options.Audience = builder.Configuration["Auth0:Audience"];
        // If the access token does not have a `sub` claim, `User.Identity.Name` will be `null`. Map it to a different claim by setting the NameClaimType below.
        options.TokenValidationParameters = new TokenValidationParameters
        {
            NameClaimType = ClaimTypes.NameIdentifier
        };
    });

builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("write:admin", policy => policy.Requirements.Add(new HasScopeRequirement("write:admin", domain)));
});

builder.Services.AddSwaggerDocument(settings =>
{
    settings.PostProcess = document =>
    {
        document.Info.Version = "v1";
        document.Info.Title = "LIVLens API";
        document.Info.Description = "REST API for LIV Golf data collection & analytics.";
    };
});

builder.Services.AddSingleton<IAuthorizationHandler, HasScopeHandler>();
builder.Services.AddScoped<LIVLensContext>();
builder.Services.AddScoped<IRepository<BrandDim>, Repository<BrandDim>>();
builder.Services.AddScoped<IRepository<BrandModelDim>, Repository<BrandModelDim>>();
builder.Services.AddScoped<IRepository<ClubDim>, Repository<ClubDim>>();
builder.Services.AddScoped<IRepository<EventDim>, Repository<EventDim>>();
builder.Services.AddScoped<IRepository<EventPlayerDim>, Repository<EventPlayerDim>>();
builder.Services.AddScoped<IRepository<PlayerDim>, Repository<PlayerDim>>();
builder.Services.AddScoped<IRepository<ProductTypeDim>, Repository<ProductTypeDim>>();
builder.Services.AddScoped<IRepository<SurveyFact>, Repository<SurveyFact>>();


var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();

app.UseOpenApi();
app.UseSwaggerUi3();


app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html");;

app.Run();

