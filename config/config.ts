import { Config } from "./interface";
import env from "dotenv";

const result = env.config();

// Please see interface.ts for description about each config
const config: Config = {
  env: "prod",
  serverHost: process.env.HOST || "0.0.0.0:8080",
  domain: process.env.DOMAIN || "192.168.1.1:8080",
  domainUrl: process.env.DOMAIN_URL ||"https://192.168.1.1:8080",
  backend: "lnd",
  dbUrl: process.env.DB_URL ||"sqlite://source=~/.ln-box/database.db",
  backendConfigLnd: {
    grpcServer: process.env.LND_GRPC || "127.0.0.1:10007",
    cert: process.env.LND_CERT || "~/.lnd/tls.cert",
    adminMacaroon: process.env.LND_ADMIN_MACAROON || "~/.lnd/data/chain/bitcoin/mainnet/admin.macaroon",
  },
};

export default config;
