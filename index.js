#!/usr/bin/env node --harmony

const _ = require('lodash');
const promise = require('bluebird');
const fs = promise.promisifyAll(require('graceful-fs'));
const yaml = require('js-yaml');
const program = require('commander');

const { sequence, spread, lift, transduce } = require('./util.js');

const read = (files) => {
  
  const _read = (file) => {
    return fs.readFileAsync(file);
  };

  return promise.all(files.map(_read)).then(lift(yaml.load));
};

program
  .version('0.1.0')
  .usage('<cmd> <files...>');

program
  .command('report <files...>')
  // possibly include these in the future
  // .option('-v, --values', 'Include reports on duplicate values')
  // .option('-k, --keys', 'Include reports on duplicate keys')
  // .option('-m, --markup', 'Include reports on markup within values')
  .action( (files, command) => {

    const reporter = require('./reporter.js')(command);

    read(files).then(sequence(
          reporter,
          console.log
        ));
  } );

program
  .command('merge <files...>')
  .option('-s, --sort', 'Sort keys in objects by alphabetical order')
  .action( (files, command) => {

    const merger = require('./merger.js')(command.opts());

    read(files).then(sequence(
          merger,
          console.log
        ));
  } );

program.parse(process.argv);

