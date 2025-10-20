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
	const envEnvironment = process.env['NODE_ENV'];
	const environment = (overrides?.environment ?? envEnvironment ?? 'development') as Config['environment'];
	const envPort = process.env['PORT'];
	const port = overrides?.port ?? (envPort ? Number(envPort) : undefined) ?? defaultConfig.port;
	const apiUrl = overrides?.apiUrl ?? process.env['API_URL'] ?? defaultConfig.apiUrl;

	return {
		...defaultConfig,
		...overrides,
		environment,
		port,
		apiUrl,
	};
}

export function validateConfig(config: Config): void {
	if (Number.isNaN(config.port) || config.port < 1 || config.port > 65535) {
		throw new Error(`Invalid port: ${config.port}`);
	}

	try {
		new URL(config.apiUrl);
	} catch {
		throw new Error(`Invalid API URL: ${config.apiUrl}`);
	}
}
