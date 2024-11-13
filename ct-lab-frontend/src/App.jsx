import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import Footer from './components/layout/Footer';
import Navbar from './components/layout/Navbar';
import { AuthProvider } from './context/AuthContext';
import About from './pages/About';
import Home from './pages/Home';
import Lesson from './pages/Lesson';
import Login from './pages/Login';
import Quiz from './pages/Quiz';
import Register from './pages/Register';

function App() {
    return (
        <AuthProvider>
        <Router>
            <div className="app">
                <Navbar />
                <main>
                    <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/lesson" element={<Lesson />} />
                    {/* Quiz requires authentication */}
                    <Route
                        path="/quiz/:lessonId"
                        element={
                        <PrivateRoute>
                            <Quiz />
                        </PrivateRoute>
                        }
                    />
                    </Routes>
                </main>
                <Footer />
            </div>
        </Router>
        </AuthProvider>
    );
}

export default App;