import { useState, useRef, useEffect } from 'react'
import './App.css'
import hermanasLogo from './assets/HERMANAS-3.png'
import heroVideo from './assets/new video.mov'
import overlapSvg from './assets/klHSN01.svg'
import aaceSvg from './assets/Cost, Schedule & Risk Integration/aace.svg'
import costEstimateSvg from './assets/Cost, Schedule & Risk Integration/cost esimate.svg'
import criticalPathSvg from './assets/Cost, Schedule & Risk Integration/critical path.svg'
import commissioningSvg from './assets/Cost, Schedule & Risk Integration/commisoing.svg'
import escalationSvg from './assets/Cost, Schedule & Risk Integration/escalation.svg'

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'team' | 'contact' | 'commissioning' | 'technical-review' | 'bridget-allen' | 'sarah-mitchell' | 'brad-mitchell' | 'flavio-grilli' | 'pamela-contreras' | 'deb-wakefield' | 'joey-meiers'>('home')
  const [isScrolled, setIsScrolled] = useState(false)
  const [isServicesOpen, setIsServicesOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const executionScrollRef = useRef<HTMLDivElement>(null)
  const whatWeDevelopRef = useRef<HTMLDivElement>(null)
  const operationalReadinessRef = useRef<HTMLDivElement>(null)
  const [whatWeDevelopImageIndex, setWhatWeDevelopImageIndex] = useState(0)
  const [operationalReadinessImageIndex, setOperationalReadinessImageIndex] = useState(0)
  const [isSpanish, setIsSpanish] = useState(false)
  const [hasMessage, setHasMessage] = useState(false)
  
  // Refs for scroll animations on home page
  const overlapBoxRef = useRef<HTMLDivElement>(null)
  const servicesSectionRef = useRef<HTMLDivElement>(null)
  const governanceSectionRef = useRef<HTMLDivElement>(null)
  const executionSectionRef = useRef<HTMLDivElement>(null)
  const integrationSectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [currentPage])

  // Scroll animations for home page sections
  useEffect(() => {
    if (currentPage !== 'home') return

    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in')
        }
      })
    }, observerOptions)

    const sections = [
      overlapBoxRef.current,
      servicesSectionRef.current,
      governanceSectionRef.current,
      executionSectionRef.current,
      integrationSectionRef.current
    ].filter(Boolean) as Element[]

    sections.forEach((section) => {
      if (section) {
        observer.observe(section)
      }
    })

    return () => {
      sections.forEach((section) => {
        if (section) {
          observer.unobserve(section)
        }
      })
    }
  }, [currentPage])

  useEffect(() => {
    if (currentPage !== 'technical-review' || !whatWeDevelopRef.current) {
      return
    }

    const handleScroll = () => {
      if (!whatWeDevelopRef.current) return

      const rect = whatWeDevelopRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight
      
      // Check if section is in viewport
      if (rect.top < windowHeight && rect.bottom > 0) {
        // Calculate scroll progress through the section
        // When section top is at viewport top, progress = 0
        // When section bottom is at viewport top, progress = 1
        const sectionHeight = rect.height
        const scrollProgress = Math.max(0, Math.min(1, (windowHeight - rect.top) / (windowHeight + sectionHeight)))
        
        // Map scroll progress to image index (0-6 for 7 images)
        const imageIndex = Math.floor(scrollProgress * 7)
        const clampedIndex = Math.min(Math.max(imageIndex, 0), 6)
        
        setWhatWeDevelopImageIndex(clampedIndex)
      }
    }

    // Throttle scroll events
    let ticking = false
    const throttledHandleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', throttledHandleScroll, { passive: true })
    handleScroll() // Initial check
    
    return () => {
      window.removeEventListener('scroll', throttledHandleScroll)
    }
  }, [currentPage])

  useEffect(() => {
    if (currentPage !== 'commissioning' || !operationalReadinessRef.current) {
      return
    }

    const handleScroll = () => {
      if (!operationalReadinessRef.current) return

      const rect = operationalReadinessRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight
      
      // Check if section is in viewport
      if (rect.top < windowHeight && rect.bottom > 0) {
        // Calculate scroll progress through the section
        const sectionHeight = rect.height
        const scrollProgress = Math.max(0, Math.min(1, (windowHeight - rect.top) / (windowHeight + sectionHeight)))
        
        // Map scroll progress to image index (0-4 for 5 images)
        const imageIndex = Math.floor(scrollProgress * 5)
        const clampedIndex = Math.min(Math.max(imageIndex, 0), 4)
        
        setOperationalReadinessImageIndex(clampedIndex)
      }
    }

    // Throttle scroll events
    let ticking = false
    const throttledHandleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', throttledHandleScroll, { passive: true })
    handleScroll() // Initial check
    
    return () => {
      window.removeEventListener('scroll', throttledHandleScroll)
    }
  }, [currentPage])


  const scrollExecution = (direction: 'left' | 'right') => {
    if (executionScrollRef.current) {
      const container = executionScrollRef.current
      const boxWidth = container.querySelector('.execution-box')?.getBoundingClientRect().width || 300
      const gap = 32 // 2rem gap
      const scrollAmount = boxWidth + gap
      const currentScroll = container.scrollLeft
      const newScroll = direction === 'left' 
        ? currentScroll - scrollAmount 
        : currentScroll + scrollAmount
      container.scrollTo({
        left: newScroll,
        behavior: 'smooth'
      })
    }
  }

  return (
    <div className="app">
      <nav className={`nav ${isScrolled || isServicesOpen || currentPage === 'team' || currentPage === 'commissioning' || currentPage === 'technical-review' || currentPage === 'contact' || currentPage === 'bridget-allen' || currentPage === 'sarah-mitchell' || currentPage === 'brad-mitchell' || currentPage === 'flavio-grilli' || currentPage === 'pamela-contreras' || currentPage === 'deb-wakefield' || currentPage === 'joey-meiers' ? 'scrolled' : ''}`}>
        <div className="nav-line"></div>
        <div className="nav-content">
          <div className="nav-logo">HERMANAS</div>
          <button 
            className={`hamburger-menu ${isMobileMenuOpen ? 'menu-open' : ''}`}
            onClick={(e) => { 
              e.preventDefault(); 
              setIsMobileMenuOpen(!isMobileMenuOpen);
            }}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <svg width="24" height="24" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line x1="200" y1="56" x2="56" y2="200" stroke="currentColor" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round"/>
                <line x1="200" y1="200" x2="56" y2="56" stroke="currentColor" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            ) : (
              <>
                <span></span>
                <span></span>
                <span></span>
              </>
            )}
          </button>
          <div className={`nav-links nav-links-desktop ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
            <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('home'); setIsServicesOpen(false); setIsMobileMenuOpen(false); }}>Home</a>
            <a href="#" onClick={(e) => { e.preventDefault(); setIsServicesOpen(!isServicesOpen); setIsMobileMenuOpen(false); }}>Services</a>
          </div>
          <div className={`nav-links nav-links-mobile ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
            <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('home'); setIsServicesOpen(false); setIsMobileMenuOpen(false); }}>Home</a>
            <a href="#" onClick={(e) => { e.preventDefault(); setIsServicesOpen(!isServicesOpen); setIsMobileMenuOpen(false); }}>Services</a>
            <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('contact'); setIsServicesOpen(false); setIsMobileMenuOpen(false); }}>Contact Us</a>
          </div>
          <button className="nav-contact-btn" onClick={(e) => { e.preventDefault(); setCurrentPage('contact'); setIsServicesOpen(false); }}>Contact Us</button>
        </div>
      </nav>
      {isServicesOpen && (
        <div className="services-dropdown">
          <div className="services-box services-box-1">
            <a href="#" className="service-link" onClick={(e) => { e.preventDefault(); setIsServicesOpen(false); setCurrentPage('technical-review'); }}>Technical Review</a>
          </div>
          <div className="services-box services-box-2">
            <a href="#" className="service-link" onClick={(e) => { e.preventDefault(); setIsServicesOpen(false); setCurrentPage('commissioning'); }}>Commissioning / Startup</a>
          </div>
        </div>
      )}
      {currentPage === 'home' ? (
        <>
          <div className="hero-video-container">
            <video 
              className="hero-video" 
              autoPlay 
              loop
              muted 
              playsInline
            >
              <source src={heroVideo} type="video/quicktime" />
            </video>
          </div>
          <div className="hero-text-gradient">
            <h1 className="hero-text">Independent Technical Advisory, Study Delivery & Execution Excellence</h1>
          </div>
          <div className="overlap-box" ref={overlapBoxRef}>
            <img src={overlapSvg} alt="" className="overlap-svg" />
            <div className="overlap-box-content">
              <p className="overlap-box-text">
                Hermanas Engineering Consultants provides independent, technically rigorous engineering and project advisory services across the full project lifecycle — from early-stage studies and process design through to execution planning, commissioning, and operational readiness.
              </p>
              <p className="overlap-box-text">
                We work directly with Owner and project teams to develop deliverables, processes, and frameworks that underpin confident investment decisions and repeatable project success.
              </p>
            </div>
          </div>
          <section className="white-section">
            <div className="services-section" ref={servicesSectionRef}>
              <h2 className="services-title">Technical Studies & Process Design Development</h2>
              <div className="services-grid">
                <div className="service-box">
                  <img src="https://images.unsplash.com/photo-1571223641822-b82408a0e705?q=80&w=3404&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Design" className="service-box-img" />
                  <div className="service-box-text">
                    <ul className="service-box-list">
                      <li>Basis of Design / design criteria</li>
                    </ul>
                  </div>
                </div>
                <div className="service-box">
                  <img src="https://images.unsplash.com/photo-1444136393836-70a14068c669?q=80&w=3482&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Flow Diagram" className="service-box-img" />
                  <div className="service-box-text">
                    <ul className="service-box-list">
                      <li>BFDs, PFDs, flowsheet development/review/optimisation</li>
                    </ul>
                  </div>
                </div>
                <div className="service-box">
                  <img src="https://images.unsplash.com/photo-1580420232349-3eefa50d2423?q=80&w=1316&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Gantt Chart" className="service-box-img" />
                  <div className="service-box-text">
                    <ul className="service-box-list">
                      <li>Study work plans, deliverable registers, and technical frameworks</li>
                    </ul>
                  </div>
                </div>
                <div className="service-box">
                  <img src="https://images.unsplash.com/photo-1580420232349-3eefa50d2423?q=80&w=1316&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Mass & Energy Balance" className="service-box-img" />
                  <div className="service-box-text">
                    <ul className="service-box-list">
                      <li>Mass & energy balances</li>
                    </ul>
                  </div>
                </div>
                <div className="service-box">
                  <img src="https://images.unsplash.com/photo-1614562556758-ae0248358127?q=80&w=1335&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Risk Assessment" className="service-box-img" />
                  <div className="service-box-text">
                    <ul className="service-box-list">
                      <li>Operability, maintainability, ramp-up risk identification</li>
                    </ul>
                  </div>
                </div>
                <div className="service-box">
                  <img src="https://plus.unsplash.com/premium_photo-1682148949197-d99c9e0fe3b6?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Equipment Sizing" className="service-box-img" />
                  <div className="service-box-text">
                    <ul className="service-box-list">
                      <li>High-level sizing / assumption definition</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="governance-section" ref={governanceSectionRef}>
              <h2 className="governance-title">Study Management & Governance (AACE / AusIMM aligned)</h2>
              <div className="governance-list">
                <div className="governance-item">
                  <div className="governance-number">01</div>
                  <div className="governance-content">
                    <h3 className="governance-item-title">Study management frameworks and playbooks</h3>
                  </div>
                </div>
                <div className="governance-divider"></div>
                <div className="governance-item">
                  <div className="governance-number">02</div>
                  <div className="governance-content">
                    <h3 className="governance-item-title">Study class definition and scope alignment</h3>
                  </div>
                </div>
                <div className="governance-divider"></div>
                <div className="governance-item">
                  <div className="governance-number">03</div>
                  <div className="governance-content">
                    <h3 className="governance-item-title">Work plans, schedules, RACI</h3>
                  </div>
                </div>
                <div className="governance-divider"></div>
                <div className="governance-item">
                  <div className="governance-number">04</div>
                  <div className="governance-content">
                    <h3 className="governance-item-title">Deliverable maturity & assurance</h3>
                  </div>
                </div>
                <div className="governance-divider"></div>
                <div className="governance-item">
                  <div className="governance-number">05</div>
                  <div className="governance-content">
                    <h3 className="governance-item-title">Technical governance, gate reviews, approvals</h3>
                  </div>
                </div>
                <div className="governance-divider"></div>
                <div className="governance-item">
                  <div className="governance-number">06</div>
                  <div className="governance-content">
                    <h3 className="governance-item-title">Risk & opportunity frameworks</h3>
                  </div>
                </div>
                <div className="governance-divider"></div>
                <div className="governance-item">
                  <div className="governance-number">07</div>
                  <div className="governance-content">
                    <h3 className="governance-item-title">Cost accuracy, contingency, escalation frameworks</h3>
                  </div>
                </div>
              </div>
            </div>
            <div className="execution-section" ref={executionSectionRef}>
              <div className="execution-header">
                <h2 className="execution-title">Project Execution & Contracting Strategies</h2>
                <div className="execution-nav-controls">
                  <button 
                    className="execution-scroll-btn execution-scroll-left"
                    onClick={() => scrollExecution('left')}
                    aria-label="Scroll left"
                  >
                    ‹
                  </button>
                  <button 
                    className="execution-scroll-btn execution-scroll-right"
                    onClick={() => scrollExecution('right')}
                    aria-label="Scroll right"
                  >
                    ›
        </button>
                </div>
              </div>
              <div className="execution-boxes" ref={executionScrollRef}>
                <div className="execution-box-wrapper">
                  <div className="execution-box">
                    <img src="https://images.unsplash.com/photo-1639568472184-4a321a40c7ad?q=80&w=1335&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Contract Packaging" className="execution-box-img" />
                  </div>
                  <div className="execution-box-text">
                    <ul className="execution-box-list">
                      <li>Contracting/packaging strategies</li>
                    </ul>
                  </div>
                </div>
                <div className="execution-box-wrapper">
                  <div className="execution-box">
                    <img src="https://images.unsplash.com/photo-1719411326655-1379c6f5fada?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Execution Model" className="execution-box-img" />
                  </div>
                  <div className="execution-box-text">
                    <ul className="execution-box-list">
                      <li>Execution model evaluations (EPC, EPCM, EPCM+CM, modular, BOO/PPA, hybrids)</li>
                    </ul>
                  </div>
                </div>
                <div className="execution-box-wrapper">
                  <div className="execution-box">
                    <img src="https://plus.unsplash.com/premium_photo-1667925021572-b6b75342088f?q=80&w=2275&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Integration" className="execution-box-img" />
                  </div>
                  <div className="execution-box-text">
                    <ul className="execution-box-list">
                      <li>Integration planning across contractors/packages</li>
                    </ul>
                  </div>
                </div>
                <div className="execution-box-wrapper">
                  <div className="execution-box">
                    <img src="https://images.unsplash.com/photo-1516199423456-1f1e91b06f25?q=80&w=2649&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Project Execution Plan" className="execution-box-img" />
                  </div>
                  <div className="execution-box-text">
                    <ul className="execution-box-list">
                      <li>Project Execution Plans (PEPs)</li>
                    </ul>
                  </div>
                </div>
                <div className="execution-box-wrapper">
                  <div className="execution-box">
                    <img src="https://images.unsplash.com/photo-1621015098924-4725bbc6a6a2?q=80&w=1335&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Project Execution Strategies" className="execution-box-img" />
                  </div>
                  <div className="execution-box-text">
                    <ul className="execution-box-list">
                      <li>Project Execution Strategies</li>
                    </ul>
                  </div>
                </div>
                <div className="execution-box-wrapper">
                  <div className="execution-box">
                    <img src="https://images.unsplash.com/photo-1647406260917-c28f85efcd26?q=80&w=3433&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Risk Allocation" className="execution-box-img" />
                  </div>
                  <div className="execution-box-text">
                    <ul className="execution-box-list">
                      <li>Risk allocation / commercial strategy support</li>
                    </ul>
                  </div>
                </div>
                <div className="execution-box-wrapper">
                  <div className="execution-box">
                    <img src="https://images.unsplash.com/photo-1560872236-f1232b00263f?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Scope" className="execution-box-img" />
                  </div>
                  <div className="execution-box-text">
                    <ul className="execution-box-list">
                      <li>Scope definition, battery limits, interface registers</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="integration-section" ref={integrationSectionRef}>
              <div className="integration-header">
                <h2 className="integration-title">Cost, Schedule & Risk Integration</h2>
              </div>
              <div className="dot-points-section">
                <div className="dot-points-box">
                  <div className="dot-point-card">
                    <img src={aaceSvg} alt="AACE" className="dot-point-icon" />
                    <h3 className="dot-point-title">AACE Class 5 → Class 3 estimating frameworks</h3>
                  </div>
                  <div className="dot-point-card">
                    <img src={costEstimateSvg} alt="Cost Estimate" className="dot-point-icon" />
                    <h3 className="dot-point-title">Cost basis and estimate maturity</h3>
                  </div>
                  <div className="dot-point-card">
                    <img src={criticalPathSvg} alt="Critical Path" className="dot-point-icon" />
                    <h3 className="dot-point-title">Schedule development + critical path</h3>
                  </div>
                  <div className="dot-point-card">
                    <img src={commissioningSvg} alt="Commissioning" className="dot-point-icon" />
                    <h3 className="dot-point-title">Technical & commissioning risk quantification</h3>
                  </div>
                  <div className="dot-point-card">
                    <img src={escalationSvg} alt="Escalation" className="dot-point-icon" />
                    <h3 className="dot-point-title">Contingency and escalation methodology</h3>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      ) : currentPage === 'team' ? (
        <div className="team-page">
          <div className="team-hero-section">
            <h1 className="team-main-title">Our Team</h1>
            <p className="team-description">
              With years of experience, our team members provide a range of skill sets so you can rest assured we are ready to tackle any problem.
            </p>
          </div>
          <div className="team-banner-placeholder">
            <img src="https://learn.miningleaders.com.au/wp-content/uploads/2019/02/mlg-brochure-2-460144477-small-rgb.jpg" alt="Team Banner" className="team-banner-img" />
          </div>
          <div className="board-section">
            <h2 className="board-title">Meet our board</h2>
            <div className="board-grid">
              <div className="board-member-wrapper" onClick={() => setCurrentPage('bridget-allen')}>
                <div className="board-member-card">
                  <img src="https://ui-avatars.com/api/?name=Bridget+Allen&size=400&background=FF6000&color=fff&bold=true&font-size=0.4" alt="Bridget Allen" className="board-member-img" />
                </div>
                <div className="board-member-info">
                  <h3 className="board-member-name">Bridget Allen</h3>
                  <p className="board-member-title">Director – Strategy, Commissioning & Technical Delivery</p>
                </div>
              </div>
              <div className="board-member-wrapper" onClick={() => setCurrentPage('sarah-mitchell')}>
                <div className="board-member-card">
                  <img src="https://ui-avatars.com/api/?name=Sarah+Mitchell&size=400&background=E63946&color=fff&bold=true&font-size=0.4" alt="Sarah Mitchell" className="board-member-img" />
                </div>
                <div className="board-member-info">
                  <h3 className="board-member-name">Sarah Mitchell MBA MAICD</h3>
                  <p className="board-member-title">Director – Project Studies, Execution & Metallurgy</p>
                </div>
              </div>
              <div className="board-member-wrapper" onClick={() => setCurrentPage('brad-mitchell')}>
                <div className="board-member-card">
                  <img src="https://ui-avatars.com/api/?name=Brad+Mitchell&size=400&background=FF6000&color=fff&bold=true&font-size=0.4" alt="Brad Mitchell" className="board-member-img" />
                </div>
                <div className="board-member-info">
                  <h3 className="board-member-name">Brad Mitchell</h3>
                  <p className="board-member-title">Director – Metallurgy & Process Commissioning</p>
                </div>
              </div>
              <div className="board-member-wrapper" onClick={() => setCurrentPage('flavio-grilli')}>
                <div className="board-member-card">
                  <img src="https://ui-avatars.com/api/?name=Flavio+Grilli&size=400&background=E63946&color=fff&bold=true&font-size=0.4" alt="Flavio Grilli" className="board-member-img" />
                </div>
                <div className="board-member-info">
                  <h3 className="board-member-name">Flavio Grilli</h3>
                  <p className="board-member-title">Manager – Commissioning & Ops. Readiness</p>
                </div>
              </div>
              <div className="board-member-wrapper" onClick={() => setCurrentPage('pamela-contreras')}>
                <div className="board-member-card">
                  <img src="https://ui-avatars.com/api/?name=Pamela+Contreras&size=400&background=FF6000&color=fff&bold=true&font-size=0.4" alt="Pamela Contreras Ibañez" className="board-member-img" />
                </div>
                <div className="board-member-info">
                  <h3 className="board-member-name">Pamela Contreras Ibañez</h3>
                  <p className="board-member-title">Manager – South America, Manager- Environment and Permits</p>
                </div>
              </div>
              <div className="board-member-wrapper" onClick={() => setCurrentPage('deb-wakefield')}>
                <div className="board-member-card">
                  <img src="https://ui-avatars.com/api/?name=Deb+Wakefield&size=400&background=E63946&color=fff&bold=true&font-size=0.4" alt="Deb Wakefield" className="board-member-img" />
                </div>
                <div className="board-member-info">
                  <h3 className="board-member-name">Deb Wakefield</h3>
                  <p className="board-member-title">Admin, Scheduling and Document Control</p>
                </div>
              </div>
              <div className="board-member-wrapper" onClick={() => setCurrentPage('joey-meiers')}>
                <div className="board-member-card">
                  <img src="https://ui-avatars.com/api/?name=Joey+Meiers&size=400&background=FF6000&color=fff&bold=true&font-size=0.4" alt="Joey Meiers" className="board-member-img" />
                </div>
                <div className="board-member-info">
                  <h3 className="board-member-name">Joey Meiers</h3>
                  <p className="board-member-title">Cost Control & Project Controls</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : currentPage === 'contact' ? (
        <div className="contact-page">
          <div className="contact-hero-section">
            <h1 className="contact-main-title">Get in touch</h1>
          </div>
          <div className="contact-container">
            <div className="contact-form-section">
              <form 
                className="contact-form" 
                action="https://formsubmit.co/bridget@hermanaseng.com" 
                method="POST"
              >
                <input type="hidden" name="_subject" value="New Contact Form Inquiry from Hermanas Engineering" />
                <input type="hidden" name="_captcha" value="false" />
                <input type="hidden" name="_template" value="box" />
                <div className="form-row">
                  <div className="form-group">
                    <input 
                      type="text" 
                      name="first_name"
                      id="firstName" 
                      placeholder="First Name" 
                      className="form-input" 
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input 
                      type="text" 
                      name="last_name"
                      id="lastName" 
                      placeholder="Last Name" 
                      className="form-input" 
                      required
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group full-width">
                    <input 
                      type="email" 
                      name="email"
                      id="email" 
                      placeholder="Email Address" 
                      className="form-input" 
                      required
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group full-width">
                    <input 
                      type="tel" 
                      name="contact_no"
                      id="contactNo" 
                      placeholder="Contact No" 
                      className="form-input" 
                      required
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group full-width">
                    <textarea 
                      name="message"
                      id="message" 
                      placeholder="Message" 
                      className="form-textarea" 
                      rows={5}
                      required
                      onChange={(e) => setHasMessage(e.target.value.trim().length > 0)}
                    ></textarea>
                  </div>
                </div>
                <button 
                  type="submit" 
                  className={`submit-btn ${hasMessage ? 'submit-btn-active' : ''}`}
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      ) : currentPage === 'commissioning' ? (
        <div className="commissioning-page">
          <div className="commissioning-header">
            <div className="commissioning-title-wrapper">
              <div className="services-label-bar"></div>
              <div className="commissioning-title-group">
                <div className="services-label">Services</div>
                <h1 className="commissioning-title">Commissioning & Start-Up Excellence</h1>
              </div>
            </div>
          </div>
          <div className="commissioning-banner-placeholder">
            <img src="https://i.pinimg.com/1200x/ed/ee/1e/edee1e592aea6b147a429f173e0b197a.jpg" alt="Commissioning Banner" className="commissioning-banner-img" />
          </div>
          <div className="commissioning-content">
            <div className="commissioning-section">
              <div className="commissioning-section-content">
                <div className="commissioning-text-wrapper">
                  <h2 className="commissioning-section-title">The Integrated Approach</h2>
                  <p className="commissioning-text">
                    Commissioning is a core capability of Hermanas, embedded from early study phases through to execution and start-up using clear commissioning and operational readiness frameworks. We develop commissioning strategies and deliverables early so requirements are integrated into design, procurement, and execution planning.
        </p>
      </div>
                <div className="commissioning-image-wrapper">
                  <img src="https://concord-cc.com/wp-content/uploads/2921/09/what-is-commissioning-1500x1000-copy.webp" alt="Commissioning" className="commissioning-section-img" />
                </div>
              </div>
            </div>
            <div className="commissioning-strategy-section">
              <h2 className="commissioning-strategy-title">Commissioning Strategy, Processes & Deliverables</h2>
              <div className="commissioning-strategy-list">
                <div className="commissioning-strategy-item">
                  <div className="commissioning-strategy-number">01</div>
                  <div className="commissioning-strategy-content">
                    <h3 className="commissioning-strategy-item-title">Commissioning philosophies, strategies, and frameworks</h3>
                  </div>
                </div>
                <div className="commissioning-strategy-divider"></div>
                <div className="commissioning-strategy-item">
                  <div className="commissioning-strategy-number">02</div>
                  <div className="commissioning-strategy-content">
                    <h3 className="commissioning-strategy-item-title">Systemisation, completion, and handover frameworks</h3>
                  </div>
                </div>
                <div className="commissioning-strategy-divider"></div>
                <div className="commissioning-strategy-item">
                  <div className="commissioning-strategy-number">03</div>
                  <div className="commissioning-strategy-content">
                    <h3 className="commissioning-strategy-item-title">Pre-commissioning and commissioning plans</h3>
                  </div>
                </div>
                <div className="commissioning-strategy-divider"></div>
                <div className="commissioning-strategy-item">
                  <div className="commissioning-strategy-number">04</div>
                  <div className="commissioning-strategy-content">
                    <h3 className="commissioning-strategy-item-title">Turnover and progressive handover documentation</h3>
                  </div>
                </div>
                <div className="commissioning-strategy-divider"></div>
                <div className="commissioning-strategy-item">
                  <div className="commissioning-strategy-number">05</div>
                  <div className="commissioning-strategy-content">
                    <h3 className="commissioning-strategy-item-title">Acceptance criteria and readiness checklists</h3>
                  </div>
                </div>
                <div className="commissioning-strategy-divider"></div>
                <div className="commissioning-strategy-item">
                  <div className="commissioning-strategy-number">06</div>
                  <div className="commissioning-strategy-content">
                    <h3 className="commissioning-strategy-item-title">Start-up, ramp-up, stabilisation support</h3>
                  </div>
                </div>
                <div className="commissioning-strategy-divider"></div>
                <div className="commissioning-strategy-item">
                  <div className="commissioning-strategy-number">07</div>
                  <div className="commissioning-strategy-content">
                    <h3 className="commissioning-strategy-item-title">Interfaces between EPC/EPCM, Construction, and Operations</h3>
                  </div>
                </div>
              </div>
            </div>
            <div className="commissioning-section" ref={operationalReadinessRef}>
              <div className="operational-readiness-container">
                <div className="operational-readiness-frame">
                  <div className="operational-readiness-content">
                    <div className="operational-readiness-label">OPERATIONAL READINESS & HANDOVER FRAMEWORKS</div>
                    <div className="operational-readiness-desktop">
                      {[
                        "Progressive handover strategy",
                        "O&M readiness planning",
                        "Systems completion and verification",
                        "Documentation standards and acceptance criteria",
                        "Support through early operations and stabilisation"
                      ].map((item, index) => (
                        <div 
                          key={index}
                          className="operational-readiness-item"
                          style={{ 
                            opacity: operationalReadinessImageIndex === index ? 1 : 0,
                            transition: 'opacity 0.5s ease-in-out'
                          }}
                        >
                          {item.toUpperCase()}
                        </div>
                      ))}
                    </div>
                    <div className="operational-readiness-mobile">
                      {[
                        { text: "Progressive handover strategy", description: "Structured approach to transitioning systems from construction to operations, ensuring smooth and safe handover.", img: "https://images.unsplash.com/photo-1631266524159-4e86a929a323?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
                        { text: "O&M readiness planning", description: "Comprehensive planning to ensure operations and maintenance teams are fully prepared for plant takeover.", img: "https://plus.unsplash.com/premium_photo-1682144343787-cd03f24476b1?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
                        { text: "Systems completion and verification", description: "Rigorous verification processes to confirm all systems meet design specifications and operational requirements.", img: "https://images.unsplash.com/photo-1593539568552-88c7fcbb06b6?q=80&w=1760&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
                        { text: "Documentation standards and acceptance criteria", description: "Establishing clear documentation requirements and acceptance standards for system handover.", img: "https://images.unsplash.com/photo-1629211757542-3004c629a56e?q=80&w=1365&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
                        { text: "Support through early operations and stabilisation", description: "Ongoing support during initial operations to ensure smooth ramp-up and performance stabilisation.", img: "https://images.unsplash.com/photo-1647969476632-17261bc91afa?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" }
                      ].map((item, index) => (
                        <div key={index} className="operational-readiness-mobile-item">
                          <img src={item.img} alt="Operational Readiness" className="operational-readiness-mobile-img" />
                          <div className="operational-readiness-mobile-text">{item.text.toUpperCase()}</div>
                          <div className="operational-readiness-mobile-description">{item.description}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="operational-readiness-image">
                  <div className="operational-readiness-images-wrapper">
                    {[
                      "https://images.unsplash.com/photo-1631266524159-4e86a929a323?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                      "https://plus.unsplash.com/premium_photo-1682144343787-cd03f24476b1?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                      "https://images.unsplash.com/photo-1593539568552-88c7fcbb06b6?q=80&w=1760&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                      "https://images.unsplash.com/photo-1629211757542-3004c629a56e?q=80&w=1365&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                      "https://images.unsplash.com/photo-1647969476632-17261bc91afa?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    ].map((src, index) => (
                      <img 
                        key={index}
                        src={src} 
                        alt="Operational Readiness" 
                        className="operational-readiness-img"
                        style={{ 
                          opacity: operationalReadinessImageIndex === index ? 1 : 0,
                          transition: 'opacity 0.5s ease-in-out'
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div className="operational-readiness-scroll-spacer"></div>
            </div>
          </div>
        </div>
      ) : currentPage === 'technical-review' ? (
        <div className="technical-review-page">
          <div className="technical-review-header">
            <div className="technical-review-title-wrapper">
              <div className="services-label-bar"></div>
              <div className="technical-review-title-group">
                <div className="services-label">Services</div>
                <h1 className="technical-review-title">Independent Technical Review & FID Support</h1>
              </div>
            </div>
          </div>
          <div className="technical-review-banner-placeholder">
            <img src="https://images.pexels.com/photos/33192/paddle-wheel-bucket-wheel-excavators-brown-coal-open-pit-mining.jpg" alt="Technical Review Banner" className="technical-review-banner-img" />
          </div>
          <div className="technical-review-content">
            <div className="technical-review-section">
              <div className="technical-review-section-content">
                <div className="technical-review-text-wrapper">
                  <h2 className="technical-review-section-title">Decision-Grade Technical Assurance for Investment Confidence</h2>
                  <p className="technical-review-text">
                    Hermanas acts as an Independent Technical Advisor to Owners, Boards, Investors, and Lenders, providing objective assessments of technical readiness and execution risk at key decision points (including FID). We also support clients by developing the underlying technical and governance frameworks used to assess readiness.
                  </p>
                </div>
                <div className="technical-review-image-wrapper">
                  <img src="https://images.pexels.com/photos/4693431/pexels-photo-4693431.jpeg" alt="Technical Assurance" className="technical-review-section-img" />
                </div>
              </div>
            </div>
            <div className="technical-review-strategy-section">
              <h2 className="technical-review-strategy-title">We Help To Support</h2>
              <div className="technical-review-strategy-list">
                <div className="technical-review-strategy-item">
                  <div className="technical-review-strategy-number">01</div>
                  <div className="technical-review-strategy-content">
                    <h3 className="technical-review-strategy-item-title">Final Investment Decisions (FID)</h3>
                  </div>
                </div>
                <div className="technical-review-strategy-divider"></div>
                <div className="technical-review-strategy-item">
                  <div className="technical-review-strategy-number">02</div>
                  <div className="technical-review-strategy-content">
                    <h3 className="technical-review-strategy-item-title">Owner's Engineer / peer reviews</h3>
                  </div>
                </div>
                <div className="technical-review-strategy-divider"></div>
                <div className="technical-review-strategy-item">
                  <div className="technical-review-strategy-number">03</div>
                  <div className="technical-review-strategy-content">
                    <h3 className="technical-review-strategy-item-title">Investor and lender technical due diligence</h3>
                  </div>
                </div>
                <div className="technical-review-strategy-divider"></div>
                <div className="technical-review-strategy-item">
                  <div className="technical-review-strategy-number">04</div>
                  <div className="technical-review-strategy-content">
                    <h3 className="technical-review-strategy-item-title">Independent review of EPC and study consultant deliverables</h3>
                  </div>
                </div>
              </div>
            </div>
            <div className="technical-review-section" ref={whatWeDevelopRef}>
              <div className="what-we-develop-container">
                <div className="what-we-develop-frame">
                  <div className="what-we-develop-content">
                    <div className="what-we-develop-label">WHAT WE DEVELOP</div>
                    <div className="what-we-develop-desktop">
                      {[
                        "Study work plans and deliverable registers",
                        "Flowsheets, design bases, technical standards",
                        "CAPEX/OPEX estimates",
                        "Execution strategies and PEPs",
                        "Schedule logic and delivery strategy",
                        "Commissioning and ramp-up approach",
                        "Technical/execution/operational risk frameworks"
                      ].map((item, index) => (
                        <div 
                          key={index}
                          className="what-we-develop-item"
                          style={{ 
                            opacity: whatWeDevelopImageIndex === index ? 1 : 0,
                            transition: 'opacity 0.5s ease-in-out'
                          }}
                        >
                          {item.toUpperCase()}
                        </div>
                      ))}
                    </div>
                    <div className="what-we-develop-mobile">
                      {[
                        { 
                          text: "Study work plans and deliverable registers", 
                          description: "Comprehensive planning frameworks that define project scope, deliverables, and timelines to ensure systematic execution and clear accountability.",
                          img: "https://plus.unsplash.com/premium_photo-1682148243160-b5ea6dc28f59?q=80&w=2281&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                        },
                        { 
                          text: "Flowsheets, design bases, technical standards", 
                          description: "Detailed process flow diagrams, fundamental design criteria, and industry-standard technical specifications that form the foundation of project design.",
                          img: "https://images.unsplash.com/photo-1643832199429-47848e22ae31?q=80&w=1335&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                        },
                        { 
                          text: "CAPEX/OPEX estimates", 
                          description: "Accurate capital and operational expenditure forecasts aligned with AACE standards, providing reliable cost projections for investment decisions.",
                          img: "https://images.unsplash.com/photo-1642658475391-b5bc1332888e?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                        },
                        { 
                          text: "Execution strategies and PEPs", 
                          description: "Structured project execution plans that define delivery models, contracting strategies, and integration approaches to optimize project outcomes.",
                          img: "https://images.unsplash.com/photo-1660367439240-d38cb03a4365?q=80&w=2673&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                        },
                        { 
                          text: "Schedule logic and delivery strategy", 
                          description: "Critical path analysis and strategic scheduling frameworks that identify dependencies and optimize project delivery timelines.",
                          img: "https://plus.unsplash.com/premium_photo-1661962309696-c429126b237e?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                        },
                        { 
                          text: "Commissioning and ramp-up approach", 
                          description: "Systematic commissioning methodologies and operational readiness frameworks that ensure smooth transition from construction to operations.",
                          img: "https://images.unsplash.com/photo-1560872531-552417aded86?q=80&w=2283&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                        },
                        { 
                          text: "Technical/execution/operational risk frameworks", 
                          description: "Comprehensive risk assessment and mitigation strategies that identify, quantify, and manage technical, execution, and operational uncertainties.",
                          img: "https://images.unsplash.com/photo-1596366799486-301666a0477e?q=80&w=2275&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                        }
                      ].map((item, index) => (
                        <div key={index} className="what-we-develop-mobile-item">
                          <img src={item.img} alt="What we develop" className="what-we-develop-mobile-img" />
                          <div className="what-we-develop-mobile-text">{item.text.toUpperCase()}</div>
                          <div className="what-we-develop-mobile-description">{item.description}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="what-we-develop-image">
                  <div className="what-we-develop-images-wrapper">
                    {[
                      "https://plus.unsplash.com/premium_photo-1682148243160-b5ea6dc28f59?q=80&w=2281&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                      "https://images.unsplash.com/photo-1643832199429-47848e22ae31?q=80&w=1335&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                      "https://images.unsplash.com/photo-1642658475391-b5bc1332888e?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                      "https://images.unsplash.com/photo-1660367439240-d38cb03a4365?q=80&w=2673&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                      "https://plus.unsplash.com/premium_photo-1661962309696-c429126b237e?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                      "https://images.unsplash.com/photo-1560872531-552417aded86?q=80&w=2283&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                      "https://images.unsplash.com/photo-1596366799486-301666a0477e?q=80&w=2275&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    ].map((src, index) => (
                      <img 
                        key={index}
                        src={src} 
                        alt="What we develop" 
                        className="what-we-develop-img"
                        style={{ 
                          opacity: whatWeDevelopImageIndex === index ? 1 : 0,
                          transition: 'opacity 0.5s ease-in-out'
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div className="what-we-develop-scroll-spacer"></div>
            </div>
            <div className="technical-review-value-section">
              <div className="technical-review-value-bar"></div>
              <p className="technical-review-value-text">
                Independent technical assurance reduces late-stage surprises, clarifies execution and commissioning risk, and strengthens Board and investment confidence.
              </p>
            </div>
          </div>
        </div>
      ) : null}

      {currentPage === 'bridget-allen' ? (
        <div className="team-member-page">
          <div className="team-member-header">
            <div className="team-member-breadcrumb">
              <span>TEAM</span>
              <span> / </span>
              <span>OUR LEADERSHIP</span>
            </div>
            <h1 className="team-member-name-large">Bridget Allen</h1>
          </div>
          <div className="team-member-image-container">
            <img src="https://ui-avatars.com/api/?name=Bridget+Allen&size=600&background=FF6000&color=fff&bold=true&font-size=0.5" alt="Bridget Allen" className="team-member-large-img" />
          </div>
          <div className="team-member-role-container">
            <h2 className="team-member-role">Director – Strategy, Commissioning & Technical Delivery</h2>
          </div>
          <div className="team-member-content">
            <p className="team-member-description">
              {isSpanish ? (
                <>
                  Bridget Allen es una profesional de proyectos experimentada con formación en ingeniería de sistemas eléctricos y de control, y más de 29 años de experiencia en la entrega de importantes proyectos mineros y de infraestructura. Ha ocupado roles de liderazgo senior en desarrollos emblemáticos como Roy Hill, la Expansión T155 de FMG, Iluka Resources y el proyecto Telfer de Newcrest, donde dirigió alcances complejos de puesta en marcha, marcos de gobernanza y entregas estructuradas.
                </>
              ) : (
                <>
                  Bridget Allen is a seasoned project professional with a background in electrical and control systems engineering and over 29 years of experience delivering major mining and infrastructure projects. She has held senior leadership roles on landmark developments such as Roy Hill, FMG's T155 Expansion, Iluka Resources, and Newcrest's Telfer project, where she directed complex commissioning scopes, governance frameworks, and structured handovers.
                </>
              )}
            </p>
            <p className="team-member-description">
              {isSpanish ? (
                <>
                  Bridget se especializa en estrategia de ejecución, planificación de proyectos y entrega, aportando una mentalidad a nivel de sistema a la integración de activos a gran escala. Su experiencia radica en desarrollar marcos de ejecución estructurados, incorporar gobernanza y impulsar la eficiencia, la responsabilidad y la mejora continua en equipos multidisciplinarios. Con siete años de experiencia profesional en Chile y extensos viajes por América Latina, combina profundidad técnica con perspectiva internacional. Como cofundadora de Hermanas Engineering, Bridget es reconocida por su capacidad para alinear diversas partes interesadas, asegurar una ejecución disciplinada de proyectos y entregar resultados seguros, eficientes y confiables en el sector minero.
                </>
              ) : (
                <>
                  Bridget specialises in execution strategy, project planning, and delivery, bringing a system-level mindset to the integration of large-scale assets. Her expertise lies in developing structured execution frameworks, embedding governance, and driving efficiency, accountability, and continuous improvement across multidisciplinary teams. With seven years of professional experience in Chile and extensive travel across Latin America, she combines technical depth with international perspective. As co-founder of Hermanas Engineering, Bridget is recognised for her ability to align diverse stakeholders, ensure disciplined project execution, and deliver safe, efficient, and reliable outcomes across the mining sector.
                </>
              )}
            </p>
            <div className="language-toggle">
              <span className={!isSpanish ? 'language-option active' : 'language-option'} onClick={() => setIsSpanish(false)}>EN</span>
              <span className="language-separator">|</span>
              <span className={isSpanish ? 'language-option active' : 'language-option'} onClick={() => setIsSpanish(true)}>ES</span>
            </div>
          </div>
        </div>
      ) : currentPage === 'sarah-mitchell' ? (
        <div className="team-member-page">
          <div className="team-member-header">
            <div className="team-member-breadcrumb">
              <span>TEAM</span>
              <span> / </span>
              <span>OUR LEADERSHIP</span>
            </div>
            <h1 className="team-member-name-large">Sarah Mitchell MBA MAICD</h1>
          </div>
          <div className="team-member-image-container">
            <img src="https://ui-avatars.com/api/?name=Sarah+Mitchell&size=600&background=E63946&color=fff&bold=true&font-size=0.5" alt="Sarah Mitchell" className="team-member-large-img" />
          </div>
          <div className="team-member-role-container">
            <h2 className="team-member-role">Director – Project Studies, Execution & Metallurgy</h2>
          </div>
          <div className="team-member-content">
            <p className="team-member-description">
              {isSpanish ? (
                <>
                  Sarah Mitchell aporta más de 29 años de experiencia diversa en el sector minero y de recursos, abarcando roles técnicos, operacionales y de liderazgo en Australia e internacionalmente. Con una base en metalurgia extractiva y un MBA en finanzas y liderazgo empresarial, Sarah ha ocupado roles senior en gestión de estudios, puesta en marcha y servicios técnicos en empresas como Roy Hill, Iluka y Ardea Resources. Su profunda comprensión tanto de la entrega de proyectos como de la preparación operacional se complementa con experiencia práctica en la puesta en marcha de circuitos de procesamiento complejos, liderando estimaciones Clase 3,4,5 y dirigiendo estudios importantes. Antes de fundar Hermanas Engineering, se desempeñó como Gerente General – Servicios Técnicos en Ardea Resources y más recientemente como Directora de Estudios en HanRoy. La combinación única de Sarah de profundidad técnica, enfoque en la ejecución y perspicacia comercial la posiciona como un impulsor clave de la ética de entrega primero de Hermanas Engineering.
                </>
              ) : (
                <>
                  Sarah Mitchell brings over 29 years of diverse experience in the mining and resources sector, spanning technical, operational, and leadership roles across Australia and internationally. With a foundation in extractive metallurgy and an MBA in finance and business leadership, Sarah has held senior roles in study management, commissioning, and technical services at companies such as Roy Hill, Iluka, and Ardea Resources. Her deep understanding of both project delivery and operational readiness is complemented by hands-on experience in commissioning complex processing circuits, leading Class 3,4,5 estimates and directing major studies. Prior to founding Hermanas Engineering, she served as General Manager – Technical Services at Ardea Resources and more recently Study Director at HanRoy. Sarah's unique blend of technical depth, execution focus, and commercial acumen positions her as a key driver of Hermanas Engineering's delivery-first ethos.
                </>
              )}
            </p>
            <div className="language-toggle">
              <span className={!isSpanish ? 'language-option active' : 'language-option'} onClick={() => setIsSpanish(false)}>EN</span>
              <span className="language-separator">|</span>
              <span className={isSpanish ? 'language-option active' : 'language-option'} onClick={() => setIsSpanish(true)}>ES</span>
            </div>
          </div>
        </div>
      ) : currentPage === 'brad-mitchell' ? (
        <div className="team-member-page">
          <div className="team-member-header">
            <div className="team-member-breadcrumb">
              <span>TEAM</span>
              <span> / </span>
              <span>OUR LEADERSHIP</span>
            </div>
            <h1 className="team-member-name-large">Brad Mitchell</h1>
          </div>
          <div className="team-member-image-container">
            <img src="https://ui-avatars.com/api/?name=Brad+Mitchell&size=600&background=FF6000&color=fff&bold=true&font-size=0.5" alt="Brad Mitchell" className="team-member-large-img" />
          </div>
          <div className="team-member-role-container">
            <h2 className="team-member-role">Director – Metallurgy & Process Commissioning</h2>
          </div>
          <div className="team-member-content">
            <p className="team-member-description">
              {isSpanish ? (
                <>
                  Brad Mitchell aporta más de 30 años de experiencia práctica en procesamiento de minerales, puesta en marcha y operaciones de plantas, habiendo liderado importantes alcances de ejecución en Australia, África y América Latina. Su carrera abarca roles desde operador de planta y supervisor de molino hasta Líder de Puesta en Marcha en proyectos complejos de greenfields para empresas como Roy Hill, FMG, Boddington y Pilbara Minerals. La experiencia de Brad cubre la entrega integral de plantas, desde revisiones de diseño y desarrollo de P&ID hasta puesta en marcha en seco y húmeda, puesta en marcha y entrega operacional. Conocido por su enfoque metódico de la integración de sistemas y su profunda comprensión de los circuitos de conminución y flotación, Brad ha puesto en marcha exitosamente plantas que manejan oro, cobre, uranio, litio y mineral de hierro. Como cofundador de Hermanas Engineering, aporta una combinación única de profundidad técnica y experiencia de primera línea en puesta en marcha que asegura que cada proyecto se entregue con operabilidad y rendimiento en mente.
                </>
              ) : (
                <>
                  Brad Mitchell brings over 30 years of practical experience in mineral processing, commissioning, and plant operations, having led major execution scopes across Australia, Africa, and Latin America. His career spans roles from plant operator and mill supervisor through to Commissioning Lead on complex greenfields projects for companies like Roy Hill, FMG, Boddington, and Pilbara Minerals. Brad's expertise covers end-to-end plant delivery—from design reviews and P&ID development through to dry and wet commissioning, ramp-up, and operational handover. Known for his methodical approach to systems integration and his deep understanding of comminution and flotation circuits, Brad has successfully commissioned plants handling gold, copper, uranium, lithium, and iron ore. As a co-founder of Hermanas Engineering, he brings a rare blend of technical depth and frontline commissioning experience that ensures every project is delivered with operability and performance in mind.
                </>
              )}
            </p>
            <div className="language-toggle">
              <span className={!isSpanish ? 'language-option active' : 'language-option'} onClick={() => setIsSpanish(false)}>EN</span>
              <span className="language-separator">|</span>
              <span className={isSpanish ? 'language-option active' : 'language-option'} onClick={() => setIsSpanish(true)}>ES</span>
            </div>
          </div>
        </div>
      ) : currentPage === 'flavio-grilli' ? (
        <div className="team-member-page">
          <div className="team-member-header">
            <div className="team-member-breadcrumb">
              <span>TEAM</span>
              <span> / </span>
              <span>OUR LEADERSHIP</span>
            </div>
            <h1 className="team-member-name-large">Flavio Grilli</h1>
          </div>
          <div className="team-member-image-container">
            <img src="https://ui-avatars.com/api/?name=Flavio+Grilli&size=600&background=E63946&color=fff&bold=true&font-size=0.5" alt="Flavio Grilli" className="team-member-large-img" />
          </div>
          <div className="team-member-role-container">
            <h2 className="team-member-role">Manager – Commissioning & Ops. Readiness</h2>
          </div>
          <div className="team-member-content">
            <p className="team-member-description">
              {isSpanish ? (
                <>
                  Flavio es un ingeniero italiano con más de 20 años de experiencia en proyectos industriales y mineros, cubriendo todas las etapas del ciclo de vida del proyecto: pre-factibilidad, ingeniería básica y detallada, construcción, puesta en marcha y arranque, integridad de activos operacionales, revisiones de rendimiento de equipos y análisis de causa raíz. Su carrera ha incluido roles como técnico industrial y mecánico de campo en Europa, y como ingeniero de proyectos y gerente de puesta en marcha para operaciones mineras chilenas (BHP). Fluido en italiano, español e inglés, Flavio combina una sólida experiencia técnica con excelentes habilidades de comunicación e interpersonales. Se mantiene enfocado y comprometido incluso bajo presión, entregando consistentemente resultados profesionales de alta calidad.
                </>
              ) : (
                <>
                  Flavio is an Italian engineer with over 20 years of experience in industrial and mining projects, covering all stages of the project lifecycle: pre-feasibility, basic and detailed engineering, construction, commissioning and ramp-up, operations asset integrity, equipment performance reviews, and root cause analysis. His career has included roles as a field industrial and mechanical technician in Europe, and as a project engineer and commissioning manager for Chilean mining operations (BHP). Fluent in Italian, Spanish, and English, Flavio combines strong technical expertise with excellent communication and interpersonal skills. He remains focused and committed even under pressure, consistently delivering high-quality, professional outcomes.
                </>
              )}
            </p>
            <div className="language-toggle">
              <span className={!isSpanish ? 'language-option active' : 'language-option'} onClick={() => setIsSpanish(false)}>EN</span>
              <span className="language-separator">|</span>
              <span className={isSpanish ? 'language-option active' : 'language-option'} onClick={() => setIsSpanish(true)}>ES</span>
            </div>
          </div>
        </div>
      ) : currentPage === 'pamela-contreras' ? (
        <div className="team-member-page">
          <div className="team-member-header">
            <div className="team-member-breadcrumb">
              <span>TEAM</span>
              <span> / </span>
              <span>OUR LEADERSHIP</span>
            </div>
            <h1 className="team-member-name-large">Pamela Contreras Ibañez</h1>
          </div>
          <div className="team-member-image-container">
            <img src="https://ui-avatars.com/api/?name=Pamela+Contreras&size=600&background=FF6000&color=fff&bold=true&font-size=0.5" alt="Pamela Contreras Ibañez" className="team-member-large-img" />
          </div>
          <div className="team-member-role-container">
            <h2 className="team-member-role">Manager – South America, Manager- Environment and Permits</h2>
          </div>
          <div className="team-member-content">
            <p className="team-member-description">
              {isSpanish ? (
                <>
                  Pamela es una Ingeniera Ambiental y profesional de Cadena de Suministro con amplia experiencia internacional en los sectores minero, infraestructura, energía y público en Chile, Australia, Perú, América del Norte y Estados Unidos. Aporta una combinación única de gobernanza ambiental, optimización de cadena de suministro, adquisiciones y control de documentos, habiendo apoyado a operadores de primer nivel incluyendo proyectos de BHP y Rio Tinto, y organizaciones importantes de consultoría y entrega. Pamela ha liderado el cumplimiento ambiental y la certificación ISO 14001, gestionado aprobaciones ambientales e informes de autoridades, y coordinado el compromiso comunitario y de partes interesadas en sitios mineros operativos. Complementando esto, ha desempeñado un papel fundamental en programas globales de optimización de cadena de suministro, incluyendo la implementación del sistema Determine SmartSource, evaluaciones de licitaciones, negociaciones comerciales, análisis y compromiso con proveedores en múltiples jurisdicciones. Su experiencia también incluye administración de contratos, apoyo a licitaciones, control de documentos, coordinación bilingüe (inglés-español) y gestión de interfaces multifuncionales, lo que la hace particularmente efectiva en entornos de proyectos complejos y multi-contrato. Pamela es reconocida por su enfoque estructurado, fuerte comunicación con partes interesadas y capacidad para unir disciplinas técnicas, comerciales y regulatorias para permitir una entrega de proyectos cumplida y eficiente.
                </>
              ) : (
                <>
                  Pamela is an accomplished Environmental Engineer and Supply Chain professional with extensive international experience across the mining, infrastructure, energy, and public sectors in Chile, Australia, Peru, North America, and the United States. She brings a rare combination of environmental governance, supply chain optimisation, procurement, and document control, having supported tier-one operators including BHP, Rio Tinto projects, and major consulting and delivery organisations. Pamela has led environmental compliance and ISO 14001 certification, managed environmental approvals and authority reporting, and coordinated community and stakeholder engagement at operating mine sites. Complementing this, she has played a pivotal role in global supply chain optimisation programs, including implementation of the Determine SmartSource system, bid evaluations, commercial negotiations, analytics, and supplier engagement across multiple jurisdictions. Her background also includes contract administration, tender support, document control, bilingual (English–Spanish) coordination, and cross-functional interface management, making her particularly effective in complex, multi-contract project environments. Pamela is recognised for her structured approach, strong stakeholder communication, and ability to bridge technical, commercial, and regulatory disciplines to enable compliant and efficient project delivery.
                </>
              )}
            </p>
            <div className="language-toggle">
              <span className={!isSpanish ? 'language-option active' : 'language-option'} onClick={() => setIsSpanish(false)}>EN</span>
              <span className="language-separator">|</span>
              <span className={isSpanish ? 'language-option active' : 'language-option'} onClick={() => setIsSpanish(true)}>ES</span>
            </div>
          </div>
        </div>
      ) : currentPage === 'deb-wakefield' ? (
        <div className="team-member-page">
          <div className="team-member-header">
            <div className="team-member-breadcrumb">
              <span>TEAM</span>
              <span> / </span>
              <span>OUR LEADERSHIP</span>
            </div>
            <h1 className="team-member-name-large">Deb Wakefield</h1>
          </div>
          <div className="team-member-image-container">
            <img src="https://ui-avatars.com/api/?name=Deb+Wakefield&size=600&background=E63946&color=fff&bold=true&font-size=0.5" alt="Deb Wakefield" className="team-member-large-img" />
          </div>
          <div className="team-member-role-container">
            <h2 className="team-member-role">Admin, Scheduling and Document Control</h2>
          </div>
          <div className="team-member-content">
            <p className="team-member-description">
              {isSpanish ? (
                <>
                  Deb es una profesional altamente experimentada con más de 23 años de experiencia en minería, apoyando importantes proyectos de recursos en entornos de construcción, operaciones y cierres. Ha trabajado con contratistas y propietarios líderes incluyendo Monadelphous, Leighton Contractors, Civmec, AGC y operadores de primer nivel como BHP, Hanroy y Hancock, proporcionando apoyo administrativo y de gobernanza crítico basado en sitio. Su experiencia abarca administración de sitio, coordinación de nómina, administración HSE y control de documentos, asegurando el cumplimiento con requisitos de proyecto, estatutarios y del cliente. Además, Deb ha desempeñado un papel clave en la incorporación y movilización de personal de sitio, gestión de hojas de tiempo y códigos de costo, informes HSE y apoyo de auditoría, gestión de registros de capacitación y competencia, control de permisos y acceso, seguimiento de cumplimiento de contratistas y coordinación de interfaces entre equipos de sitio, corporativos y controles de proyecto. Conocida por su confiabilidad, atención al detalle y capacidad para operar en entornos de ritmo rápido y alto riesgo, Deb permite consistentemente una ejecución de sitio segura, cumplida y eficiente en todo el ciclo de vida del proyecto.
                </>
              ) : (
                <>
                  Deb is a highly experienced professional with over 23 years' experience in mining, supporting major resource projects across construction, operations, and shutdown environments. She has worked with leading contractors and owners including Monadelphous, Leighton Contractors, Civmec, AGC, and tier-one operators such as BHP, Hanroy and Hancock, providing critical site-based administrative and governance support. Their expertise spans site administration, payroll coordination, HSE administration, and document control, ensuring compliance with project, statutory, and client requirements. In addition, Deb has played a key role in onboarding and mobilisation of site personnel, timesheet and cost code management, HSE reporting and audit support, training and competency record management, permit and access control, contractor compliance tracking, and interface coordination between site, corporate, and project controls teams. Known for their reliability, attention to detail, and ability to operate in fast-paced, high-risk environments, Deb consistently enables safe, compliant, and efficient site execution across the full project lifecycle.
                </>
              )}
            </p>
            <div className="language-toggle">
              <span className={!isSpanish ? 'language-option active' : 'language-option'} onClick={() => setIsSpanish(false)}>EN</span>
              <span className="language-separator">|</span>
              <span className={isSpanish ? 'language-option active' : 'language-option'} onClick={() => setIsSpanish(true)}>ES</span>
            </div>
          </div>
        </div>
      ) : currentPage === 'joey-meiers' ? (
        <div className="team-member-page">
          <div className="team-member-header">
            <div className="team-member-breadcrumb">
              <span>TEAM</span>
              <span> / </span>
              <span>OUR LEADERSHIP</span>
            </div>
            <h1 className="team-member-name-large">Joey Meiers</h1>
          </div>
          <div className="team-member-image-container">
            <img src="https://ui-avatars.com/api/?name=Joey+Meiers&size=600&background=FF6000&color=fff&bold=true&font-size=0.5" alt="Joey Meiers" className="team-member-large-img" />
          </div>
          <div className="team-member-role-container">
            <h2 className="team-member-role">Cost Control & Project Controls</h2>
          </div>
          <div className="team-member-content">
            <p className="team-member-description">
              {isSpanish ? (
                <>
                  Joey es un profesional de Control de Costos y Administración de Proyectos Mineros con sólida experiencia apoyando operaciones de mineral de hierro en entornos de propietarios y contratistas en Australia Occidental. Joey ha ocupado roles de control de costos y administración de proyectos con Hancock Iron Ore, HanRoy y Fortescue Metals Group, contribuyendo al seguimiento efectivo de costos, control presupuestario, informes y gobernanza comercial en proyectos activos. Su experiencia incluye gestión de compromisos y devengos, codificación de costos, verificación de facturas, apoyo a pronósticos, informes de cronograma y progreso, y coordinación de interfaces con equipos de ingeniería, adquisiciones y construcción. Joey también ha apoyado funciones de administración de proyectos, incluyendo control de documentos, paquetes de informes y gestión de datos de contratistas, permitiendo un flujo de información de proyectos preciso y oportuno. Conocido por su atención al detalle, confiabilidad y fuerte disciplina de sistemas, Joey proporciona apoyo confiable de costos y controles crítico para mantener la integridad financiera y la confianza en las decisiones en proyectos mineros.
                </>
              ) : (
                <>
                  Joey is a mining project Cost Control and Project Administration professional with strong experience supporting iron ore operations across owner and contractor environments in Western Australia. Joey has held cost control and project administration roles with Hancock Iron Ore, HanRoy, and Fortescue Metals Group, contributing to effective cost tracking, budget control, reporting, and commercial governance across active projects. His experience includes commitment and accrual management, cost coding, invoice verification, forecasting support, schedule and progress reporting, and interface coordination with engineering, procurement, and construction teams. Joey has also supported project administration functions, including document control, reporting packs, and contractor data management, enabling accurate and timely project information flow. Known for his attention to detail, reliability, and strong systems discipline, Joey provides dependable cost and controls support critical to maintaining financial integrity and decision confidence on mining projects.
                </>
              )}
            </p>
            <div className="language-toggle">
              <span className={!isSpanish ? 'language-option active' : 'language-option'} onClick={() => setIsSpanish(false)}>EN</span>
              <span className="language-separator">|</span>
              <span className={isSpanish ? 'language-option active' : 'language-option'} onClick={() => setIsSpanish(true)}>ES</span>
            </div>
          </div>
        </div>
      ) : null}
      
      <footer className="site-footer">
        <div className="footer-content">
          <div className="footer-column">
            <h3 className="footer-heading">[ Get in touch ]</h3>
            <ul className="footer-list">
              <li><a href="#">Book a call</a></li>
              <li><a href="#">email us</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h3 className="footer-heading">[ Explore ]</h3>
            <ul className="footer-list">
              <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('home'); }}>Home</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('contact'); }}>Contact</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('home'); }}>Capabilities</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('technical-review'); }}>Technical Review</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('commissioning'); }}>Commisioning</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h3 className="footer-heading">[ Find Us ]</h3>
            <ul className="footer-list">
              <li></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <img src={hermanasLogo} alt="HERMANAS" className="footer-logo" />
        </div>
      </footer>
    </div>
  )
}

export default App
