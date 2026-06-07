// Replace dummy callbacks in src/components/AuthPage.tsx
import { signIn, signUp, confirmSignUp } from 'aws-amplify/auth';

// 1. SIGN UP ACTION
const handleSignUpSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    const { isSignUpComplete, userId, nextStep } = await signUp({
      username: signUpEmail, // Cognito uses email as username in our configuration
      password: signUpPassword,
      options: {
        userAttributes: {
          email: signUpEmail,
          phone_number: signUpMobile, // Must be formatted in E.164 (e.g., +919876543210)
          name: signUpName
        }
      }
    });

    if (nextStep.signUpStep === 'CONFIRM_SIGN_UP') {
      setSuccessMsg("Verification code sent to your email. Please verify access!");
      // Switch screen to enter Cognito OTP if desired
    }
  } catch (error: any) {
    setErrorMsg(error.message || "Registration failed.");
  }
};

// 2. SIGN IN ACTION
const handleLoginSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    const { isSignedIn, nextStep } = await signIn({
      username: loginEmail,
      password: loginPassword,
    });

    if (isSignedIn) {
      // Fetch current authenticated user attributes from Cognito
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: loginEmail }) 
      });
      const userData = await response.json();
      onLoginSuccess(userData);
    }
  } catch (error: any) {
    setErrorMsg(error.message || "Invalid authentication credentials.");
  }
};
