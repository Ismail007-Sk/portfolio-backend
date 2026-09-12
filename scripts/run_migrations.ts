import "dotenv/config";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { Client } from "pg";


// ESM does not provide __filename and __dirname automatically.
// import.meta.url gives the URL of the current file.
const __filename = fileURLToPath(import.meta.url);
// Get the directory containing the current file.
const __dirname = path.dirname(__filename);


async function main() {
  // Connect to PostgreSQL
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });

  await client.connect();


  // Folder containing all SQL migration files
  const migrationFolder = path.join(__dirname, "..", "migrations");

  // Get all .sql files in order
  const migrationFiles = fs
    .readdirSync(migrationFolder)
    .filter((file) => file.endsWith(".sql"))
    .sort();

  // Table to keep track of applied migrations
  await client.query(`
    CREATE TABLE IF NOT EXISTS schema_migrations (
      filename TEXT PRIMARY KEY,
      applied_at TIMESTAMPTZ DEFAULT NOW()
    );
  `);

  // Run each migration
  for (const file of migrationFiles) {
    // Check if this migration has already been applied
    const result = await client.query(
      "SELECT * FROM schema_migrations WHERE filename = $1",
      [file]
    );

    if (result.rows.length > 0) {
      console.log(`skip  ${file} (already applied)`);
      continue;
    }

    // Read SQL file
    const sql = fs.readFileSync(
      path.join(migrationFolder, file),
      "utf8"
    );

    // Execute SQL
    await client.query(sql);

    // Save migration history
    await client.query(
      "INSERT INTO schema_migrations (filename) VALUES ($1)",
      [file]
    );

    console.log(`done  ${file}`);
  }

  await client.end();

  console.log("All migrations completed.");
}

main().catch((error) => {
  console.error(error);
});