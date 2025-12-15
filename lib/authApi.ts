import { apiFetch } from "./apiClient";

export interface RequestOtpPayload {
  email: string;
}

export interface RequestOtpResponse {
  success?: boolean;
  message?: string;
}

export interface SignUpPayload {
  name: string;
  email: string;
  otp: string;
  password: string;
}

export interface SignUpResponse {
  success?: boolean;
  message?: string;
  token?: string;
  user?: {
    id: string;
    name: string;
    email: string;
  };
}

export async function requestOtp(email: string): Promise<RequestOtpResponse | void> {
  const safeEmail = encodeURIComponent(email.trim());

  if (!safeEmail) {
    throw new Error("Email is required");
  }

  const result = await apiFetch<RequestOtpResponse | void>(
    `/v1/auth/user/request-otp/${safeEmail}`,
    {
      method: "POST",
    }
  );

  return result;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  success?: boolean;
  message?: string;
  user?: {
    id: string;
    name: string;
    email: string;
  };
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  image_url?: string | null;
}

export interface UpdateProfilePayload {
  name?: string;
  image_url?: string;
  email?: string;
  otp?: string;
}

export async function signUp(payload: SignUpPayload): Promise<SignUpResponse> {
  const result = await apiFetch<SignUpResponse>("/v1/auth/user/signup", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  return result;
}

export async function login(payload: LoginPayload): Promise<LoginResponse> {
  const result = await apiFetch<LoginResponse>("/v1/auth/user/login", {
    method: "POST",
    body: JSON.stringify(payload),
    credentials: "include", // Important: include cookies
  });

  return result;
}

export async function getUserProfile(): Promise<UserProfile> {
  console.log('📡 Calling GET /v1/auth/user/profile');
  const result = await apiFetch<UserProfile>("/v1/auth/user/profile", {
    method: "GET",
    credentials: "include", // Important: include cookies
  });
  console.log('📡 Raw API response:', result);
  console.log('📡 Response type:', typeof result);
  console.log('📡 Response keys:', result ? Object.keys(result) : 'null');

  return result;
}

export async function logout(): Promise<void> {
  await apiFetch<void>("/v1/auth/user/logout", {
    method: "POST",
    credentials: "include", // Important: include cookies
  });
}

export async function updateProfile(payload: UpdateProfilePayload): Promise<UserProfile> {
  const result = await apiFetch<UserProfile>("/v1/auth/user/profile", {
    method: "PUT",
    body: JSON.stringify(payload),
    credentials: "include", // Important: include cookies
  });

  return result;
}

// OAuth2 Google Login/Signup
export interface OAuth2AuthorizeResponse {
  authorization_url: string;
}

/**
 * Initiates Google OAuth flow by requesting authorization URL from backend
 * @returns Promise with authorization URL to redirect user to Google OAuth
 */
export async function initiateGoogleOAuth(): Promise<OAuth2AuthorizeResponse> {
  // Backend returns 302 redirect, so we need to construct the URL manually
  // and let the browser handle the redirect
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const authUrl = `${API_BASE_URL}/v0/oauth2/authorize`;
  
  // Return the URL for the frontend to redirect to
  return { authorization_url: authUrl };
}

// OAuth2 Callback Handler
export interface OAuth2CallbackPayload {
  code: string;
  state?: string;
}

export interface OAuth2CallbackResponse {
  success: boolean;
  message?: string;
  user?: {
    id: string;
    name: string;
    email: string;
    image_url?: string;
  };
}

/**
 * Handles OAuth callback by exchanging authorization code for user session
 * @param payload - Contains authorization code and optional state from OAuth redirect
 * @returns Promise with authentication result and user information
 */
export async function handleOAuthCallback(payload: OAuth2CallbackPayload): Promise<OAuth2CallbackResponse> {
  const result = await apiFetch<OAuth2CallbackResponse>("/v0/oauth2/callback", {
    method: "POST",
    body: JSON.stringify(payload),
    credentials: "include",
  });

  return result;
}
