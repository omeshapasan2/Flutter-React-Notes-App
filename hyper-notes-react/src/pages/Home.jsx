import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaCloud, 
  FaFolder, 
  FaImage, 
  FaSearch, 
  FaLink, 
  FaCheckSquare, 
  FaShareAlt,
  FaGithub,
  FaLinkedin,
  FaBars,
  FaTimes,
  FaStickyNote,
  FaListUl,
  FaLightbulb,
  FaSyncAlt,
  FaReact,
  FaChevronLeft,
  FaChevronRight
} from 'react-icons/fa';
import { SiFlutter, SiFirebase } from 'react-icons/si';
import { Download, Plus, Clock, Bell, Tag, Archive, Trash } from "lucide-react";
import main1 from '../assets/main1.png';
import main2 from '../assets/main2.png';
import main3 from '../assets/main3.png';

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [latestRelease, setLatestRelease] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeSlide, setActiveSlide] = useState(0);
  const carouselRef = useRef(null);
  const carouselImages = [main1, main2, main3];
  const carouselInterval = useRef(null);

  // Fetch latest release from GitHub API
  useEffect(() => {
    fetch('https://api.github.com/repos/omeshapasan2/Flutter-React-Notes-App/releases/latest')
      .then(response => response.json())
      .then(data => {
        setLatestRelease(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching latest release:', error);
        setLoading(false);
      });
  }, []);

  // Carousel automatic scrolling
  useEffect(() => {
    startCarouselInterval();
    
    return () => {
      if (carouselInterval.current) {
        clearInterval(carouselInterval.current);
      }
    };
  }, []);

  const startCarouselInterval = () => {
    carouselInterval.current = setInterval(() => {
      setActiveSlide(prevSlide => (prevSlide + 1) % carouselImages.length);
    }, 5000);
  };

  const resetCarouselInterval = () => {
    if (carouselInterval.current) {
      clearInterval(carouselInterval.current);
      startCarouselInterval();
    }
  };

  const goToSlide = (index) => {
    setActiveSlide(index);
    resetCarouselInterval();
  };

  const goToPrevSlide = () => {
    setActiveSlide(prevSlide => 
      prevSlide === 0 ? carouselImages.length - 1 : prevSlide - 1
    );
    resetCarouselInterval();
  };

  const goToNextSlide = () => {
    setActiveSlide(prevSlide => 
      (prevSlide + 1) % carouselImages.length
    );
    resetCarouselInterval();
  };
  
  const features = [
    { icon: <FaLightbulb className="text-3xl text-amber-400" />, title: "Smart Notes", description: "Capture ideas quickly with intuitive note creation" },
    { icon: <FaSyncAlt className="text-3xl text-blue-400" />, title: "Cross-Device Sync", description: "Seamless sync between mobile and web versions" },
    { icon: <FaFolder className="text-3xl text-green-400" />, title: "Label Organization", description: "Organize notes with custom labels - Coming soon..." },
    { icon: <FaImage className="text-3xl text-purple-400" />, title: "Rich Media", description: "Embed images in your notes - Coming soon..." },
    { icon: <FaSearch className="text-3xl text-red-400" />, title: "Powerful Search", description: "Find notes instantly with smart search" },
    { icon: <FaLink className="text-3xl text-blue-500" />, title: "Web Links", description: "Store and organize links within notes - Coming soon..." },
    { icon: <FaCheckSquare className="text-3xl text-green-500" />, title: "Task Lists", description: "Create multi-level checklists - Coming soon..." },
    { icon: <FaShareAlt className="text-3xl text-amber-500" />, title: "Note Sharing", description: "Share notes or export as files - Coming soon..." }
  ];

  const sidebarItems = [
    { icon: <FaLightbulb className="text-xl" />, text: "Notes" },
    { icon: <Bell className="w-5 h-5" />, text: "Reminders" },
    { icon: <Tag className="w-5 h-5" />, text: "Labels" },
    { icon: <Archive className="w-5 h-5" />, text: "Archive" },
    { icon: <Trash className="w-5 h-5" />, text: "Trash" }
  ];

  // Navigation Bar Component
  const NavBar = () => {
    return (
      <nav className="bg-black border-b border-gray-800 shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-3">
            <div className="flex items-center">
              <FaLightbulb className="text-2xl text-amber-400 mr-2" />
              <span className="text-2xl font-bold text-white">HyperNotes</span>
            </div>
            
            <div className="flex items-center space-x-6">
              {/* Search Bar */}
              <div className="hidden md:flex items-center bg-gray-900 rounded-lg px-4 py-2">
                <FaSearch className="text-gray-400 mr-2" />
                <input
                  type="text"
                  placeholder="Search notes"
                  className="bg-transparent border-none focus:outline-none w-64 text-gray-300"
                />
              </div>
              
              {/* Mobile menu button */}
              <div className="md:hidden">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="text-gray-300 focus:outline-none"
                >
                  {isMenuOpen ? 
                    <FaTimes className="h-6 w-6" /> : 
                    <FaBars className="h-6 w-6" />
                  }
                </button>
              </div>
              
              {/* Desktop Navigation */}
              <div className="hidden md:flex space-x-4">
                <Link to="/register" className="transform transition-transform hover:-translate-y-1">
                  <button className="border border-amber-400 text-amber-400 px-4 py-2 rounded-md font-medium 
                                   hover:bg-amber-400 hover:text-black transition-colors focus:outline-none">
                    Sign Up
                  </button>
                </Link>
                <Link to="/login" className="transform transition-transform hover:-translate-y-1">
                  <button className="bg-amber-400 text-black px-6 py-2 rounded-md font-medium 
                                   hover:bg-amber-500 transition-colors focus:outline-none">
                    Log In
                  </button>
                </Link>
              </div>
            </div>
          </div>
          
          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-800">
              <div className="flex flex-col space-y-3 pb-4">
                <Link 
                  to="/" 
                  className="flex items-center py-2 px-4 hover:bg-gray-800 rounded-md text-gray-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <FaLightbulb className="mr-3 text-amber-400" />
                  <span>Home</span>
                </Link>
                
                {sidebarItems.slice(1).map((item, index) => (
                  <a 
                    key={index}
                    href="#" 
                    className="flex items-center py-2 px-4 hover:bg-gray-800 rounded-md text-gray-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="mr-3 text-gray-400">{item.icon}</span>
                    <span>{item.text}</span>
                  </a>
                ))}
                
                <div className="border-t border-gray-800 my-2"></div>
                
                <Link 
                  to="/login" 
                  className="flex items-center py-2 px-4 hover:bg-gray-800 rounded-md text-gray-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span>Log In</span>
                </Link>
                <Link 
                  to="/register" 
                  className="flex items-center py-2 px-4 hover:bg-gray-800 rounded-md text-gray-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span>Sign Up</span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>
    );
  };

  // Image Carousel Component
  const ImageCarousel = () => {
    const [activeSlide, setActiveSlide] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const carouselImages = [
      { url: main1, alt: "Slide 1" },
      { url: main2, alt: "Slide 2" },
      { url: main3, alt: "Slide 3" },
    ];
  
    // Auto-advance slides
    useEffect(() => {
      const interval = setInterval(() => {
        nextSlide();
      }, 3000);
      return () => clearInterval(interval);
    }, [activeSlide]);
  
    const nextSlide = () => {
      setIsAnimating(true);
      setActiveSlide((prev) => (prev === carouselImages.length - 1 ? 0 : prev + 1));
      setTimeout(() => setIsAnimating(false), 200);
    };
  
    const goToSlide = (index) => {
      setIsAnimating(true);
      setActiveSlide(index);
      setTimeout(() => setIsAnimating(false), 200);
    };
  
    return (
      <div className="relative w-full h-full">
        {/* Main carousel container with transparent background */}
        <div className="overflow-hidden relative rounded-lg bg-transparent h-full">
          {/* Sliding wrapper div */}
          <div 
            className="flex transition-transform duration-200 ease-in-out h-full" 
            style={{ transform: `translateX(-${activeSlide * 100}%)` }}
          >
            {carouselImages.map((image, index) => (
              <div key={index} className="w-full flex-shrink-0 h-full">
                <img 
                  src={image.url} 
                  alt={image.alt} 
                  className={`w-full h-96 md:h-128 lg:h-144 object-contain ${
                    isAnimating 
                      ? 'scale-95 opacity-80' 
                      : 'scale-100 opacity-100'
                  } transition-all duration-200 hover:brightness-110`}
                />
              </div>
            ))}
          </div>
        </div>
        
        {/* Carousel indicators */}
        <div className="flex justify-center mt-4 gap-2">
          {carouselImages.map((_, index) => (
            <button 
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                index === activeSlide 
                  ? 'bg-amber-400 w-4' 
                  : 'bg-gray-600 hover:bg-gray-400'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    );
  };

  // App Demo Section
  const AppDemoSection = () => {
    return (
      <div className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-6 text-white">Experience HyperNotes</h2>
          <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
            Available on web and Android. Create notes, make lists, and access them anywhere.
            Your notes sync automatically across all your devices.
          </p>
          
          <div className="bg-gradient-to-b from-gray-900 to-black rounded-lg shadow-lg p-8 max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-1/2">
                <ImageCarousel />
              </div>
              
              <div className="md:w-1/2">
                <h3 className="text-2xl font-bold text-white mb-4">Ready to get started?</h3>
                <p className="text-gray-400 mb-6">
                  Access your notes anytime, anywhere. Start for free and unlock the full potential of your ideas.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/register" className="transform transition-transform hover:-translate-y-1">
                    <button className="w-full bg-amber-400 text-black px-6 py-3 rounded-md font-medium 
                                  hover:bg-amber-500 transition-colors focus:outline-none">
                      Create Account
                    </button>
                  </Link>
                  
                  {!loading && latestRelease && latestRelease.assets && latestRelease.assets[0] && (
                    <a 
                      href={latestRelease.assets[0].browser_download_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-full transform transition-transform hover:-translate-y-1"
                    >
                      <button className="w-full flex items-center justify-center gap-2 border border-amber-400 
                                    text-amber-400 px-6 py-3 rounded-md font-medium 
                                    hover:bg-gray-800 transition-colors focus:outline-none">
                        <Download className="w-5 h-5" />
                        Android App {latestRelease.tag_name && `(${latestRelease.tag_name})`}
                      </button>
                    </a>
                  )}
                  
                  {loading && (
                    <div className="w-full flex items-center justify-center gap-2 border border-amber-400 
                                text-amber-400 px-6 py-3 rounded-md font-medium">
                      <span>Loading app version...</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Feature Demo
  const FeatureDemo = () => {
    return (
      <div className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6 text-white">Organize Your Thoughts</h2>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-amber-900 bg-opacity-30 p-2 rounded-full mr-4">
                      <FaLightbulb className="text-amber-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-white">Quick Capture</h3>
                      <p className="text-gray-400">Jot down ideas instantly before they fade away</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-blue-900 bg-opacity-30 p-2 rounded-full mr-4">
                      <FaCheckSquare className="text-blue-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-white">Task Management</h3>
                      <p className="text-gray-400">Convert notes to checklists and track progress</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-green-900 bg-opacity-30 p-2 rounded-full mr-4">
                      <FaSyncAlt className="text-green-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-white">Real-time Sync</h3>
                      <p className="text-gray-400">Access your notes from any device, always up-to-date</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-black border border-gray-800 shadow-xl rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <div className="flex-1">
                    <input 
                      type="text" 
                      placeholder="Take a note..."
                      className="w-full p-3 bg-gray-900 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-400 text-gray-300"
                    />
                  </div>
                  <div className="ml-4 flex space-x-2">
                    <button className="bg-gray-800 p-2 rounded-full hover:bg-gray-700">
                      <FaImage className="text-gray-400" />
                    </button>
                    <button className="bg-gray-800 p-2 rounded-full hover:bg-gray-700">
                      <FaCheckSquare className="text-gray-400" />
                    </button>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-900 p-4 rounded-lg border-l-4 border-amber-400">
                    <h3 className="font-medium mb-2 text-white">Project Ideas</h3>
                    <p className="text-sm text-gray-400">Build a note-taking app with cross-platform sync</p>
                  </div>
                  
                  <div className="bg-gray-900 p-4 rounded-lg border-l-4 border-blue-400">
                    <h3 className="font-medium mb-2 text-white">Shopping List</h3>
                    <ul className="text-sm text-gray-400">
                      <li className="flex items-center">
                        <input type="checkbox" className="mr-2" checked readOnly />
                        <span className="line-through">Milk</span>
                      </li>
                      <li className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        <span>Eggs</span>
                      </li>
                      <li className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        <span>Bread</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-gray-900 p-4 rounded-lg border-l-4 border-green-400">
                    <h3 className="font-medium mb-2 text-white">Meeting Notes</h3>
                    <p className="text-sm text-gray-400">Discuss app features with the team at 3PM</p>
                  </div>
                  
                  <div className="bg-gray-900 p-4 rounded-lg border-l-4 border-purple-400">
                    <h3 className="font-medium mb-2 text-white">Research Links</h3>
                    <div className="text-sm text-blue-400 underline">
                      <p>firebase.google.com</p>
                      <p>flutter.dev</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Roadmap Section 
  const RoadmapSection = () => {
    return (
      <div className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">Future Roadmap</h2>
          
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-amber-900"></div>
              
              <div className="space-y-12">
                <div className="relative">
                  <div className="absolute left-1/2 transform -translate-x-1/2 -mt-2">
                    <div className="h-4 w-4 rounded-full bg-amber-400"></div>
                  </div>
                  
                  <div className="ml-auto mr-12 md:mr-auto md:ml-12 md:pl-10 max-w-md p-6 bg-gray-900 border border-gray-800 rounded-lg shadow-md">
                    <h3 className="font-bold text-xl mb-2 text-white">Custom Labels & Folders</h3>
                    <p className="text-gray-400">Organize your notes with a flexible and customizable labeling system</p>
                  </div>
                </div>
                
                <div className="relative">
                  <div className="absolute left-1/2 transform -translate-x-1/2 -mt-2">
                    <div className="h-4 w-4 rounded-full bg-amber-400"></div>
                  </div>
                  
                  <div className="mr-auto ml-12 md:ml-auto md:mr-12 md:pr-10 max-w-md p-6 bg-gray-900 border border-gray-800 rounded-lg shadow-md">
                    <h3 className="font-bold text-xl mb-2 text-white">Rich Media Support</h3>
                    <p className="text-gray-400">Embed images, web links, and create visual connections between notes</p>
                  </div>
                </div>
                
                <div className="relative">
                  <div className="absolute left-1/2 transform -translate-x-1/2 -mt-2">
                    <div className="h-4 w-4 rounded-full bg-amber-400"></div>
                  </div>
                  
                  <div className="ml-auto mr-12 md:mr-auto md:ml-12 md:pl-10 max-w-md p-6 bg-gray-900 border border-gray-800 rounded-lg shadow-md">
                    <h3 className="font-bold text-xl mb-2 text-white">Advanced Sharing</h3>
                    <p className="text-gray-400">Share notes with other users and export in various formats</p>
                  </div>
                </div>
                
                <div className="relative">
                  <div className="absolute left-1/2 transform -translate-x-1/2 -mt-2">
                    <div className="h-4 w-4 rounded-full bg-amber-400"></div>
                  </div>
                  
                  <div className="mr-auto ml-12 md:ml-auto md:mr-12 md:pr-10 max-w-md p-6 bg-gray-900 border border-gray-800 rounded-lg shadow-md">
                    <h3 className="font-bold text-xl mb-2 text-white">Note Connections</h3>
                    <p className="text-gray-400">Create links between related notes and visualize connections</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-black min-h-screen text-gray-300">
      
      <NavBar />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-gray-900 to-black pt-16 pb-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="text-left">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6 text-white">
                Capture ideas 
                <span className="text-amber-400"> whenever</span>, 
                access them 
                <span className="text-amber-400"> wherever</span>
              </h1>
              
              <p className="text-xl text-gray-400 mb-8">
                HyperNotes helps you capture and organize ideas across all your devices. 
                Simple, powerful, and always in sync.
              </p>

              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link to="/register" className="transform transition-transform hover:-translate-y-1">
                  <button className="w-full bg-amber-400 text-black px-8 py-3 rounded-md font-semibold 
                                hover:bg-amber-500 transition-colors focus:outline-none focus:ring-2 
                                focus:ring-amber-300">
                    Get Started - It's Free
                  </button>
                </Link>
                
                <Link to="/login" className="transform transition-transform hover:-translate-y-1">
                  <button className="w-full flex items-center justify-center gap-2 border border-amber-400 
                                text-amber-400 px-8 py-3 rounded-md font-semibold 
                                hover:bg-gray-800 transition-colors">
                    Already have an account?
                  </button>
                </Link>
              </div>
              
              {!loading && latestRelease && latestRelease.assets && latestRelease.assets[0] && (
                <div className="mt-6">
                  <a 
                    href={latestRelease.assets[0].browser_download_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-gray-400 hover:text-amber-400"
                  >
                    <Download className="w-5 h-5 mr-2" />
                    <span>Download Android App {latestRelease.tag_name && `(${latestRelease.tag_name})`}</span>
                  </a>
                </div>
              )}
            </div>

            <div className="flex justify-center md:justify-end">
              <div className="bg-gradient-to-r from-gray-900 to-black p-4 rounded-lg">
                <ImageCarousel />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Demo Section */}
      <FeatureDemo />

      {/* Features Grid Section */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">
            Features That Boost Your Productivity
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="bg-gray-900 border border-gray-800 p-6 rounded-lg text-center 
                           transform transition-all hover:-translate-y-2 
                           hover:shadow-lg hover:shadow-amber-900/20"
              >
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2 text-white">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* App Demo Section with Download */}
      <AppDemoSection />
      
      {/* Roadmap Section */}
      <RoadmapSection />

      {/* Tech Stack Section */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Technology Stack</h2>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 max-w-4xl mx-auto">
            <div className="flex flex-col items-center transform transition-transform hover:scale-110">
              <div className="bg-blue-100 p-4 rounded-full mb-3">
                <SiFlutter className="text-4xl text-blue-600" />
              </div>
              <span className="font-medium">Flutter</span>
              <span className="text-sm text-gray-500">Mobile App</span>
            </div>
            <div className="flex flex-col items-center transform transition-transform hover:scale-110">
              <div className="bg-blue-50 p-4 rounded-full mb-3">
                <FaReact className="text-4xl text-blue-500" />
              </div>
              <span className="font-medium">React</span>
              <span className="text-sm text-gray-500">Web App</span>
            </div>
            <div className="flex flex-col items-center transform transition-transform hover:scale-110">
              <div className="bg-orange-50 p-4 rounded-full mb-3">
                <SiFirebase className="text-4xl text-orange-500" />
              </div>
              <span className="font-medium">Firebase</span>
              <span className="text-sm text-gray-500">Authentication</span>
            </div>
            <div className="flex flex-col items-center transform transition-transform hover:scale-110">
              <div className="bg-green-50 p-4 rounded-full mb-3">
                <SiFirebase className="text-4xl text-green-500" />
              </div>
              <span className="font-medium">Firestore</span>
              <span className="text-sm text-gray-500">Cloud Database</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <FaLightbulb className="text-2xl text-amber-400 mr-2" />
                <span className="text-2xl font-bold">HyperNotes</span>
              </div>
              <p className="text-gray-400">
                Your cross-platform note-taking solution. Capture ideas, make lists, and keep everything organized.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-amber-400 transition-colors">Home</a></li>
                <li><a href="#about" className="text-gray-400 hover:text-amber-400 transition-colors">About</a></li>
                <li><Link to="/login" className="text-gray-400 hover:text-amber-400 transition-colors">Login</Link></li>
                <li><Link to="/register" className="text-gray-400 hover:text-amber-400 transition-colors">Sign Up</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Download</h3>
              <p className="text-gray-400 mb-4">Get HyperNotes on your Android device</p>
              {!loading && latestRelease && latestRelease.assets && latestRelease.assets[0] && (
                <a 
                  href={latestRelease.assets[0].browser_download_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center bg-amber-500 text-white px-4 py-2 rounded-md hover:bg-amber-600 transition-colors"
                >
                  <Download className="w-5 h-5 mr-2" />
                  <span>Download App</span>
                </a>
              )}
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">&copy; {new Date().getFullYear()} HyperNotes. All rights reserved.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="https://github.com/omeshapasan2" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-amber-400">
                <FaGithub className="text-xl" />
              </a>
              <a href="https://www.linkedin.com/in/omesha-pasan-1503a5292" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-amber-400">
                <FaLinkedin className="text-xl" />
              </a>
            </div>
          </div>
        </div>
      </footer>
      
      {/* Add animations using Tailwind classes instead of inline styles */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          
          @keyframes slideIn {
            from { transform: translateX(50px); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
          }
          
          .animate-fadeIn {
            animation: fadeIn 1s ease-out forwards;
          }
          
          .animate-slideIn {
            animation: slideIn 1s ease-out forwards;
          }
        `}
      </style>
    </div>
  );
};

export default Home;