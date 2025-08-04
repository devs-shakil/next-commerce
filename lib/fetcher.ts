import { baseUrl } from "@/config/apiConfig";


export class FetchError extends Error {
  constructor(
    message: string,
    public status: number,
    public data?: unknown
  ) {
    super(message);
    this.name = 'FetchError';
  }
}

interface FetchOptions extends RequestInit {}

// Next.js App Router fetch 'next' config type
interface NextFetchConfig {
  revalidate?: number | false;
}

export async function fetcher<T>(
  endpoint: string,
  options: FetchOptions = {},
  revalidate?: number
): Promise<T> {
  const url = `${baseUrl}${endpoint}`;

  // Add Next.js revalidate option if provided
  const config: RequestInit & { next?: NextFetchConfig } = {
    ...options,
    ...(revalidate !== undefined ? { next: { revalidate } } : {}),
  };

  try {
    const response = await fetch(url, config);
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new FetchError(
        errorData.message || `HTTP ${response.status}`,
        response.status,
        errorData
      );
    }
    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof FetchError) {
      throw error;
    }
    throw new FetchError(
      error instanceof Error ? error.message : 'Network error',
      0
    );
  }
}

// Convenience methods
export const api = {
  /**
   * GET request with optional Next.js revalidate (ISR) support.
   * @param endpoint API endpoint (e.g. '/sliders')
   * @param revalidate Optional revalidate seconds for ISR (e.g. 60)
   */
  get: <T>(endpoint: string, revalidate?: number) =>
    fetcher<T>(endpoint, { method: 'GET' }, revalidate),

  post: <T>(endpoint: string, data?: unknown, token?: string) =>
    fetcher<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
      // token,
    }),

  put: <T>(endpoint: string, data?: unknown, token?: string) =>
    fetcher<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
      // token,
    }),

  delete: <T>(endpoint: string, token?: string) =>
    fetcher<T>(endpoint, { method: 'DELETE' /*, token */ }),
};