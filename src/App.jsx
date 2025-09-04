import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useMotionTemplate, animate, useTransform } from 'framer-motion';
import { Stars } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

const COLORS_TOP = ["#13FFAA", "#1E67C6", "#CE84CF", "#DD335C"];

// --- Data ---
const portfolioData = {
  name: "Shivam Surroach",
  headline: "Full-Stack Developer & AI Enthusiast",
  summary: "Passionate about building scalable, user-centric products that blend cutting-edge technologies. I thrive in collaborative environments, contributing to intelligent software solutions and continuously growing my skills in AI-powered applications and modern web technologies.",
  email: "shivamsurroach10@gmail.com",
  socials: {
    linkedin: "https://linkedin.com/in/shivam-surroach-b54259294/",
    github: "https://github.com/Chibom11",
    codolio: "https://codolio.com/profile/cHiBom11",
  },
  skills: [
    { name: "JavaScript", icon: "code" },
    { name: "React.js", icon: "atom" },
    { name: "Next.js", icon: "layers" },
    { name: "Node.js", icon: "code" },
    { name: "Python", icon: "code" },
    { name: "LangGraph", icon: "atom" },
    { name: "TailwindCSS", icon: "layers" },
    { name: "SQL", icon: "database" },
    { name: "MongoDB", icon: "database" },
  ],
  projects: [
    {
      title: "AITUT",
      description: "A full-stack AI Tutor application featuring a dynamic Next.js frontend and a high-performance FastAPI backend. The AI agent uses LangGraph for complex workflow orchestration.",
      technologies: ["Next.js", "LangGraph", "FastAPI", "Convex", "Clerk"],
      link: "https://github.com/Chibom11/AITUT",
    },
    {
      title: "The Wild Oasis",
      description: "A secure full-stack Hotel Booking platform with JWT-based authentication, cookie sessions, and secure payment integration with Razorpay.",
      technologies: ["React.js", "Express.js", "MongoDB", "JWT", "TailwindCSS"],
      link: "https://github.com/Chibom11/WILD-OASIS",
    },
    {
      title: "Vapor",
      description: "A real-time messaging application with room-based isolation using native WebSockets for fast, private communication and a unique retro-themed UI.",
      technologies: ["React.js", "Node.js", "Websockets", "TailwindCSS"],
      link: "https://github.com/Chibom11/Vapor",
    },
  ],
};

// --- Helper Components ---
const Icon = ({ name, className }) => {
    const icons = {
        'linkedin': <svg className={className} stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>,
        'github': <svg className={className} stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>,
        'trending-up': <svg className={className} stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>,
        'arrow-right': <svg className={className} stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>,
        'arrow-up': <svg className={className} stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg"><line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline></svg>,
        'code': <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>,
        'atom': <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="1" /><path d="M20.2 20.2c2.04-2.03.02-7.36-4.5-11.9-4.54-4.52-9.87-6.54-11.9-4.5-2.04 2.03-.02 7.36 4.5 11.9 4.54 4.52 9.87 6.54 11.9 4.5z" /><path d="M3.8 3.8c-2.04 2.03-.02 7.36 4.5 11.9 4.54 4.52 9.87 6.54 11.9 4.5 2.04-2.03.02-7.36-4.5-11.9C11.16-.72 5.83-2.74 3.8 3.8z" /></svg>,
        'layers': <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" /></svg>,
        'database': <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" /><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" /></svg>,
    };
    return icons[name] || <div />;
};

const AnimatedSection = ({ id, children, className }) => {
    return (
      <motion.section
        id={id}
        className={className}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
      >
        {children}
      </motion.section>
    );
};

const NavLink = ({ href, children, onMouseEnter, onMouseLeave }) => (
    <a href={href} className="relative text-slate-300 hover:text-cyan-300 transition-colors group" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
        {children}
        <span className="absolute bottom-[-4px] left-0 w-0 h-0.5 bg-cyan-300 transition-all duration-300 group-hover:w-full"></span>
    </a>
);

// --- Page Sections ---
const Header = ({ onLinkHover, onLinkLeave }) => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-slate-900/80 backdrop-blur-sm shadow-lg' : 'bg-transparent'}`}>
            <div className="container mx-auto px-6 py-4 flex justify-end items-center">
                <nav className="hidden md:flex space-x-8">
                    <NavLink href="#skills" onMouseEnter={onLinkHover} onMouseLeave={onLinkLeave}>Skills</NavLink>
                    <NavLink href="#projects" onMouseEnter={onLinkHover} onMouseLeave={onLinkLeave}>Projects</NavLink>
                    <NavLink href="#contact" onMouseEnter={onLinkHover} onMouseLeave={onLinkLeave}>Contact</NavLink>
                </nav>
            </div>
        </header>
    );
};

const Hero = ({ onLinkHover, onLinkLeave }) => {
  const color = useMotionValue(COLORS_TOP[0]);
  const boxShadow = useMotionTemplate`0px 0px 32px ${color}`;
  
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    x.set((mouseX / width) - 0.5);
    y.set((mouseY / height) - 0.5);
  };
  
  const rotateX = useTransform(y, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(x, [-0.5, 0.5], ["-10deg", "10deg"]);

  return (
    <section className="relative grid min-h-screen place-content-center overflow-hidden px-4 py-24 text-slate-200">
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 items-center gap-12 max-w-7xl mx-auto">
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <motion.p 
                className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent mb-4 tracking-wider drop-shadow-[0_0_4px_rgba(0,255,255,0.5)] transition-all duration-300 cursor-pointer"
                whileHover={{
                    scale: 1.05,
                    dropShadow: "0 0 15px rgba(0, 255, 255, 0.8)"
                }}
            >
                {portfolioData.name}
            </motion.p>
            <h1 className="max-w-4xl bg-gradient-to-br from-white to-slate-400 bg-clip-text text-4xl font-extrabold leading-tight text-transparent sm:text-5xl sm:leading-tight md:text-7xl md:leading-tight">
                {portfolioData.headline}
            </h1>
            <p className="my-8 max-w-2xl text-lg leading-relaxed text-slate-400">
                {portfolioData.summary}
            </p>
            <div className="flex items-center gap-4">
                <a href={portfolioData.socials.github} target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-cyan-400 transition-transform transform hover:scale-110" onMouseEnter={onLinkHover} onMouseLeave={onLinkLeave}>
                    <Icon name="github" className="w-8 h-8" />
                </a>
                <a href={portfolioData.socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-cyan-400 transition-transform transform hover:scale-110" onMouseEnter={onLinkHover} onMouseLeave={onLinkLeave}>
                    <Icon name="linkedin" className="w-8 h-8" />
                </a>
                <a href={portfolioData.socials.codolio} target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-cyan-400 transition-transform transform hover:scale-110" onMouseEnter={onLinkHover} onMouseLeave={onLinkLeave}>
                    <Icon name="trending-up" className="w-8 h-8" />
                </a>
            </div>
             <a href="#contact" onMouseEnter={onLinkHover} onMouseLeave={onLinkLeave}>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="group relative w-fit mt-8 flex items-center gap-1.5 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 px-6 py-3 text-white font-semibold transition-shadow hover:shadow-lg hover:shadow-cyan-500/30"
                >
                    Say Hello
                    <Icon name="arrow-right" className="transition-transform group-hover:rotate-45 w-5 h-5" />
                </motion.button>
            </a>
        </div>
        <motion.div 
            style={{ 
                boxShadow,
                transformStyle: "preserve-3d"
            }} 
            animate={{
                boxShadow: [
                    "0px 0px 32px #13FFAA",
                    "0px 0px 32px #1E67C6",
                    "0px 0px 32px #CE84CF",
                    "0px 0px 32px #DD335C",
                    "0px 0px 32px #13FFAA",
                ]
            }}
            transition={{
                duration: 10,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut"
            }}
            className="relative w-72 h-72 md:w-96 md:h-96 rounded-full flex items-center justify-center place-self-center"
        >
             <img src="/Photo.png" alt="Shivam Surroach" className="z-10 w-full h-full object-cover rounded-full" style={{ transform: "translateZ(50px)" }} onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/400x400/020617/FFFFFF?text=S+S'; }} />
        </motion.div>
      </div>
    </section>
  );
};

const Skills = ({ onLinkHover, onLinkLeave }) => (
  <AnimatedSection id="skills" className="py-20 bg-slate-900/50 backdrop-blur-sm border-y border-slate-800">
    <div className="container mx-auto px-6 text-center">
      <h2 className="text-4xl font-bold text-cyan-300 mb-2 transition-all duration-300 hover:text-white hover:drop-shadow-[0_0_15px_rgba(0,255,255,0.8)]">My Tech Stack</h2>
      <p className="text-lg text-slate-300 mb-12">Technologies I'm proficient with and love to use.</p>
      <div className="flex flex-wrap justify-center gap-4 md:gap-6">
        {portfolioData.skills.map((skill, index) => (
          <div key={index} className="group relative flex items-center space-x-3 bg-slate-700/50 rounded-lg px-5 py-3 border border-slate-600 hover:border-transparent transition-all cursor-pointer transform hover:-translate-y-1" onMouseEnter={onLinkHover} onMouseLeave={onLinkLeave}>
             <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
             <div className="relative z-10 flex items-center space-x-3">
                <Icon name={skill.icon} className="w-7 h-7 text-cyan-300" />
                <span className="text-lg font-medium text-slate-200">{skill.name}</span>
             </div>
          </div>
        ))}
      </div>
    </div>
  </AnimatedSection>
);

const ProjectCard = ({ project, onLinkHover, onLinkLeave }) => {
    const ref = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const handleMouseMove = (e) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        
        x.set((mouseX / width) - 0.5);
        y.set((mouseY / height) - 0.5);
    };

    const rotateX = useTransform(y, [-0.5, 0.5], ["7deg", "-7deg"]);
    const rotateY = useTransform(x, [-0.5, 0.5], ["-7deg", "7deg"]);

    return (
        <motion.div 
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => { x.set(0); y.set(0); }}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="group relative bg-slate-800/50 backdrop-blur-sm rounded-lg overflow-hidden border border-slate-700 shadow-lg hover:shadow-cyan-500/20 transition-shadow flex flex-col"
        >
            <div className="absolute -inset-0.5 rounded-lg bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-75 transition-opacity duration-300 blur"></div>
            <div className="relative p-6 flex-grow flex flex-col bg-slate-800/80 rounded-lg h-full" style={{ transform: "translateZ(20px)" }}>
                <h3 className="text-2xl font-bold text-cyan-300 mb-3 transition-all duration-300 group-hover:text-white group-hover:drop-shadow-[0_0_8px_rgba(0,255,255,0.7)]">{project.title}</h3>
                <p className="text-slate-400 mb-4 flex-grow">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map(tech => (
                        <span key={tech} className="bg-cyan-900/50 text-cyan-300 text-xs font-semibold px-2.5 py-1 rounded-full">{tech}</span>
                    ))}
                </div>
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="mt-auto self-start text-cyan-300 font-semibold flex items-center gap-2 group-hover:text-white transition-colors" onMouseEnter={onLinkHover} onMouseLeave={onLinkLeave}>
                    View Project <Icon name="arrow-right" className="transition-transform group-hover:translate-x-1 w-5 h-5" />
                </a>
            </div>
        </motion.div>
    );
};

const Projects = ({ onLinkHover, onLinkLeave }) => (
  <AnimatedSection id="projects" className="py-20 bg-slate-900/50 backdrop-blur-sm">
    <div className="container mx-auto px-6">
      <h2 className="text-4xl font-bold text-cyan-300 text-center mb-12 transition-all duration-300 hover:text-white hover:drop-shadow-[0_0_15px_rgba(0,255,255,0.8)]">Featured Projects</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {portfolioData.projects.map((project, index) => (
          <ProjectCard key={index} project={project} onLinkHover={onLinkHover} onMouseLeave={onLinkLeave} />
        ))}
      </div>
    </div>
  </AnimatedSection>
);

const Contact = ({ onLinkHover, onLinkLeave }) => (
  <AnimatedSection id="contact" className="py-20 bg-slate-900/50 backdrop-blur-sm border-y border-slate-800">
    <div className="container mx-auto px-6 text-center">
      <h2 className="text-4xl font-bold text-cyan-300 mb-4 transition-all duration-300 hover:text-white hover:drop-shadow-[0_0_15px_rgba(0,255,255,0.8)]">Get In Touch</h2>
      <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
        I'm currently open to new opportunities and collaborations. Feel free to reach out if you have a project in mind or just want to connect!
      </p>
      <a href={`mailto:${portfolioData.email}`} onMouseEnter={onLinkHover} onMouseLeave={onLinkLeave}>
          <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative w-fit mx-auto flex items-center gap-1.5 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 px-6 py-3 text-white font-semibold transition-shadow hover:shadow-lg hover:shadow-cyan-500/30"
          >
              {portfolioData.email}
          </motion.button>
      </a>
    </div>
  </AnimatedSection>
);

const Footer = ({ onLinkHover, onLinkLeave }) => (
  <footer className="bg-slate-900/50 backdrop-blur-sm py-8">
    <div className="container mx-auto px-6 text-center text-slate-400">
      <div className="flex justify-center items-center space-x-6 mb-4">
        <a href={portfolioData.socials.github} target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors" onMouseEnter={onLinkHover} onMouseLeave={onLinkLeave}><Icon name="github" className="w-6 h-6" /></a>
        <a href={portfolioData.socials.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors" onMouseEnter={onLinkHover} onMouseLeave={onLinkLeave}><Icon name="linkedin" className="w-6 h-6" /></a>
        <a href={portfolioData.socials.codolio} target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors" onMouseEnter={onLinkHover} onMouseLeave={onLinkLeave}><Icon name="trending-up" className="w-6 h-6" /></a>
      </div>
      <p>&copy; {new Date().getFullYear()} {portfolioData.name}. All Rights Reserved.</p>
    </div>
  </footer>
);

const CustomCursor = ({ cursorVariant }) => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const mouseMove = e => setMousePosition({ x: e.clientX, y: e.clientY });
        window.addEventListener("mousemove", mouseMove);
        return () => window.removeEventListener("mousemove", mouseMove);
    }, []);
    
    const variants = {
        default: {
            x: mousePosition.x - 8,
            y: mousePosition.y - 8,
            height: 16,
            width: 16,
            backgroundColor: "rgba(0, 255, 255, 0.7)",
            mixBlendMode: "difference"
        },
        text: {
            x: mousePosition.x - 16,
            y: mousePosition.y - 16,
            height: 32,
            width: 32,
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            mixBlendMode: "difference"
        }
    }

    return (
        <motion.div 
            className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999]"
            variants={variants}
            animate={cursorVariant}
            transition={{ type: "spring", stiffness: 1000, damping: 30 }}
        />
    )
}

const ScrollToTopButton = ({ onLinkHover, onLinkLeave }) => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        if (window.pageYOffset > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    useEffect(() => {
        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    return (
        <motion.button
            onClick={scrollToTop}
            onMouseEnter={onLinkHover}
            onMouseLeave={onLinkLeave}
            className={`fixed bottom-8 right-8 z-50 p-3 rounded-full bg-cyan-500/80 text-white shadow-lg shadow-cyan-500/30 backdrop-blur-sm transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
            whileHover={{ scale: 1.1, y: -5 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: isVisible ? 1 : 0 }}
        >
            <Icon name="arrow-up" className="w-6 h-6" />
        </motion.button>
    );
};


// --- Main App Component ---
const AppBody = ({ onLinkHover, onLinkLeave }) => {
  return (
    <>
      <Header onLinkHover={onLinkHover} onLinkLeave={onLinkLeave} />
      <main>
        <Hero onLinkHover={onLinkHover} onLinkLeave={onLinkLeave} />
        <div className="relative z-10">
          <Skills onLinkHover={onLinkHover} onLinkLeave={onLinkLeave} />
          <Projects onLinkHover={onLinkHover} onLinkLeave={onLinkLeave} />
          <Contact onLinkHover={onLinkHover} onLinkLeave={onLinkLeave} />
        </div>
      </main>
      <Footer onLinkHover={onLinkHover} onLinkLeave={onLinkLeave} />
    </>
  )
}

export default function App() {
  const color = useMotionValue(COLORS_TOP[0]);
  const [cursorVariant, setCursorVariant] = useState("default");

  const textEnter = () => setCursorVariant("text");
  const textLeave = () => setCursorVariant("default");

  useEffect(() => {
    animate(color, COLORS_TOP, {
      ease: "easeInOut",
      duration: 10,
      repeat: Infinity,
      repeatType: "mirror",
    });
  }, []);

  const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% -20%, #020617 40%, ${color})`;

  return (
    <motion.div
      style={{ backgroundImage }}
      className="bg-slate-900 text-slate-200 font-sans leading-normal tracking-tight cursor-none"
    >
      <CustomCursor cursorVariant={cursorVariant} />
      <div className="absolute inset-0 z-0">
        <Canvas>
          <Stars radius={50} count={2500} factor={4} fade speed={2} />
        </Canvas>
      </div>
      <div className="relative z-10 overflow-x-hidden">
        <AppBody onLinkHover={textEnter} onLinkLeave={textLeave} />
      </div>
      <ScrollToTopButton onLinkHover={textEnter} onLinkLeave={textLeave} />
    </motion.div>
  );
}





