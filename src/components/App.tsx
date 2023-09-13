import React from 'react';
import '../assets/css/app.sass';
import NavBar from './NavBar';
import Header from './Header';
import About from './About';
import Education from './Education';
import Contact from './Contact';
import Footer from './Footer';

const App = () => {
  // Available Colours:
  // blue, cyan, gray, green, orange, pink, purple, red, teal, yellow

  // edit this variable to change the color theme
  const color = "teal";
  return (
    <>
      <NavBar color={color} />
      <Header color={color} />
      <About color={color} />
      <Education color={color} />
      {/*
      <Experience color={color} />
  <Projects color={color} /> */}
      <Contact color={color} />
      <Footer />
    </>
  );
}

export default App;
