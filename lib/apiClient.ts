const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!API_BASE_URL) {
  throw new Error("NEXT_PUBLIC_API_BASE_URL is not set");
}

// Helper function to get user-friendly error messages based on status code
function getStatusMessage(status: number): string {
  switch (status) {
    case 400:
      return "Bad request. Please check your input.";
    case 401:
      return "Unauthorized. Please login to continue.";
    case 403:
      return "Access forbidden. You don't have permission.";
    case 404:
      return "Resource not found.";
    case 409:
      return "Conflict. This resource already exists.";
    case 422:
      return "Validation error. Please check your input.";
    case 429:
      return "Too many requests. Please try again later.";
    case 500:
      return "Server error. Please try again later.";
    case 502:
      return "Bad gateway. Server is temporarily unavailable.";
    case 503:
      return "Service unavailable. Please try again later.";
    default:
      return `Request failed with status ${status}`;
  }
}

export async function apiFetch<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${path}`;

  try {
    const response = await fetch(url, {
      ...options,
      credentials: options.credentials || "include", // Always include cookies by default
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
    });

    if (!response.ok) {
      // Try to parse error as JSON first
      const contentType = response.headers.get("content-type");
      const isJson = contentType?.includes("application/json");
      
      if (isJson) {
        try {
          const errorData = await response.json();
          
          // Check for common error formats
          const errorMessage = 
            errorData.error_description || 
            errorData.message || 
            errorData.error || 
            (Object.keys(errorData).length > 0 ? JSON.stringify(errorData) : null);
          
          // If we have a message, throw it
          if (errorMessage) {
            // Don't log JWT/auth errors as errors for unauthenticated users
            const isAuthError = errorMessage.toLowerCase().includes('jwt') || 
                               errorMessage.toLowerCase().includes('token') ||
                               errorMessage.toLowerCase().includes('unauthorized');
            
            if (isAuthError && (response.status === 401 || response.status === 403)) {
              console.log(`ℹ️ Authentication required: ${errorMessage}`);
            } else {
              console.error('❌ API Error:', errorMessage);
            }
            
            throw new Error(errorMessage);
          }
          
          // If empty object or no message, use status-based message
          const statusMessage = getStatusMessage(response.status);
          
          // Only log as error for server errors (5xx), info for client errors (4xx)
          if (response.status >= 500) {
            console.error(`❌ API Error ${response.status}:`, statusMessage);
          } else if (response.status === 401 || response.status === 403) {
            console.log(`ℹ️ Authentication required (${response.status})`);
          } else {
            console.warn(`⚠️ API Error ${response.status}:`, statusMessage);
          }
          
          throw new Error(statusMessage);
        } catch (parseError: any) {
          // If it's already an Error we threw, re-throw it
          if (parseError instanceof Error && parseError.message !== 'Unexpected end of JSON input') {
            throw parseError;
          }
          // If JSON parsing fails, fall back to text
          const text = await response.text();
          throw new Error(text || getStatusMessage(response.status));
        }
      } else {
        const text = await response.text();
        throw new Error(text || getStatusMessage(response.status));
      }
    }

    // Handle 204 No Content
    if (response.status === 204) {
      return undefined as T;
    }

    // Check if response is JSON or plain text
    const contentType = response.headers.get("content-type");
    const isJson = contentType?.includes("application/json");

    if (!isJson) {
      // Return plain text as-is for non-JSON responses
      const text = await response.text();
      return { message: text } as T;
    }

    // Parse JSON response
    const data = await response.json();
    console.log('📦 Parsed JSON data:', data);
    return data as T;
  } catch (error: any) {
    // Network errors (CORS, connection refused, etc.)
    if (error.message === "Failed to fetch" || error.name === "TypeError") {
      console.error("❌ Network Error:", {
        url,
        baseUrl: API_BASE_URL,
        error: error.message,
      });
      throw new Error(
        `Cannot connect to backend at ${API_BASE_URL}. Please check:\n` +
        `1. Backend is running on port 8080\n` +
        `2. CORS is enabled on backend\n` +
        `3. NEXT_PUBLIC_API_BASE_URL is correct in .env.local`
      );
    }
    throw error;
  }
}
