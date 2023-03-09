const { resolve } = require('path');
const { readdir } = require('fs').promises;
const fs = require("fs");

var args = process.argv.slice(2);
const pathToFiles = "example.txt";

async function getFiles(dir) {
  const dirents = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(dirents.map((dirent) => {
      const res = resolve(dir, dirent.name);
      return dirent.isDirectory() ? getFiles(res) : res;
  }));
  return Array.prototype.concat(...files);
}

getFiles(pathToFiles)
  .then(files => {
      console.log(files)
      files.forEach((file) => {
          fs.readFile(file, 'utf8', (err, data) => {
              if (err) console.log(err);
              if (data.includes(args)) {
                  console.log(`${args} found in ${file}.`);
              } else {
                  console.log(`${args} not found.`);
              }
          });
      })
  })
  .catch (e => console.error(e));