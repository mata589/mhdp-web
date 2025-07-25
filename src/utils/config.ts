// src/utils/config.ts

export interface AppConfig {
    API_BASE_URL: string;
    USE_MOCK_DATA: boolean;
    WEBSOCKET_URL: string;
    API_TIMEOUT: number;
    APP_VERSION: string;
    ENVIRONMENT: 'development' | 'staging' | 'production';
  }
  
  // Default configuration
  const defaultConfig: AppConfig = {
    API_BASE_URL: 'http://localhost:3001/api',
    USE_MOCK_DATA: true, // Set to false when your API is ready
    WEBSOCKET_URL: 'ws://localhost:3001',
    API_TIMEOUT: 10000, // 10 seconds
    APP_VERSION: '1.0.0',
    ENVIRONMENT: 'development',
  };
  
  // Simple configuration - modify these values directly for your needs
  const createConfig = (): AppConfig => {
    // You can modify these values directly or they'll be overridden by environment variables if available
    const config = { ...defaultConfig };
    
    // Try to get environment variables if available (works in most React setups)
    try {
      // Check if we're in a browser environment with injected env vars
      const env = (window as any)?.__ENV__ || {};
      
      // Override with environment variables if they exist
      if (env.REACT_APP_API_URL) config.API_BASE_URL = env.REACT_APP_API_URL;
      if (env.REACT_APP_USE_MOCK_DATA) config.USE_MOCK_DATA = env.REACT_APP_USE_MOCK_DATA === 'true';
      if (env.REACT_APP_WEBSOCKET_URL) config.WEBSOCKET_URL = env.REACT_APP_WEBSOCKET_URL;
      if (env.REACT_APP_API_TIMEOUT) config.API_TIMEOUT = parseInt(env.REACT_APP_API_TIMEOUT, 10);
      if (env.REACT_APP_VERSION) config.APP_VERSION = env.REACT_APP_VERSION;
      if (env.REACT_APP_ENVIRONMENT) config.ENVIRONMENT = env.REACT_APP_ENVIRONMENT as AppConfig['ENVIRONMENT'];
      
    } catch (e) {
      // If environment variables aren't available, just use the default config
      console.log('Using default configuration values');
    }
    
    return config;
  };
  
  // Export the configuration
  export const CONFIG = createConfig();
  
  // Helper functions for common configuration checks
  export const isDevelopment = () => CONFIG.ENVIRONMENT === 'development';
  export const isProduction = () => CONFIG.ENVIRONMENT === 'production';
  export const shouldUseMockData = () => CONFIG.USE_MOCK_DATA;
  
  // API endpoint builders
  export const buildApiUrl = (endpoint: string): string => {
    return `${CONFIG.API_BASE_URL}${endpoint.startsWith('/') ? '' : '/'}${endpoint}`;
  };
  
  export const buildWebSocketUrl = (endpoint: string = ''): string => {
    return `${CONFIG.WEBSOCKET_URL}${endpoint.startsWith('/') ? '' : '/'}${endpoint}`;
  };
  
  // Log configuration (only in development)
  if (isDevelopment()) {
    console.log('🔧 App Configuration:', CONFIG);
  }
  
  // Export default for backward compatibility
  export default CONFIG;