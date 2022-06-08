/** Command-line tool to generate Markov text. */
const fs = require("fs");
const markov = require("./markov");
const axios = require("axios");
const process = require("process");

let [determiner, path] = process.argv.slice(2);
if ((determiner = "file")) {
  createFileText(path);
} else if ((determiner = "url")) {
  createUrlText(path);
} else {
  console.error(`Unknown method: ${determiner}`);
}

function createText(text) {
  let markovMachine = new markov.MarkovMachine(text);
  console.log(markovMachine.makeText());
}

function createFileText(path) {
  fs.readFile(path, "utf8", function (err, data) {
    if (err) {
      console.error(`Cannot read file: ${path}: ${err}`);
      process.exit(1);
    }
    createText(data);
  });
}

async function createUrlText(url) {
    try {
      let res = await axios.get(`${url}`);
      console.log(res.data);
    } catch (err) {
      console.error(`Error fetching ${url}: ${err}`);
      process.exit(1);
    }
    createText(res.data)
  }
