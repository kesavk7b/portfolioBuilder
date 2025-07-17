import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useState } from 'react';

// Dummy pages
const Home = () => <section className="p-4 text-center">Welcome to My Portfolio</section>;
const About = () => <section className="p-4">About Me</section>;
const Projects = () => (
  <section className="p-4">
    <h2 className="text-xl font-semibold mb-2">Projects</h2>
    <ul>
      <li><Link to="/projects/1" className="text-blue-500 underline">Project One</Link></li>
    </ul>
  </section>
);
const ProjectDetail = () => (
  <section className="p-4">Details about Project One</section>
);
const Contact = () => (
  <section className="p-4">
    <form className="flex flex-col gap-4 max-w-md mx-auto">
      <input type="text" placeholder="Name" className="border p-2 rounded" />
      <input type="email" placeholder="Email" className="border p-2 rounded" />
      <textarea placeholder="Message" className="border p-2 rounded" rows="4" />
      <button className="bg-blue-600 text-white px-4 py-2 rounded">Send</button>
    </form>
  </section>
);

const Navbar = () => (
  <nav className="bg-gray-100 shadow p-4 flex justify-between items-center">
    <div className="font-bold text-lg">MyPortfolio</div>
    <div className="space-x-4">
      <Link to="/" className="hover:text-blue-600">Home</Link>
      <Link to="/about" className="hover:text-blue-600">About</Link>
      <Link to="/projects" className="hover:text-blue-600">Projects</Link>
      <Link to="/contact" className="hover:text-blue-600">Contact</Link>
      <a href="/resume.pdf" target="_blank" className="hover:text-blue-600">Download Resume</a>
    </div>
  </nav>
);

const Footer = () => (
  <footer className="bg-gray-100 text-center p-4 mt-8 border-t">
    <p>&copy; 2025 Kesav. All rights reserved.</p>
  </footer>
);

const App = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:id" element={<ProjectDetail />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
