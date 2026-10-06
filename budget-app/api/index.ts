// configure and export axios instance

/**
 * Provides the options, base url, etc for the main app axios instance.
 * To provide another axios instance (e.g., if needed, requiring different config setups/interceptors for requests)
 * create a different OPTIONS object and export a second axios.create({})
 */

import axios, { CreateAxiosDefaults } from 'axios';

// client instance configuration
const AXIOS_OPTIONS: CreateAxiosDefaults<any, any> | undefined = {
  baseURL: process.env.BUDGET_BASE_URL || "localhost:6000",
  timeout: 10000, // 10 second timeout limit
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
}

// generate and export the axios client
export default axios.create(AXIOS_OPTIONS);