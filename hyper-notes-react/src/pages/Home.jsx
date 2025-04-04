import React from 'react';
import { Link } from 'react-router-dom';
import mainImage from '../assets/main.png';
import { FaCloud, FaFolder, FaImage, FaSearch, FaLink, FaCheckSquare, FaShareAlt } from 'react-icons/fa';

const Home = () => {
  const features = [
    { icon: <FaCloud className="text-3xl text-purple-500" />, title: "Sync Across Devices", description: "Seamless sync between mobile and web versions" },
    { icon: <FaFolder className="text-3xl text-purple-500" />, title: "Folder Notes", description: "Organize notes with custom labels" },
    { icon: <FaImage className="text-3xl text-purple-500" />, title: "Picture Support", description: "Embed and attach images to your notes" },
    { icon: <FaSearch className="text-3xl text-purple-500" />, title: "Advanced Search", description: "Quickly find notes with powerful search" },
    { icon: <FaLink className="text-3xl text-purple-500" />, title: "Link Support", description: "Add and track links within your notes" },
    { icon: <FaCheckSquare className="text-3xl text-purple-500" />, title: "To-Do Lists", description: "Create and manage task lists" },
    { icon: <FaShareAlt className="text-3xl text-purple-500" />, title: "Note Sharing", description: "Export notes as .txt or .pdf" }
  ];

  return (
    <div className="bg-zinc-900 min-h-screen text-amber-50">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="text-left">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              NoteSync: Your Intelligent
              <br />
              Note-Taking Companion
            </h1>
            
            <p className="text-xl text-gray-300 mb-8">
              Capture, organize, and sync your thoughts across all devices.
              Powerful, intuitive, and always with you.
            </p>

            <div className="flex space-x-4">
              <Link to="/login" className="transform transition-transform hover:-translate-y-1">
                <button className="bg-purple-600 text-white px-8 py-3 rounded-md font-semibold 
                                   hover:bg-purple-700 focus:outline-none focus:ring-2 
                                   focus:ring-purple-500 focus:ring-opacity-50">
                  Get Started
                </button>
              </Link>
              
              <a 
                href="https://github.com/your-repo" 
                target="_blank" 
                rel="noopener noreferrer"
                className="transform transition-transform hover:-translate-y-1"
              >
                <button className="flex items-center gap-2 border-2 border-purple-600 
                                   text-purple-600 px-8 py-3 rounded-md font-semibold 
                                   hover:bg-purple-600 hover:text-amber-50 
                                   focus:outline-none focus:ring-2 focus:ring-purple-500">
                  View on GitHub
                </button>
              </a>
            </div>
          </div>

          <div className="flex justify-center md:justify-end">
            <div className="w-full max-w-md">
              <img
                src={mainImage}
                alt="NoteSync App"
                className="w-full h-auto object-contain shadow-2xl 
                           transform transition-transform hover:scale-105"
              />
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-12">
            Features That Empower Your Productivity
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="bg-zinc-800 p-6 rounded-lg text-center 
                            transform transition-transform hover:-translate-y-2 
                            hover:shadow-lg"
              >
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack Section */}
        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold mb-8">Our Technology Stack</h2>
          <div className="flex justify-center space-x-6 text-2xl">
            <span className="text-blue-500">React</span>
            <span className="text-blue-600">Flutter</span>
            <span className="text-green-500">Firestore</span>
            <span className="text-orange-500">Firebase</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;