export interface Config {
  appName: string;
  version: string;
  environment: 'development' | 'staging' | 'production';
  port: number;
  apiUrl: string;
  features: {
    enableLogging: boolean;
    enableMetrics: boolean;
    enableDebug: boolean;
  };
}

const defaultConfig: Config = {
  appName: 'TypeScript Template',
  version: '1.0.0',
  environment: 'development',
  port: 3000,
  apiUrl: 'http://localhost:3000/api',
  features: {
    enableLogging: true,
    enableMetrics: false,
    enableDebug: true,
  },
};

export function loadConfig(overrides?: Partial<Config>): Config {
  const environment = (process.env['NODE_ENV'] ?? 'development') as Config['environment'];
  
  return {
    ...defaultConfig,
    ...overrides,
    environment,
    port: Number(process.env['PORT']) || overrides?.port || defaultConfig.port,
    apiUrl: process.env['API_URL'] || overrides?.apiUrl || defaultConfig.apiUrl,
  };
}

export function validateConfig(config: Config): void {
  if (config.port < 1 || config.port > 65535) {
    throw new Error(`Invalid port: ${config.port}`);
  }
  
  try {
    new URL(config.apiUrl);
  } catch {
    throw new Error(`Invalid API URL: ${config.apiUrl}`);
  }
}