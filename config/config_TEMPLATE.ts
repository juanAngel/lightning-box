import { Config } from "./interface";

// Please see interface.ts for description about each config
const config: Config = {
  env: "prod",
  serverHost: "0.0.0.0:8080",
  domain: "192.168.1.1:8080",
  domainUrl: "http://192.168.1.1:8080",
  backend: "lnd",
  dbUrl: "sqlite://source=~/.ln-box/database.db",
  bech32Encode:true,
  backendConfigLnd: {
    grpcServer: "127.0.0.1:10007",
    cert: "~/path/to/lnd/tls.cert",
    adminMacaroon: "~/path/to/lnd/admin.macaroon",
  },
};

export default config;
