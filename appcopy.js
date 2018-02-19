const { spawn } = require('child_process');
 
// Spawn NPM asynchronously
// const child = spawn('npm', ['list', '-g', '-depth', '0'], { stdio: 'inherit' });
 
// Spawn NPM synchronously
const result = spawn('npm', ['lighthouse', 'https://google.com', '--output=json']);

// use child.stdout.setEncoding('utf8'); if you want text chunks
result.stdout.on('data', (chunk) => {
  console.log(chunk);
  // data from standard output is here as buffers
});

// since these are streams, you can pipe them elsewhere
result.stderr.on('data', (data) => {
  console.log(`stderr: ${data}`);
});

result.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
});