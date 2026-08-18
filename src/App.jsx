import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import RakshabandhanPopup from './components/RakshabandhanPopup';
import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';
import Contact from './pages/Contact';
import { AnimatePresence, motion } from 'framer-motion';

const pageVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.25, 1, 0.5, 1] } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.25, ease: [0.25, 1, 0.5, 1] } }
};

function App() {
  const location = useLocation();

  return (
    <>
      <ScrollToTop />
      <RakshabandhanPopup />
      <div className="app">
        <Navbar />
        <main className="overflow-hidden">
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={
                <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
                  <Home />
                </motion.div>
              } />
              <Route path="/about" element={
                <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
                  <About />
                </motion.div>
              } />
              <Route path="/products" element={
                <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
                  <Products />
                </motion.div>
              } />
              <Route path="/contact" element={
                <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
                  <Contact />
                </motion.div>
              } />
            </Routes>
          </AnimatePresence>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;
