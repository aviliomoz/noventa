import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// Routes
import { AuthLayout } from "./layouts/auth-layout";
import { AppLayout } from "./layouts/app-layout";
import { HomePage } from "./pages/home-page";
import { HabitsPage } from "./pages/habits-page";
import { ProgressPage } from "./pages/progress-page";

// Components
import { SignInForm } from "./components/sign-in-form";
import { SignUpForm } from "./components/sign-up-form";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="sign-in" element={<SignInForm />} />
          <Route path="sign-up" element={<SignUpForm />} />
        </Route>
        <Route element={<AppLayout />}>
          <Route path="/habits" element={<HabitsPage />} />
          <Route path="/progress" element={<ProgressPage />} />
        </Route>
        <Route path="*" element={<h2>404</h2>} />
      </Routes>
      <Toaster position="bottom-right" />
    </>
  );
}

export default App;
