#!/usr/bin/env node
const shell = require('shelljs');

const run = async () => {
  await installPackages();
}

const installPackages = () => {
  return new Promise(resolve => {
    const dependencies = [
      '@babel/plugin-proposal-class-properties',
      '@babel/plugin-proposal-decorators',
      '@babel/plugin-proposal-export-default-from',
      '@babel/plugin-proposal-object-rest-spread',
      '@babel/plugin-transform-spread',
      '@babel/preset-typescript',
      '@craco/craco',
      '@testing-library/jest-dom',
      '@testing-library/react',
      '@testing-library/user-event',
      '@types/classnames',
      '@types/enzyme',
      '@types/jest',
      '@types/material-ui',
      '@types/moment-duration-format',
      '@types/node',
      '@types/react',
      '@types/react-dom',
      '@types/react-router-dom',
      '@types/validatorjs',
      '@typescript-eslint/eslint-plugin',
      '@typescript-eslint/parser',
      'autoprefixer',
      'babel-plugin-module-resolver',
      'chalk',
      'env-cmd',
      'enzyme',
      'enzyme-adapter-react-16',
      'enzyme-to-json',
      'eslint@^6.6.0',
      'eslint-config-airbnb-typescript',
      'eslint-plugin-import',
      'eslint-plugin-jest',
      'eslint-plugin-jsx-a11y',
      'eslint-plugin-react',
      'eslint-plugin-react-hooks',
      'jest@^24.9.0',
      'nock',
      'node-sass',
      'sass-lint',
      'typescript',
    ].join(' ');

    console.log('Installing dev dependencies');

    shell.exec(`yarn add ${dependencies} --dev -W`, () => {
      console.log('Finished installing dev dependencies');
      resolve();
    })
  })
}

run();
