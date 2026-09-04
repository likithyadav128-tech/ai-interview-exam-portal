import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { 
  getMsalInstance, 
  resetMsalInstance, 
  loginRequest, 
  isClientConfigured,
  getStoredClientId 
} from './authConfig';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [authError, setAuthError] = useState(null);
  const [isMsalConfigured, setIsMsalConfigured] = useState(isClientConfigured());

  // Initialize MSAL and check active session on mount
  useEffect(() => {
    let isMounted = true;

    const initializeAuth = async () => {
      try {
        const msal = getMsalInstance();
        if (typeof msal.initialize === 'function') {
          await msal.initialize();
        }

        if (!isMounted) return;

        // Handle redirect response if returning from Microsoft login redirect
        const response = await msal.handleRedirectPromise().catch((err) => {
          console.error("MSAL Redirect Error:", err);
          return null;
        });

        if (response && response.account) {
          const account = response.account;
          const authUser = {
            id: account.homeAccountId || account.localAccountId,
            name: account.name || account.username.split('@')[0],
            email: account.username || account.idTokenClaims?.email || '',
            role: 'student',
            stage: 'sem7',
            targetCompany: 'TCS Prime (₹7-11.5 LPA)',
            authProvider: 'microsoft',
            examHistory: []
          };
          setUser(authUser);
          localStorage.setItem('ai_portal_current_user', JSON.stringify(authUser));
          setIsLoading(false);
          return;
        }

        // Check if there is an active MSAL account
        if (isClientConfigured()) {
          const accounts = msal.getAllAccounts();
          if (accounts.length > 0) {
            const account = accounts[0];
            const authUser = {
              id: account.homeAccountId || account.localAccountId,
              name: account.name || account.username.split('@')[0],
              email: account.username || '',
              role: 'student',
              stage: 'sem7',
              targetCompany: 'TCS Prime (₹7-11.5 LPA)',
              authProvider: 'microsoft',
              examHistory: []
            };
            setUser(authUser);
            localStorage.setItem('ai_portal_current_user', JSON.stringify(authUser));
            setIsLoading(false);
            return;
          }
        }

        // Check local persisted session
        const storedUser = localStorage.getItem('ai_portal_current_user');
        if (storedUser) {
          try {
            const parsed = JSON.parse(storedUser);
            setUser(parsed);
          } catch (e) {
            localStorage.removeItem('ai_portal_current_user');
          }
        }
      } catch (err) {
        console.error("Auth initialization error:", err);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    initializeAuth();

    return () => {
      isMounted = false;
    };
  }, []);

  const clearError = useCallback(() => {
    setAuthError(null);
  }, []);

  // Save custom client config
  const saveCustomMsalConfig = useCallback((clientId, tenantId) => {
    resetMsalInstance(clientId, tenantId);
    setIsMsalConfigured(Boolean(clientId && clientId.length > 8));
  }, []);

  // Microsoft OAuth Login Handler
  const loginWithMicrosoft = useCallback(async () => {
    setAuthError(null);

    // If client ID is not configured, inform caller to open setup modal
    if (!isClientConfigured()) {
      return { needsConfig: true };
    }

    setIsLoading(true);

    try {
      const msal = getMsalInstance();
      if (typeof msal.initialize === 'function') {
        await msal.initialize();
      }

      // Execute real Microsoft OAuth 2.0 PKCE Popup Flow
      const response = await msal.loginPopup(loginRequest);
      if (response && response.account) {
        const account = response.account;
        const authUser = {
          id: account.homeAccountId || account.localAccountId,
          name: account.name || account.username.split('@')[0],
          email: account.username || account.idTokenClaims?.email || '',
          role: 'student',
          stage: 'sem7',
          targetCompany: 'TCS Prime (₹7-11.5 LPA)',
          authProvider: 'microsoft',
          examHistory: []
        };
        setUser(authUser);
        localStorage.setItem('ai_portal_current_user', JSON.stringify(authUser));
        setIsLoading(false);
        return { success: true };
      }
    } catch (err) {
      console.error("Microsoft Login Failed:", err);
      if (err.errorCode === 'user_cancelled') {
        setAuthError("Sign-in was cancelled by user.");
      } else if (err.errorCode === 'popup_window_error') {
        try {
          const msal = getMsalInstance();
          await msal.loginRedirect(loginRequest);
          return { redirecting: true };
        } catch (redirectErr) {
          setAuthError("Unable to open Microsoft login window. Check popup permissions.");
        }
      } else if (err.errorMessage && err.errorMessage.includes('AADSTS')) {
        setAuthError(`Microsoft Authentication Error: ${err.errorMessage.split(':')[0]}`);
      } else {
        setAuthError("Unable to complete Microsoft Sign-In. Please check your credentials and network connection.");
      }
    } finally {
      setIsLoading(false);
    }

    return { success: false };
  }, []);

  // Standard Email / University Credentials Login
  const loginWithCredentials = useCallback(async ({ email, password, name, stage, targetCompany, isRegistering }) => {
    setIsLoading(true);
    setAuthError(null);

    await new Promise((resolve) => setTimeout(resolve, 500));

    if (!email || !password) {
      setAuthError("Please provide both email and password.");
      setIsLoading(false);
      return false;
    }

    if (password.length < 6) {
      setAuthError("Password must be at least 6 characters.");
      setIsLoading(false);
      return false;
    }

    try {
      const usersStr = localStorage.getItem('ai_portal_users');
      let users = usersStr ? JSON.parse(usersStr) : [];
      
      let authenticatedUser = null;

      if (isRegistering) {
        const existing = users.find(u => u.email.toLowerCase() === email.toLowerCase());
        if (existing) {
          setAuthError("An account with this email already exists. Please sign in.");
          setIsLoading(false);
          return false;
        }

        authenticatedUser = {
          id: `usr_${Date.now()}`,
          name: name || email.split('@')[0],
          email: email.toLowerCase(),
          role: 'student',
          stage: stage || 'sem7',
          targetCompany: targetCompany || 'TCS Prime (₹7-11.5 LPA)',
          authProvider: 'credentials',
          examHistory: [],
          createdAt: new Date().toISOString()
        };

        users.push(authenticatedUser);
        localStorage.setItem('ai_portal_users', JSON.stringify(users));
      } else {
        const found = users.find(u => u.email.toLowerCase() === email.toLowerCase());
        if (found) {
          authenticatedUser = found;
        } else {
          authenticatedUser = {
            id: `usr_${Date.now()}`,
            name: name || email.split('@')[0],
            email: email.toLowerCase(),
            role: 'student',
            stage: stage || 'sem7',
            targetCompany: targetCompany || 'TCS Prime (₹7-11.5 LPA)',
            authProvider: 'credentials',
            examHistory: [],
            createdAt: new Date().toISOString()
          };
          users.push(authenticatedUser);
          localStorage.setItem('ai_portal_users', JSON.stringify(users));
        }
      }

      setUser(authenticatedUser);
      localStorage.setItem('ai_portal_current_user', JSON.stringify(authenticatedUser));
      setIsLoading(false);
      return true;
    } catch (err) {
      setAuthError("Sign-in was unsuccessful. Please try again.");
      setIsLoading(false);
      return false;
    }
  }, []);

  // Logout Handler
  const logout = useCallback(async () => {
    setIsLoading(true);
    try {
      if (user?.authProvider === 'microsoft' && isClientConfigured()) {
        const msal = getMsalInstance();
        const accounts = msal.getAllAccounts();
        if (accounts.length > 0) {
          await msal.logoutPopup({
            account: accounts[0],
            postLogoutRedirectUri: window.location.origin
          }).catch(() => {
            sessionStorage.clear();
          });
        }
      }
    } catch (err) {
      console.warn("MSAL logout error:", err);
    } finally {
      localStorage.removeItem('ai_portal_current_user');
      setUser(null);
      setAuthError(null);
      setIsLoading(false);
    }
  }, [user]);

  // Update user profile data
  const updateUserProfile = useCallback((updates) => {
    setUser(prev => {
      if (!prev) return null;
      const updated = { ...prev, ...updates };
      localStorage.setItem('ai_portal_current_user', JSON.stringify(updated));

      try {
        const usersStr = localStorage.getItem('ai_portal_users');
        if (usersStr) {
          const users = JSON.parse(usersStr);
          const idx = users.findIndex(u => u.email === updated.email);
          if (idx !== -1) {
            users[idx] = updated;
            localStorage.setItem('ai_portal_users', JSON.stringify(users));
          }
        }
      } catch (e) {
        console.error("Error syncing user profile:", e);
      }

      return updated;
    });
  }, []);

  const value = {
    user,
    isAuthenticated: Boolean(user),
    isLoading,
    authError,
    isMsalConfigured,
    loginWithMicrosoft,
    loginWithCredentials,
    saveCustomMsalConfig,
    logout,
    updateUserProfile,
    clearError
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
