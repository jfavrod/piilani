import approot from 'app-root-path'
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs'
import { execSync } from 'child_process'

const configDir = `${approot.path}/config`;
const defaultConfig = `${configDir}/config.json`;
const packageFile = `${approot.path}/package.json`;

const devDependencies = Object.freeze([
  '@types/node',
  '@types/app-root-path',
  'typescript'
]);

const prodDependencies = Object.freeze([
  'app-root-path',
  'reflect-metadata',
  'tsyringe',
  'winston',
  'winston-logger'
]);

const main = () => {
  if (getCommand() === 'init') {
    init();
  }
}

const getCommand = (): string => {
  if (process.argv.length === 3) {
    return process.argv[2]
  }
  return '';
}

const init = () => {
  makeConfigDir();
  makeDefaultConfig();
  makeEnvConfigs();
  installRequired();
}

const installRequired = () => {
  let installing = '';

  try {
    const pkgFile = JSON.parse(readFileSync(packageFile).toString());
    const prodDeps: string[] = Object.keys(pkgFile.dependencies || {});
    const devDeps: string[] = Object.keys(pkgFile.devDependencies || {});

      prodDependencies.forEach((prodDep) => {
        if (!prodDeps.includes(prodDep)) {
          installing = prodDep;
          execSync(`npm i ${prodDep}`);
        }
      });

      devDependencies.forEach((devDep) => {
        if (!devDeps.includes(devDep)) {
          installing = devDep;
          execSync(`npm i -D ${devDep}`);
        }
      });
  }
  catch (err) {
    console.error(`installRequired: failed to install ${installing}: ${(err as Error).message}`);
  }
};

const makeConfigDir = () => {
  try {
    if (!existsSync(configDir)) {
      mkdirSync(configDir);
    }
    else {
      console.warn(`Config directory (${configDir}) already exists.`);
    }
  }
  catch (err) {
    console.error(`makeConfig: ${(err as Error).message}`);
  }
};

const makeDefaultConfig = () => {
  try {
    const configTemplate = readFileSync(`${__dirname}/templates/config.json`);

    if (!existsSync(defaultConfig)) {
      writeFileSync(defaultConfig, configTemplate);
    }
    else {
      console.warn(`Default config (${defaultConfig}) already exists; leaving alone.`)
    }
  }
  catch (err) {
    console.error(`makeDefaultConfig: ${(err as Error).message}`);
  }
}

const makeEnvConfigs = () => {
  ['dev.config.json', 'non-prod.config.json', 'prod.config.json']
    .forEach((configFile) => {
      try {
        const configPath = `${configDir}/${configFile}`
        if (!existsSync(configPath)) {
          writeFileSync(configPath, '{}');
        }
        else {
          console.warn(`Config (${configPath}) already exists; leaving alone.`)
        }
      } catch (err) {
        console.error(`makeEnvConfigs: error on ${configFile}: ${(err as Error).message}`);
      }
    });
};

main();
