# Stage 1: Build
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy csproj and restore dependencies
COPY ["HealthCardAPI/HealthCardAPI.csproj", "HealthCardAPI/"]
RUN dotnet restore "HealthCardAPI/HealthCardAPI.csproj"

# Copy the rest of the source code
COPY . .
WORKDIR "/src/HealthCardAPI"
RUN dotnet build "HealthCardAPI.csproj" -c Release -o /app/build

# Publish the application
FROM build AS publish
RUN dotnet publish "HealthCardAPI.csproj" -c Release -o /app/publish /p:UseAppHost=false

# Stage 2: Runtime
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
COPY --from=publish /app/publish .
EXPOSE 8080
ENTRYPOINT ["dotnet", "HealthCardAPI.dll"]
