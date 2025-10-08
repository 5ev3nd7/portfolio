"use client"

import Link from "next/link"
import { motion } from 'motion/react';
import Cube3D from "@/components/Cube3D"
import { useEffect, useRef, useState } from "react"
import { BiSolidFilePdf } from "react-icons/bi"
import { FiFigma, FiLink } from "react-icons/fi"
import { BsGithub, BsLinkedin } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import Image from "next/image";
import { MobileMenu } from "@/components/MobileMenu";
import ProjectCards from "@/components/ProjectCards";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"
import { ChevronDown, Code2Icon, WrenchIcon } from "lucide-react"

export default function Home() {
  const [isDark, setIsDark] = useState(true)
  const [activeSection, setActiveSection] = useState("")
  const [showHeader, setShowHeader] = useState(false)
  const [showMenu, setShowMenu] = useState(false)
  const [scrollDownBounce, setScrollDownBounce] = useState(true)
  const [introOpacity, setIntroOpacity] = useState(1)
  const sectionsRef = useRef<(HTMLElement | null)[]>([])

  const fadeInAnimation = {
    initial: { opacity: 0, y: 50 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.8 },
    viewport: { once: true, margin: "-100px" }
  };

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark)
  }, [isDark])

  // const toggleTheme = () => {
  //   setIsDark(!isDark)
  // }

  useEffect(() => {
    // md
    // const mediaQuery = window.matchMedia("(max-width: 768px)")
    // lg
    const mediaQuery = window.matchMedia("(max-width: 1023px)")

    const handleChange = (e: MediaQueryListEvent | MediaQueryList) => {
      if (e.matches) {
        // Always show header below lg screens
        setShowHeader(true)
      } else {
        setShowHeader(false)
      }
    }
    handleChange(mediaQuery)
    // resize
    mediaQuery.addEventListener("change", handleChange)
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // entry.target.classList.add("animate-fade-in-up")
            setActiveSection(entry.target.id)
            if (!mediaQuery.matches) {
              setShowHeader(entry.target.id !== "Intro")
              setShowMenu(entry.target.id !== "Intro")
              setScrollDownBounce(entry.target.id === "Intro")
            }
          }
        })
      },
      { threshold: 0.3, rootMargin: "0px 0px 0px 0px" },
    )

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section)
    })

    return () => {
      mediaQuery.removeEventListener("change", handleChange)
      observer.disconnect()
    }
  }, [])

  const scrollToSection = (section: string) => {
    document.getElementById(section)?.scrollIntoView({ behavior: "smooth" })
  }

  // fade in/out intro
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const progress = Math.min(scrollTop / window.innerHeight, 1)
      const newOpacity = 1 - progress
      setIntroOpacity(newOpacity)
    }
    handleScroll()
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground relative">

      <div
        className={`fixed bottom-10 left-1/2 -translate-x-1/2 animate-bounce duration-700 ease-in ${
          scrollDownBounce ? "block" : "hidden"
        }`}
      >
        <div className="w-12 h-12 rounded-full border-2 border-white/25 flex items-center justify-center animate-pulse">
          <ChevronDown className="w-10 h-10 text-white/50" strokeWidth={1} />
        </div>
      </div>

      <header
        className={`fixed top-0 left-0 right-0 z-10 bg-background/90 shadow-2xl backdrop-blur-2xl border-b border-border transition-all duration-500 ${
          showHeader ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        }`}
      >
        <div className="max-w-4xl mx-auto px-8 sm:px-16 lg:px-40 xl:px-6 py-4 flex items-center justify-between">
          <div className="text-xl font-light tracking-tight"><a href="#">Jeff Harris</a></div>

          <nav className="flex">
            <div className="items-center gap-6 hidden md:flex lg:hidden">
              {["Intro", "About", "Experience", "Projects", "Connect"].map((section) => {
                if (section === "Intro") return null
                const isActive = activeSection === section
                return (
                  <button
                    key={section}
                    onClick={() => scrollToSection(section)}
                    className={`px-2 py-1 rounded transition-all duration-500 ${
                      isActive ? "bg-foreground text-background" : "hover:text-background hover:bg-foreground"
                    }`}
                    aria-label={`Navigate to ${section}`}
                  >
                    {section}
                  </button>
                )
              })}
            </div>

            <div className="flex md:hidden">
              <MobileMenu activeSection={activeSection} onNavigate={scrollToSection} />
            </div>
          </nav>
        </div>
      </header>

      <nav
        className={`fixed left-8 top-1/2 -translate-y-1/2 z-10 hidden lg:block transition-all duration-500 ${
          showMenu ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
        }`}
      >
        <div className="flex flex-col gap-4">
          {["Intro", "About", "Experience", "Projects", "Connect"].map((section) => {
            if (section === "Intro") return null
            const isActive = activeSection === section
            return (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className={`w-2 h-8 rounded transition-all duration-500 ${
                  isActive ? "w-30 -pl-6 bg-foreground text-background" : "bg-muted-foreground/30 text-muted-foreground hover:bg-foreground hover:text-teal-300"
                }`}
                aria-label={`Navigate to ${section}`}
              >
                <span className="pl-6">{section}</span>
              </button>
            )
          })}
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-8 sm:px-16 lg:px-40 xl:px-6">
        <section
          id="Intro"
          ref={(el) => {sectionsRef.current[0] = el}}
          className="min-h-screen flex items-center pointer-events-none mb-72"
        >
          <div 
            className="fixed flex flex-col lg:flex-row gap-12 sm:gap-16 items-center max-w-4xl mx-auto"
            style={{ opacity: introOpacity }}
          >
            <div className="space-y-6 sm:space-y-8">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-light tracking-tight">
                Jeff
                <br />
                <span className="text-muted-foreground">Harris</span>
              </h1>
              <div className="space-y-6 max-w-md">
                <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
                  Frontend Developer crafting digital experiences at the intersection of
                  <span className="text-foreground"> design</span>,<span className="text-foreground"> technology</span>,
                  and
                  <span className="text-foreground"> user experience</span>.
                </p>

                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    Available for work
                  </div>
                </div>
              </div>
            </div>

            <div className="hidden lg:flex justify-center space-y-6 sm:space-y-8 mt-8 lg:mt-0">
              <Image src="/images/calvin.png" alt="Calvin and Hobbes" width={0} height={0} style={{ width: '75%', height: 'auto' }} priority />
            </div>
          </div>
        </section>

        <motion.section
          variants={fadeInAnimation}
          initial="hidden"
          whileInView="whileInView"
          id="About"
          ref={(el) => {sectionsRef.current[1] = el}}
          className="min-h-screen py-20 sm:py-32 opacity-0"
        >
          <div className="space-y-12 lg:space-y-16">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <h2 className="text-3xl sm:text-4xl font-light">About</h2>
            </div>
            <p>
              I'm a Front-End Web Developer and Designer with over 20+ years of experience creating responsive, user-friendly websites. With a strong foundation in UI/UX design, I bring a user-centered perspective to development, ensuring design and code work seamlessly to deliver innovative digital experiences.
              <br /><br />
              I've managed and collaborated with cross-functional teams to build web applications using JavaScript, TypeScript, and modern frameworks like Next.js, with a focus on usability and performance. Driven by curiosity and customer-focus, I'm always exploring new technologies and best practices to deliver solutions that improve engagement and outcomes.
            </p>
            <div className="grid gap-6 sm:gap-8 xl:grid-cols-2">
              <div className="flex overflow-hidden z-1 rounded-lg animate-gradient__rotate relative group opacity-0 animate-fade-in bg-background">
                <Card className="p-6 bg-white/10 border-none w-full">
                  <CardHeader>
                    <CardTitle>
                      <h1 className="text-3xl flex items-center gap-3"><Code2Icon /> Solutions</h1>
                    </CardTitle>
                    <CardDescription>
                      <p className="text-base">I design and develop clean, modern interfaces that enhance the user experience and help your business grow.</p>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc ml-4 flex flex-col gap-1 mb-2">
                      <li>UI/UX design & workflows</li>
                      <li>Full-stack web development</li>
                      {/* <li>Responsive interface design</li> */}
                      <li>Design systems and component libraries</li>
                      <li>Wireframing and rapid prototyping</li>
                      <li>CMS architecture and implementation</li>
                      <li>Database design and API integration</li>
                      <li>Continuous integration and delivery</li>
                    </ul>
                  </CardContent>
                </Card>
                <i></i>
              </div>

              <div className="flex overflow-hidden z-1 rounded-lg animate-gradient__rotate relative group opacity-0 animate-fade-in">
                <Card className="p-6 bg-white/10 border-none w-full">
                  <CardHeader>
                    <CardTitle>
                      <h1 className="text-3xl flex items-center gap-3"><WrenchIcon /> Tools</h1>
                    </CardTitle>
                    <CardDescription>
                      <p className="text-base">I use modern tools and frameworks to bridge design and development, delivering reliable, performant digital experiences.</p>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc ml-4 flex flex-col gap-1 mb-2">
                      <li>
                        <span className="font-bold">Frontend</span><br/>
                        <span className="text-muted-foreground">Next.js, TypeScript, Tailwind, Payload</span>
                      </li>
                      <li>
                        <span className="font-bold">Full-stack</span><br/>
                        <span className="text-muted-foreground">Vercel, CI/CD, Supabase, GIT, PostHog</span>
                      </li>
                      <li>
                        <span className="font-bold">Design</span><br/>
                        <span className="text-muted-foreground">Figma, Adobe, Miro, Framer</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                <i></i>
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section
          variants={fadeInAnimation}
          initial="hidden"
          whileInView="whileInView"
          id="Experience"
          ref={(el) => {sectionsRef.current[2] = el}}
          className="min-h-screen py-20 sm:py-32 opacity-0"
        >
          <div className="space-y-12 lg:space-y-16">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <h2 className="text-3xl sm:text-4xl font-light">Experience</h2>
            </div>
            <ol className="space-y-8 sm:space-y-12 group/list">
              {[
                {
                  year: "2023 — PRESENT",
                  role: "Lead Developer & Product Manager",
                  company: "University of South Florida",
                  description:
                    "Led full-stack development and infrastructure for 10+ projects, delivering public websites, private portals, and custom CMS platforms that improved usability and reduced manual processes. Built open-source resources, streamlined deployments, and established a collaborative, UX-first culture that accelerated onboarding and improved reliability.",
                  tech: ["Next.js", "Payload CMS", "Vercel", "Design Systems"],
                  // url: "https://metricscenter.org",
                },
                {
                  year: "2017 — 2023",
                  role: "Creative Technologist",
                  company: "Webster Bank",
                  description:
                    "Developed and launched an enterprise-wide design system that boosted developer efficiency and delivered significant ROI. Partnered with product managers, designers, and researchers to create interactive prototypes, validate concepts with users, and secure leadership support for new initiatives.",
                  tech: ["Next.js", "Payload CMS", "Vercel", "Design Systems"],
                  url: "https://websterbank.com",
                  design: "https://www.figma.com/design/8tg9SILLTybmP1BaFrvbsf/Webster-DSM?node-id=583-33936",
                },
                {
                  year: "2008 — 2017",
                  role: "Senior Web Designer/Developer",
                  company: "Webster Bank",
                  description:
                    "Directed front-end development for public and private websites and led cross-team delivery of a mobile app that drove higher engagement and significantly improved app store ratings. Introduced Drupal as the enterprise CMS, streamlining workflows and embedding agile practices across teams.",
                  tech: ["Next.js", "Payload CMS", "Vercel", "Design Systems"],
                  url: "https://websterbank.com",
                  design: "https://www.figma.com/design/BW0IOwrjaZILF8VS97KEsr/Webster-Bank---MXmobile?node-id=5426-108212&p=f",
                },
                {
                  year: "2000 — 2008",
                  role: "Graphic Designer and Software Engineer of eCommerce",
                  company: "Webster Bank",
                  description:
                    "Designed and launched the bank's first online banking application and onboarding portal, driving a 30% increase in new accounts and reducing abandonment by nearly half. Created branding and style guides that standardized digital design across the organization.",
                  tech: ["Next.js", "Payload CMS", "Vercel", "Design Systems"],
                  url: "https://websterbank.com",
                },
              ].map((job, index) => (
                <li key={index}>
                  <div className="group/link">
                    <div className="group relative grid lg:grid-cols-12 gap-4 text-muted-foreground transition duration-500 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
                      <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-slate-100/50 dark:lg:group-hover:bg-slate-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg"></div>

                      <div className="lg:col-span-2">
                        <div className="text-xs font-light pt-1 relative group-hover:text-muted-foreground transition-colors duration-500">
                          {job.year}
                        </div>
                      </div>

                      <div className="lg:col-span-10">
                        <h3 className="flex items-center text-lg sm:text-xl font-medium relative group-hover:text-teal-300 transition-colors duration-500">
                          {job.role}
                          {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="ml-1 mb-1 inline-block h-4 w-4 shrink-0 transition-transform group-hover/link:translate-x-1 motion-reduce:transition-none" aria-hidden="true">
                            <path d="M4.5 12a.75.75 0 01.75-.75h9.69l-3.97-3.97a.75.75 0 111.06-1.06l5.25 5.25a.75.75 0 010 1.06l-5.25 5.25a.75.75 0 11-1.06-1.06l3.97-3.97H5.25A.75.75 0 014.5 12z" />
                          </svg> */}
                        </h3>
                        <div className="text-muted-foreground relative group-hover:text-foreground transition-colors duration-500">{job.company}</div>

                        <p className="text-sm text-muted-foreground/70 leading-relaxed mt-3 pb-1 relative group-hover:text-foreground/70 lg:group-hover:text-muted-foreground transition-colors duration-500">
                          {job.description}
                        </p>

                        {(job.url || job.design) &&
                          <div className="flex gap-6 items-center pb-1">
                            {job.design &&
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  window.open(`${job.design}`, "_blank");
                                }}
                                className="relative flex items-center gap-2 mt-2 border border-muted-foreground/25 rounded py-1 px-2 hover:border-foreground hover:bg-foreground hover:text-background transition-colors duration-500"
                              >
                                <FiFigma /> Design file
                              </button>
                            }

                            {job.url &&
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  window.open(`${job.url}`, "_blank");
                                }}
                                className="relative flex items-center gap-2 mt-2 border border-muted-foreground/25 rounded py-1 px-2 hover:border-foreground hover:bg-foreground hover:text-background transition-colors duration-500"
                              >
                                <FiLink /> Website
                              </button>
                            }
                          </div>
                        }
                      </div>

                      {/* Tags 
                      <ul className="lg:col-span-4 flex flex-wrap gap-2 lg:justify-end mt-2 lg:mt-0 relative group-hover:text-teal-300 transition-colors duration-500">
                        {job.tech.map((tech) => (
                          <li key={tech}>
                            <div className="px-2 py-1 text-xs flex items-center rounded-full bg-teal-400/10 font-medium leading-5">
                              {tech}
                            </div>
                          </li>
                        ))}
                      </ul>
                      */}
                    </div>
                  </div>
                </li>
              ))}
            </ol>
            <a href="#"><button className="relative flex items-center gap-2 mt-2 border border-muted-foreground/25 rounded py-2 px-2 hover:border-foreground hover:bg-foreground hover:text-background transition-colors duration-500"><BiSolidFilePdf size={28}/> View full resume</button></a>
          </div>
        </motion.section>

        <motion.section
          variants={fadeInAnimation}
          initial="hidden"
          whileInView="whileInView"
          id="Projects"
          ref={(el) => {sectionsRef.current[3] = el}}
          className="min-h-screen py-20 sm:py-32 opacity-0"
        >
          <div className="space-y-12 sm:space-y-16">
            <h2 className="text-3xl sm:text-4xl font-light">Projects</h2>

            {/* <Cube3D /> */}

            <ProjectCards />
            
          </div>
        </motion.section>

        <motion.section
          variants={fadeInAnimation}
          initial="hidden"
          whileInView="whileInView"
          id="Connect" 
          ref={(el) => {sectionsRef.current[4] = el}} 
          className="py-20 sm:py-32 opacity-0"
        >
          <div className="mb-8 sm:mb-10">
            <h2 className="text-3xl sm:text-4xl font-light">Connect</h2>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 sm:gap-16">
            <div className="space-y-6 sm:space-y-8">
              <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
                I'm always interested in new opportunities, collaborations, and conversations about technology and design.
              </p>
            </div>

            <div className="space-y-6 sm:space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <Link
                    href="mailto:test@example.com"
                    className="group flex items-center gap-3 text-foreground hover:text-teal-300 transition-colors duration-300"
                  >
                    <MdEmail />
                    <span className="text-base sm:text-lg">test@example.com</span>
                  </Link>

                  <Link
                    href="https://github.com/5ev3nd7"
                    className="group flex items-center gap-3 text-foreground hover:text-teal-300 transition-colors duration-300"
                  >
                    <BsGithub />
                    <span className="text-base sm:text-lg">@5ev3nd7</span>
                  </Link>

                  <Link
                    href="https://www.linkedin.com/in/jeffreywharris"
                    className="group flex items-center gap-3 text-foreground hover:text-teal-300 transition-colors duration-300"
                  >
                    <BsLinkedin />
                    <span className="text-base sm:text-lg">in/jeffreywharris</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        <footer className="py-12 sm:py-16 border-t border-border">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 sm:gap-8">
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">© 2025 Jeff Harris. All rights reserved.</div>
            </div>

            {/* <div className="flex items-center gap-4">
              <button
                onClick={toggleTheme}
                className="group p-3 rounded-lg border border-border hover:border-muted-foreground/50 transition-all duration-300"
                aria-label="Toggle theme"
              >
                {isDark ? (
                  <svg
                    className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors duration-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors duration-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                )}
              </button>
            </div> */}
          </div>
        </footer>
      </main>

      <div className="fixed bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none"></div>
    </div>
  )
}
