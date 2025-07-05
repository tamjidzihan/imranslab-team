import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar";
import Contact from "./pages/Contact";
import HomePage from './pages/HomePage'
import SmoothFollower from "./Helper/SmoothFollower";
import Loader from "./Helper/Loader";
import IntershipPage from "./pages/IntershipPage";
import useAuth from "./hooks/useAuth"
import PublicRoute from "./PublicRoute";
import Login from "./Helper/Login";
import SignUp from "./Helper/Signup";
import UserDetailsPage from "./pages/UserDetailsPage";
import ProfilePage from "./pages/ProfilePage";

export default function App() {

  const { loadingUser, authLoading } = useAuth()

  return (
    <BrowserRouter>
      <div className="App">
        {loadingUser || authLoading ? (
          <Loader />
        ) : (
          <>
            <div className="min-h-screen flex flex-col">

              <Navbar />
              <main className="flex-grow">
                <Routes>
                  {/* Landing pages */}
                  <Route path="/" element={<HomePage />} />
                  <Route path="/intern" element={<IntershipPage />} />
                  <Route path="/contact" element={<Contact />} />

                  {/* ExpertDetails page */}
                  <Route path="/experts/:id" element={<UserDetailsPage />} />
                  {/* internship deatils */}
                  <Route path="/intern/:id" element={<UserDetailsPage />} />

                  {/* user Proficepage */}
                  <Route path="/profile" element={<ProfilePage />} />

                  {/* Log in and Sign Up */}
                  <Route path="/login" element={
                    <PublicRoute>
                      <Login />
                    </PublicRoute>
                  }
                  />
                  <Route path="/signup" element={
                    <PublicRoute>
                      <SignUp />
                    </PublicRoute>
                  }
                  />


                </Routes>
              </main>

              <Footer />
              <SmoothFollower />
            </div>
          </>
        )}
      </div>
    </BrowserRouter>
  );
}
