import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import SessionGuard from './components/SessionGuard';
import ScrollToTop from './components/common/ScrollToTop';
import Footer from './components/layout/Footer';
import Navbar from './components/layout/Navbar';
import LessonDetail from './components/lesson/LessonDetail';
import ContentSection from './components/lesson/section/ContentSection';
import OverviewSection from './components/lesson/section/OverviewSection';
import ResourcesSection from './components/lesson/section/ResourcesSection';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import About from './pages/About';
import ComingSoon from './pages/ComingSoon';
import Home from './pages/Home';
import Lesson from './pages/Lesson';
import Login from './pages/Login';
import Quiz from './pages/Quiz';
import Register from './pages/Register';

function App() {
    return (
        <AuthProvider>
            <ThemeProvider>
                <Router>
                    <ScrollToTop/>
                    <div className="app">
                        <Navbar />
                        <main>
                            <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/lesson" element={<Lesson />} />
                            <Route path="/lesson/:id/*" element={<LessonDetail />} />
                                <Route path="overview" element={<OverviewSection />} />
                                <Route path="content" element={<ContentSection />} />
                                <Route path="resources" element={<ResourcesSection />} />
                                <Route path="/quiz/:lessonId" element={
                                    <SessionGuard>
                                        <Quiz />
                                    </SessionGuard>
                                } />
                            <Route path="/coming-soon" element={<ComingSoon />} />
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
            </ThemeProvider>
        </AuthProvider>
    );
}

export default App;