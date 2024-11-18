import React, { Suspense, lazy } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import SessionGuard from './components/SessionGuard';
import ScrollToTop from './components/common/ScrollToTop';
import Footer from './components/layout/Footer';
import Navbar from './components/layout/Navbar';
import QuizResult from './components/lesson/section/QuizResult';
import { AuthProvider } from './context/AuthContext';
import { ProgressProvider } from './context/ProgressContext';
import { ThemeProvider } from './context/ThemeContext';
import About from './pages/About';
import ComingSoon from './pages/ComingSoon';
import Home from './pages/Home';
import Lesson from './pages/Lesson';
import Login from './pages/Login';
import Register from './pages/Register';
const LessonDetail = lazy(() => import('./components/lesson/LessonDetail'));
const OverviewSection = lazy(() => import('./components/lesson/section/OverviewSection'));
const ContentSection = lazy(() => import('./components/lesson/section/ContentSection'));
const ResourcesSection = lazy(() => import('./components/lesson/section/ResourcesSection'));
const QuizSection = lazy(() => import('./components/lesson/section/QuizSection'));

function App() {
    return (
        <AuthProvider>
            <ProgressProvider>
                <ThemeProvider>
                    <Router>
                        <ScrollToTop/>
                        <div className="app">
                                {/* <title>CT Lab</title> */}
                            <Navbar />
                            <main>
                                <Suspense fallback={<div>Loading...</div>}>
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
                                        <Route path="quiz" element={
                                            <SessionGuard>
                                                <PrivateRoute>
                                                    <QuizSection />
                                                </PrivateRoute>
                                            </SessionGuard>
                                        } />
                                    <Route path="/lesson/:lessonId/quiz-result" element={<QuizResult />} />
                                    <Route path="/coming-soon" element={<ComingSoon />} />
                                    </Routes>
                                </Suspense>
                            </main>
                            <Footer />
                        </div>
                    </Router>
                </ThemeProvider>
            </ProgressProvider>
        </AuthProvider>
    );
}

export default App;