const commandInput = document.getElementById('command-input');
const outputArea = document.getElementById('output');


// List of commands
const commands = {
  'help': showHelp,
  'about': showAbout,
  'projects': showProjects,
  'skills': showSkills,
  'contact': showContact,
  'clear': clearScreen,
  'education': showEducation
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
  clearScreen();

  if (commands[command]) {
    commands[command]();
  } else {
    outputArea.innerHTML = `<p>Unknown command: ${command}</p>`;
  }
}

// Command functions
function showHelp() {
  outputArea.innerHTML = `
    <p class="output-title">Available commands:</p>
    <p><span class="highlight">about</span> - Learn more about me</p>
     <p><span class="highlight">education</span> - Education</p>
    <p><span class="highlight">projects</span> - See my projects</p>
    <p><span class="highlight">skills</span> - See my skills</p>
    <p><span class="highlight">contact</span> - Get my contact information</p>
    <p><span class="highlight">clear</span> - Clear the screen</p>
  `;
}

function showAbout() {
  outputArea.innerHTML = `
    <p class="output-title">About</p>
    <p>I am a dedicated Software Engineer with a passion for leveraging technology to drive social impact. With a keen interest in developing efficient and effective solutions, I aim to address the challenges faced by communities and enhance their quality of life.</p>
  `;
}

function showEducation() {
  outputArea.innerHTML = `
  <p class="output-title">Education</p>
  <p><span class="highlight">Strathmore University</span>: Bsc Infomations and Computer Science</p>
  <p><span class="highlight">St Michael's Secondary School</span>: Kenya Certificate of Secondary Education</p>
`;
}

function showProjects() {
  outputArea.innerHTML = `
    <p class="output-title">Here are some of my projects:</p>
    <p><span class="highlight">Project 1</span>: Tomato Disease Classification Model ....</p>
    <p><span class="highlight">Project 2</span>: Sorting Algorithm Visualizer ....</p>
    <p><span class="highlight">Project 2</span>: Task Tracker ....</p>
  `;
}

function showSkills() {
  outputArea.innerHTML = `
    <p class="output-title">Technical Skills:</p>
    <p><span class="highlight">Languages</span>: Java, SQL, JavaScript, TypeScript, HTML, CSS</p>
    <p><span class="highlight">Frameworks</span>: Springboot, Nest JS, Angular, Laravel</p>
    <p><span class="highlight">Tools</span>: Docker, MySQL, Git, Linux Command Line</p>
    <p><span class="highlight">Soft skills</span>: Problem Solving, Collaboration and Teamwork, Time managemnet</p>
  `;
}

function showContact() {
  outputArea.innerHTML = `
    <p class="output-title">Contact Information:</p>

    <p><span class="highlight">Email</span>: dickens.onyango@strathmore.edu</p>

    <p><span class="highlight">LinkedIn</span>: <a href="https://www.linkedin.com/in/onyango-dickens/" target="_blank">linkedin.com/in/onyango</a></p>
  `;
}

function clearScreen() {
  outputArea.innerHTML = '';  // Clears the terminal output
}
