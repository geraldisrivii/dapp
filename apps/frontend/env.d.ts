export {}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      SERVER_API_ENDPOINT: string;
      DEMO_CONTRACT_ADDRESS: string;
    }
  }
}
