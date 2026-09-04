import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { msalInstance, loginRequest, isMsalConfigured } from './authConfig';

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
  const [isMsalReady, setIsMsalReady] = useState(false);

  // Initialize MSAL and check active session on mount
  useEffect(() => {
    let isMounted = true;

    const initializeAuth = async () => {
      try {
        // Initialize MSAL instance if supported
        if (typeof msalInstance.initialize === 'function') {
          await msalInstance.initialize();
        }

        if (!isMounted) return;
        setIsMsalReady(true);

        // Handle redirect response if returning from Microsoft login redirect
        const response = await msalInstance.handleRedirectPromise().catch((err) => {
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
        const accounts = msalInstance.getAllAccounts();
        if (accounts.length > 0 && isMsalConfigured) {
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

  // Microsoft OAuth Login Handler
  const loginWithMicrosoft = useCallback(async () => {
    setIsLoading(true);
    setAuthError(null);

    if (!isMsalConfigured) {
      // If client ID is not configured yet, provide helpful guidance or seamless demo login
      setTimeout(() => {
        const demoUser = {
          id: 'ms-demo-user-1',
          name: 'Likith Yadav (Microsoft Student)',
          email: 'likith.student@university.edu.in',
          role: 'student',
          stage: 'sem7',
          targetCompany: 'TCS Prime (₹7-11.5 LPA)',
          authProvider: 'microsoft',
          examHistory: []
        };
        setUser(demoUser);
        localStorage.setItem('ai_portal_current_user', JSON.stringify(demoUser));
        setIsLoading(false);
      }, 700);
      return;
    }

    try {
      // Use popup flow for seamless in-page login or redirect if popup is blocked
      const response = await msalInstance.loginPopup(loginRequest);
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
      }
    } catch (err) {
      console.error("Microsoft Login Failed:", err);
      if (err.errorCode === 'user_cancelled') {
        setAuthError("Sign-in was cancelled. Please try again.");
      } else if (err.errorCode === 'popup_window_error') {
        // Fallback to redirect if popup is blocked by browser
        try {
          await msalInstance.loginRedirect(loginRequest);
          return;
        } catch (redirectErr) {
          setAuthError("Unable to open sign-in window. Check popup permissions and try again.");
        }
      } else {
        setAuthError("Unable to sign in with Microsoft. Please verify your internet connection and try again.");
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Standard Email / University Credentials Login
  const loginWithCredentials = useCallback(async ({ email, password, name, stage, targetCompany, isRegistering }) => {
    setIsLoading(true);
    setAuthError(null);

    // Simulated network delay for realistic security feedback
    await new Promise((resolve) => setTimeout(resolve, 600));

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
          // Auto-provision if valid login attempt
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
      if (user?.authProvider === 'microsoft' && isMsalConfigured) {
        const accounts = msalInstance.getAllAccounts();
        if (accounts.length > 0) {
          await msalInstance.logoutPopup({
            account: accounts[0],
            postLogoutRedirectUri: window.location.origin
          }).catch(() => {
            // If popup logout fails, clear local cache
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

  // Update user profile data (e.g. exam scores or stage change)
  const updateUserProfile = useCallback((updates) => {
    setUser(prev => {
      if (!prev) return null;
      const updated = { ...prev, ...updates };
      localStorage.setItem('ai_portal_current_user', JSON.stringify(updated));

      // Sync with all users list
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
    isMsalReady,
    loginWithMicrosoft,
    loginWithCredentials,
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
