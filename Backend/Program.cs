var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddOpenApi();
builder.Services.AddOpenApiDocument();
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(
        policy =>
        {
            policy.AllowAnyOrigin();
        });
    options.AddPolicy(name: "Testing",
        policy =>
        {
            policy.WithOrigins("https://document-editor.monsterluni.ch");
        });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if(app.Environment.IsDevelopment())
{
    app.UseCors();
}
if (app.Environment.IsStaging())
{
    app.UseCors("Testing");
}

app.UseOpenApi();
app.UseSwaggerUi();
app.UseHttpsRedirection();

app.MapGet("/", context =>
{
    context.Response.Redirect("/swagger");
    return Task.CompletedTask;
});

app.Run();