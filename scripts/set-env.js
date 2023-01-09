const fs = require("fs");
const dotenv = require("dotenv");

// Load environment variables from .env file
dotenv.config();

// Read the contents of the environment.ts file
const environmentFile = fs.readFileSync(
  "src/environments/environment.ts",
  "utf8"
);

const updatedFile = `export const environment = {
  production: 'false',
  CLIENT_ID: '${process.env.CLIENT_ID}',
  CLIENT_SECRET: '${process.env.CLIENT_SECRET}',
}`;

// Write the updated content back to the environment.ts file
fs.writeFileSync("src/environments/environment.ts", updatedFile);
