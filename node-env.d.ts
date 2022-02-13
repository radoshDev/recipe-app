declare namespace NodeJS {
	interface ProcessEnv {
		NODE_ENV: "development" | "production" | "test"
		SANITY_TOKEN: string
	}
}
