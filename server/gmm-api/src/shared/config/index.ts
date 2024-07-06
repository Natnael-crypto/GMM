export interface JwtConfig {
  secret: string;
  expiration: string;
}

export interface OAuthConfig {
  client_id: string;
  project_id: string;
  auth_uri: string;
  token_uri: string;
  auth_provider_x509_cert_url: string;
  client_secret: string;
  redirect_uris: string[];
  javascript_origins: string[];
}

export interface ClientConfig {
  url: string;
  authSuccessUrl: string;
}

export interface EmailLists {
  getList(id: string);
}

export interface ResponseError extends Error {
  statusCode?: number;
}