// Reference to the command input and output area
const commandInput = document.getElementById('command-input');
const outputArea = document.getElementById('output');

// List of valid commands and their functions
const commands = {
  'help': showHelp,
  'about': showAbout,
  'projects': showProjects,
  'skills': showSkills,
  'contact': showContact,
  'clear': clearScreen
};

// Command history management
let commandHistory = [];
let historyIndex = -1;

// Event listener for command input
commandInput.addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    const input = event.target.value.trim();
    if (input !== '') {
      handleCommand(input);
      commandHistory.push(input);
      historyIndex = commandHistory.length;
      event.target.value = ''; // Clear input
    }
  } else if (event.key === 'ArrowUp') {
    if (historyIndex > 0) {
      historyIndex--;
      commandInput.value = commandHistory[historyIndex];
    }
  } else if (event.key === 'ArrowDown') {
    if (historyIndex < commandHistory.length - 1) {
      historyIndex++;
      commandInput.value = commandHistory[historyIndex];
    } else {
      commandInput.value = '';
    }
  }
});

// Handles executing a command and clearing previous output
function handleCommand(command) {
  clearScreen(); // Clears previous terminal output first

  if (commands[command]) {
    commands[command]();
  } else {
    outputArea.innerHTML = `<p>Unknown command: ${command}</p>`;
  }
}

// Command functions
function showHelp() {
  outputArea.innerHTML = `
    <p>Available commands:</p>
    <p><span class="highlight">about</span> - Learn more about me</p>
    <p><span class="highlight">projects</span> - See my projects</p>
    <p><span class="highlight">skills</span> - See my skills</p>
    <p><span class="highlight">contact</span> - Get my contact information</p>
    <p><span class="highlight">clear</span> - Clear the screen</p>
  `;
}

function showAbout() {
  outputArea.innerHTML = `
    <p>Hi, I'm Onyango Dickens Omondi, a software developer specializing in Angular and Java development.</p>
    <p>I love creating interactive web applications and exploring new technologies in AI and cloud computing.</p>
  `;
}

function showProjects() {
  outputArea.innerHTML = `
    <p>Here are some of my projects:</p>
    <p><span class="highlight">Project 1</span>: AI-powered Study Guide - A platform that helps students prepare for exams using AI.</p>
    <p><span class="highlight">Project 2</span>: Courier Management System - A system for managing courier and delivery services in Kenya.</p>
  `;
}

function showSkills() {
  outputArea.innerHTML = `
    <p>Technical Skills:</p>
    <p><span class="highlight">Languages</span>: Java, JavaScript, TypeScript</p>
    <p><span class="highlight">Frameworks</span>: Angular, NestJS, Spring Boot</p>
    <p><span class="highlight">Tools</span>: Docker, Firebase, Git</p>
  `;
}

function showContact() {
  outputArea.innerHTML = `
    <p>Contact Information:</p>
    <p><span class="highlight">Email</span>: onyango@example.com</p>
    <p><span class="highlight">LinkedIn</span>: <a href="https://www.linkedin.com/in/onyango" target="_blank">linkedin.com/in/onyango</a></p>
  `;
}

function clearScreen() {
  outputArea.innerHTML = '';  // Clears the terminal output
}
