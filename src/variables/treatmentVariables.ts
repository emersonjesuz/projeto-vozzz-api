import "dotenv/config";

export const variables = {
  jwtPassword: process.env.JWT_PASSWORD ?? "",
  dbHost: process.env.DB_HOST ?? "",
  dbPort: process.env.DB_PORT ?? "",
  dbUser: process.env.DB_USER ?? "",
  dbPassword: process.env.DB_PASSWORD ?? "",
  dbDatabase: process.env.DB_DATABASE ?? "",
  port: process.env.PORT ?? "3000",
};
