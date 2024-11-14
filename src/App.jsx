import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Footer from './components/layout/Footer';
import Navbar from './components/layout/Navbar';

function App() {
  console.log('App is rendering'); // Debug log

    return (
        <Router>
        <div className="app">
            <Navbar />
                <main>
                    <h1>Welcome to CT Lab</h1>x
                </main>
            <Footer />
        </div>
        </Router>
    );
}

export default App;