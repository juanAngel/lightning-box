export interface Config {
  // Current environment
  env: "prod" | "development" | "test";

  // serverHost is the host interface, optionally with port (i.e 127.0.0.1:8080).
  serverHost: string;

  // domain is the domain name to be used for Lighting Addresses (i.e satoshi@<domain>).
  domain: string;

  // domainUrl is the accessible URL (i.e http://site.com).
  // This is needed to be able to construct lnurl callbacks.
  domainUrl: string;

  // backend is the lightning node that will act as a backend for this server.
  backend: "lnd";
  //dbUrl is the URL that describes the connection to the database
  dbUrl:string;

  bech32Encode:boolean

  // Backend config specifically for lnd.
  backendConfigLnd?: {
    // Address to the gRPC server (i.e 127.0.0.1:10009).
    grpcServer: string;

    // Path to tls.cert (i.e ~/.lnd/tls.cert).
    cert: string;

    // Path to the admin.macaroon (i.e ~/.lnd/data/chain/bitcoin/mainnet/admin.macaroon).
    adminMacaroon: string;
  };
}
