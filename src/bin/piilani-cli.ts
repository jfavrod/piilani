import approot from 'app-root-path'
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs'

const configDir = `${approot.path}/config`;
const defaultConfig = `${configDir}/config.json`;

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
}

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
