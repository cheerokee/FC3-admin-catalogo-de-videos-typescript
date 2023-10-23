import { Dialect } from "sequelize";
import { config as readEnv } from 'dotenv';
import { join } from "path";

type Config = {
  db: {
    vendor: any,
    host: string,
    logging: boolean
  }
}

function makeConfig(envFile): Config {
  const output = readEnv({ path: envFile });

  return {
    db: {
      vendor: output.parsed.DB_VENDOR as Dialect,
      host: output.parsed.DB_HOST,
      logging: output.parsed.DB_LOGGING === 'true',
    }
  }
}

const envTestFile = join(__dirname, "../../../../.env.test");
export const configTest = makeConfig(envTestFile);

// const envDevelopingFile = join(__dirname, "../../../../.env.developing");
// export const configDevelopment = makeConfig(envDevelopingFile);
