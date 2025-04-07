import * as fs from 'fs';
import * as path from 'path';
import enquirer from 'enquirer'; // Install enquirer: npm install enquirer
const { prompt } = enquirer;
import * as execa from 'execa'; // Install execa: npm install execa
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Derive __dirname for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Get the project name from the command-line arguments
const projectName = process.argv[2];

if (!projectName) {
  console.error('Please provide a project name:');
  console.error('  npx @anmol040903/fullstack-app <project-name>');
  process.exit(1);
}

// Define paths
const templateDir = path.join(__dirname, '..'); // Root directory of your template
const targetDir = path.resolve(process.cwd(), projectName);

// Ensure the target directory doesn't already exist
if (fs.existsSync(targetDir)) {
  console.error(`Directory "${projectName}" already exists.`);
  process.exit(1);
}

(async () => {
  try {
    // Step 1: Prompt the user to choose a backend
    const response = await prompt({
      type: 'select',
      name: 'backend',
      message: 'Which backend would you like to use?',
      choices: ['Express', 'NestJS'],
    });

    const selectedBackend = response.backend.toLowerCase(); // e.g., "express" or "nestjs"
    const backendSourceDir = path.join(templateDir, `backend-${selectedBackend}/`);
    const backendTargetDir = path.join(targetDir, 'backend/');

    // Step 2: Create the project directory and copy files
    console.log(`Creating project "${projectName}"...`);
    fs.mkdirSync(targetDir, { recursive: true }); // Create the project directory

    // Copy frontend files
    console.log('Copying frontend files...');
    fs.cpSync(path.join(templateDir, 'frontend/'), path.join(targetDir, 'frontend/'), { recursive: true });

    // Copy the selected backend files
    console.log(`Setting up ${response.backend} backend...`);
    fs.mkdirSync(backendTargetDir, { recursive: true });
    fs.cpSync(backendSourceDir, backendTargetDir, { recursive: true });

    // Step 3: Install dependencies for frontend and backend
    console.log('Installing dependencies...');
    process.chdir(targetDir); // Navigate to the new project directory

    await execa('npm', ['install'], { cwd: path.join(targetDir, 'frontend'), stdio: 'inherit' });
    await execa('npm', ['install'], { cwd: backendTargetDir, stdio: 'inherit' });

    console.log(`Project "${projectName}" created successfully!`);
    console.log('Run the following commands to start the servers:');
    console.log('  npm run start:frontend');
    console.log('  npm run start:backend');
  } catch (error) {
    console.error('An error occurred during setup:', error);
    process.exit(1); // Exit with a failure code
  }
})();