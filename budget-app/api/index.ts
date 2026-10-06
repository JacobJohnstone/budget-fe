// configure and export axios instance

/**
 * Provides the options, base url, etc for the main app axios instance.
 * To provide another axios instance (e.g., if needed, requiring different config setups/interceptors for requests)
 * create a different OPTIONS object and export a second axios.create({})
 */

import axios, { CreateAxiosDefaults } from 'axios';
import { attachAuthHeader, handleRequestFulfilled, handleRequestRejected, handleUnauthenticatedError } from './interceptors';

// client instance configuration
const AXIOS_OPTIONS: CreateAxiosDefaults<any, any> | undefined = {
  baseURL: process.env.BUDGET_BASE_URL || "localhost:6000",
  timeout: 10000, // 10 second timeout limit
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
}

// generate api client
const client = axios.create(AXIOS_OPTIONS);

// Register request interceptors
client.interceptors.request.use(attachAuthHeader, handleRequestRejected)

// Register response interceptors
client.interceptors.response.use(handleRequestFulfilled, handleUnauthenticatedError)

// generate and export the axios client
export default client;