const fs = require('fs');
const path = require('path');
const { prompt } = require('enquirer'); // Install enquirer: npm install enquirer
const execa = require('execa'); // Install execa: npm install execa

(async () => {
  try {
    // Step 1: Prompt the user to choose a backend
    const response = await prompt({
      type: 'select',
      name: 'backend',
      message: 'Which backend would you like to use?',
      choices: ['Express', 'NestJS'],
    });

    const selectedBackend = response.backend.toLowerCase(); // Convert to lowercase for directory names
    const backendSourceDir = path.join(__dirname, `../backend-${selectedBackend}/`);
    const backendTargetDir = path.join(__dirname, '../backend/');

    // Step 2: Clear and prepare the target backend directory
    if (fs.existsSync(backendTargetDir)) {
      fs.rmSync(backendTargetDir, { recursive: true }); // Delete existing backend folder
    }
    fs.mkdirSync(backendTargetDir, { recursive: true }); // Create a fresh backend folder

    // Step 3: Copy the selected backend files
    console.log(`Setting up ${response.backend} backend...`);
    fs.cpSync(backendSourceDir, backendTargetDir, { recursive: true });

    // Step 4: Install dependencies for frontend and backend
    console.log('Installing dependencies...');
    await execa('npm', ['install'], { cwd: path.join(__dirname, '../frontend'), stdio: 'inherit' });
    await execa('npm', ['install'], { cwd: backendTargetDir, stdio: 'inherit' });

    console.log('Setup complete!');
  } catch (error) {
    console.error('An error occurred during setup:', error);
    process.exit(1); // Exit with a failure code
  }
})();