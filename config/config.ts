import { dotEnv } from "../deps.ts";

const env: string = Deno.env.toObject().ENV || "test";
const envPath: string = `.env/.env.${env}`.toString();
const envConfig = dotEnv({
  path: envPath,
});

let mongoUrl = `mongodb+srv://${envConfig.DB_USER}:${
  encodeURIComponent(envConfig.DB_PASS)
}@${envConfig.DB_HOST}/${envConfig.DB_NAME}?retryWrites=true&w=majority`;

if (env === "development" || env === "test") {
  if (envConfig.DB_USER === "" && envConfig.DB_PASS === "") {
    mongoUrl = `mongodb://${envConfig.DB_HOST}/${envConfig.DB_NAME}`;
  }
}

/**
 * Configuration
 */
interface Config {
  env: string;
  jwtSecret: string;
  host: string;
  port: number;
  key: string;
  salt: string;
  protocol: string;
  clientHost: string;
  clientPort: number;
  clientProtocol: string;
  clientUrl: string;
  url: string;
  mongoUrl: string;
  dbName: string;
  dbPass: string;
  dbUser: string;
  dbHostShard: string;
  seed: boolean;
}

const config: Config = {
  env,
  jwtSecret: envConfig.JWT_SECRET,
  host: envConfig.HOST,
  port: Number(envConfig.PORT),
  protocol: envConfig.PROTOCOL,
  clientHost: envConfig.CLIENT_HOST,
  clientPort: Number(envConfig.CLIENT_PORT),
  clientProtocol: envConfig.CLIENT_PROTOCOL,
  clientUrl:
    `${envConfig.CLIENT_PROTOCOL}://${envConfig.CLIENT_HOST}:${envConfig.CLIENT_PORT}`,
  url: `${envConfig.PROTOCOL}://${envConfig.HOST}:${envConfig.PORT}`,
  mongoUrl,
  dbName: envConfig.DB_NAME,
  dbPass: encodeURIComponent(envConfig.DB_PASS),
  dbUser: envConfig.DB_USER,
  dbHostShard: envConfig.DB_HOST_SHARD,
  seed: Boolean(envConfig.SEED === "true"),
  salt: envConfig.SALT,
  key: envConfig.KEY,
};

export default config;
