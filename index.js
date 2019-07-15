#!/usr/bin/env node
"use strict";

const fs = require("fs");
const readlineSync = require("readline-sync");
const commandLineArgs = require("command-line-args");
const commandLineUsage = require("command-line-usage");
const optionDefinitions = [
  {
    name: "help",
    alias: "h",
    type: Boolean
  },
  {
    name: "outputDir",
    alias: "o",
    type: String
  }
];

const sections = [
  {
    header: "processmd template maker",
    content: "generate template of processmd for aizugeekdojo.github.io"
  },
  {
    header: "Options",
    optionList: [
      {
        name: "outputDir",
        typeLabel: "{underline path}",
        description: "The output template path."
      }
    ]
  }
];

const options = commandLineArgs(optionDefinitions);
const usage = commandLineUsage(sections);

function to_double_digits(num) {
  num += "";
  if (num.length === 1) {
    num = "0" + num;
  }
  return num;
}

async function create_template() {
  const title = readlineSync.question("Title: ");
  const keywords = readlineSync.question("keywords(カンマ区切り): ");
  const writer = readlineSync.question("writer: ");
  const now = new Date();
  const created_at = `${now.getFullYear()}-${to_double_digits(
    now.getMonth() + 1
  )}-${to_double_digits(now.getDate())}`;

  const template = `---
title: ${title}
created_at: ${created_at}
keywords: ${keywords}
description:
writer: ${writer}
---

`;

  const filename = `${created_at}-${title}`;
  return [template, filename];
}

async function outputFile(template, filename) {
  fs.writeFile(`${options.outputDir}/${filename}.md`, template, (err, data) => {
    if (err) console.log(err);
  });
}

async function main() {
  const [template, filename] = await create_template();
  await outputFile(template, filename);
}

if (options.help || !options.outputDir) {
  console.log(usage);
} else {
  main();
}
