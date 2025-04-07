// execution command: pnpm prisma:migrate <migration-name>
// Description: This script is used to run the prisma migrate dev command with a custom migration name.
// If no migration name is provided, it will generate a timestamp-based name.
// This script is used to avoid the need to run the prisma migrate dev command directly.

const { execSync } = require('child_process');

function generateTimestamp() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  return `${year}${month}${day}_${hours}${minutes}${seconds}`;
}

function getMigrationName() {
  const args = process.argv.slice(2);
  if (args.length > 0) return args[0]

  console.log('No migration name provided. Using a timestamp-based name.');
  return generateTimestamp();
}

// Main function
function runMigration() {
  try {
    const migrationName = getMigrationName();
    const command = `cd src/core/prisma && prisma migrate dev --name ${migrationName}`;
    console.log(`Running migration with name: ${migrationName}`);
    execSync(command, { stdio: 'inherit' });
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

runMigration();