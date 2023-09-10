import React from 'react';
import '../assets/app.sass';
import Nav from './NavBar';
import Header from './Header';
import About from './About';
import Contact from './Contact';
import Footer from './Footer';

function App() {
  // Available Colours:
  // blue, cyan, gray, green, orange, pink, purple, red, teal, yellow

  // edit this variable to change the color theme
  const color = "teal";
  return (
    <>
      <Nav color={color} />
      <Header color={color} />
      <About color={color} />
      {/*
      <Experience color={color} />
  <Projects color={color} /> */}
      <Contact color={color} />
      <Footer />
    </>
  );
}

export default App;
