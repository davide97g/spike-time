import { vitest } from "vitest";

// mock initializeAppCheck
vitest.mock("firebase/app-check", () => {
  return {
    initializeAppCheck: vitest.fn(),
    ReCaptchaV3Provider: vitest.fn(),
  };
});

// mock initializeAnalytics
vitest.mock("firebase/analytics", () => {
  return {
    getAnalytics: vitest.fn(),
  };
});

// mock useNavigate
vitest.mock("react-router-dom", () => {
  return {
    useNavigate: () => vitest.fn(),
  };
});
