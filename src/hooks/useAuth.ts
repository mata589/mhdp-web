// // src/hooks/useAuth.ts
// import { useState } from 'react';

// import { authService } from '../services/api/auth';
// import type { LoginData, RegisterData, User } from '../types/user.types';

// export const useAuth = () => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [user, setUser] = useState<User | null>(authService.getCurrentUser());

//   const login = async (data: LoginData) => {
//     setIsLoading(true);
//     setError(null);

//     try {
//       const loggedInUser = await authService.login(data.email, data.password);
//       setUser(loggedInUser);
//       return loggedInUser;
//     } catch (err) {
//       setError('Login failed. Please check your credentials.');
//       throw err;
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const register = async (data: RegisterData) => {
//     setIsLoading(true);
//     setError(null);

//     try {
//       // If using real API, implement this in authService
//       const response = await authService.register?.(data);
//       return response;
//     } catch (err) {
//       setError('Registration failed. Please try again.');
//       throw err;
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const verifyOTP = async (email: string, code: string) => {
//     setIsLoading(true);
//     setError(null);

//     try {
//       const response = await authService.verifyOTP?.(email, code);
//       return response;
//     } catch (err) {
//       setError('Invalid OTP code.');
//       throw err;
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const logout = () => {
//     authService.logout();
//     setUser(null);
//   };

//   return {
//     user,
//     login,
//     register,
//     verifyOTP,
//     logout,
//     isAuthenticated: authService.isAuthenticated(),
//     isLoading,
//     error,
//     clearError: () => setError(null),
//   };
// };
