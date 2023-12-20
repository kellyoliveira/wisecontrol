#See https://aka.ms/customizecontainer to learn how to customize your debug container and how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
USER app
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["WiseControl.Api/WiseControl.Api.csproj", "WiseControl.Api/"]
RUN dotnet restore "WiseControl.Api/WiseControl.Api.csproj"
COPY . .
WORKDIR "/src/WiseControl.Api"
RUN dotnet build "WiseControl.Api.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "WiseControl.Api.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "WiseControl.Api.dll"]