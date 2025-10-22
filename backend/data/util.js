// const fs = require('node:fs/promises');

// async function readData() {
//   const data = await fs.readFile('events.json', 'utf8');
//   return JSON.parse(data);
// }

// async function writeData(data) {
//   await fs.writeFile('events.json', JSON.stringify(data));
// }

// exports.readData = readData;
// exports.writeData = writeData;

const fs = require('node:fs/promises');
const path = require('path');

// مسیر فایل نسبت به فولدر فعلی این فایل
const eventsPath = path.join(__dirname, 'events.json');

async function readData() {
  const data = await fs.readFile(eventsPath, 'utf8');
  return JSON.parse(data);
}

async function writeData(data) {
  await fs.writeFile(eventsPath, JSON.stringify(data));
}

exports.readData = readData;
exports.writeData = writeData;
