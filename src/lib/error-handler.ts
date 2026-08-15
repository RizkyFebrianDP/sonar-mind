import { ApplicationError, NetworkError } from "./errors";

/**
 * Standardizes error formatting and logging.
 * Can be integrated with Sentry or Datadog in the future.
 */
export function handleError(error: unknown, context?: string): ApplicationError {
  // Log the error to console (or external service)
  console.error(`[ErrorHandler] ${context ? `(${context}) ` : ''}Error caught:`, error);

  if (error instanceof ApplicationError) {
    return error;
  }

  if (error instanceof Error) {
    // Determine if it's a network-related error based on common message patterns
    if (error.message.toLowerCase().includes('network') || error.message.toLowerCase().includes('fetch')) {
      return new NetworkError(error.message);
    }
    
    return new ApplicationError(error.message, 'UNKNOWN_ERROR');
  }

  return new ApplicationError('An unexpected error occurred', 'UNKNOWN_ERROR', 500, { originalError: error });
}

/**
 * Executes a primary function, falls back to a fallback function on failure.
 * Graceful Degradation pattern.
 */
export async function withFallback<T>(
  primary: () => Promise<T>,
  fallback: () => Promise<T>,
  logError: boolean = true
): Promise<T> {
  try {
    return await primary();
  } catch (e) {
    if (logError) {
      console.error("Primary function failed, attempting fallback:", e);
    }
    return await fallback();
  }
}
