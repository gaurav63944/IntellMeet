/**
 * Centralized access to build-time environment variables.
 * Other modules should import from here rather than reading
 * `import.meta.env` directly.
 */
export const config = {
  apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
};
