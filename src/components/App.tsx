import NavBar from './NavBar';
import Header from './Header';
import About from './About';
import Experience from './Experience';
import Education from './Education';
import Projects from './Projects';
import Skills from './Skills';
import Interests from './Interests';
import Contact from './Contact';
import Footer from './Footer';

const App = () => {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900 transition-colors duration-200">
      <NavBar />
      <Header />
      <About />
      <Experience />
      <Education />
      <Projects />
      <Skills />
      <Interests />
      <Contact />
      <Footer />
    </div>
  );
};

export default App;
