#!/usr/bin/env node
"use strict";

const readlineSync = require("readline-sync");

function to_double_digits(num) {
  num += "";
  if (num.length === 1) {
    num = "0" + num;
  }
  return num;
}

async function create_template() {
  const title = readlineSync.question("Title: ");
  const tags = readlineSync.question("Tag(カンマ区切り): ");
  const writer = readlineSync.question("writer: ");
  const now = new Date();
  const created_at = `${now.getFullYear()}-${to_double_digits(
    now.getMonth() + 1
  )}-${to_double_digits(now.getDate())}`;

  const template = `---
title: ${title}
created_at: ${created_at}
tags: ${tags}
description:
writer: ${writer}
---

`;

  return template;
}

async function main() {
  const template = await create_template();
  console.log(template);
}

main();

