import configs from "../config/config.ts";
import { MongoClient } from "../deps.ts";
import log from "../middlewares/logger.middleware.ts";
import Seed from "../seed.ts";

const { dbName, dbUser, dbPass, dbHostShard, seed } = configs;

/**
 * Reusable database connection
 */
class Database {
  public client: MongoClient;
  private seeder: Seed = new Seed();

  /**
   * Constructor function for Database
   * @param dbName
   * @param dbPass
   * @param dbUser
   * @param dbHost
   */
  constructor(
    public dbName: string,
    public dbPass: string,
    public dbUser: string,
    public dbHost: string,
  ) {
    this.dbName = dbName;
    this.dbPass = dbPass;
    this.dbUser = dbUser;
    this.dbHost = dbHost;
    this.client = {} as MongoClient;
  }

  /**
   * Function to connect to mongo db
   */
  async connect() {
    log.info("Database connecting...");
    const client: MongoClient = new MongoClient();
    await client.connect({
      db: this.dbName,
      tls: true,
      servers: [
        {
          host: this.dbHost,
          port: 27017,
        },
      ],
      credential: {
        username: this.dbUser,
        password: this.dbPass,
        db: this.dbName,
        mechanism: "SCRAM-SHA-1",
      },
    });
    this.client = client;
    log.info("Database connected!");
    if (seed) {
      const ev = setTimeout(async () => {
        await this.seeder.seedCollection();
        log.info("All Seed done");
        clearTimeout(ev);
      }, 10);
    }
  }

  /**
   * returns database
   */
  get getDatabase() {
    return this.client.database(this.dbName);
  }
}

const db = new Database(dbName, dbPass, dbUser, dbHostShard);
await db.connect();

export default db;
