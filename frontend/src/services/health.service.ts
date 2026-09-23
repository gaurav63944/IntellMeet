import { config } from '@/lib/config';

export interface HealthResponse {
  status: string;
  service: string;
  timestamp: string;
}

/**
 * Calls the backend health-check endpoint.
 * Used on Day 1 only to prove the frontend/backend wiring works.
 */
export async function fetchHealth(): Promise<HealthResponse> {
  const response = await fetch(`${config.apiUrl}/health`);
  if (!response.ok) {
    throw new Error(`Health check failed with status ${response.status}`);
  }
  return response.json();
}
