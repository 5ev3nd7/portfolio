"use client"

import { useEffect, useId, useRef, useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { useOutsideClick } from "@/hooks/use-outside-click"
import { GlowingEffect } from "@/components/ui/glowing-effect"

export default function ProjectCards() {
  const [active, setActive] = useState<(typeof cards)[number] | boolean | null>(null)
  const ref = useRef<HTMLDivElement>(null)
  const id = useId()

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(false)
      }
    }

    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }

    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [active])

  useOutsideClick(ref, () => setActive(null))

  return (
    <>
      <AnimatePresence>
        {active && typeof active === "object" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-md h-full w-full z-10"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active && typeof active === "object" ? (
          <div className="fixed inset-0 grid place-items-center z-[100]">
            <motion.button
              key={`button-${active.title}-${id}`}
              layout
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
                transition: {
                  duration: 0.05,
                },
              }}
              className="flex absolute top-10 right-10 lg:hidden items-center justify-center bg-white rounded-full h-6 w-6"
              onClick={() => setActive(null)}
            >
              <CloseIcon />
            </motion.button>
            <motion.div
              layoutId={`card-${active.title}-${id}`}
              ref={ref}
              className="w-full max-w-[500px] h-fit md:max-h-[90%] flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-hidden"
            >
              <motion.div layoutId={`image-${active.title}-${id}`}>
                <img
                  width={200}
                  height={200}
                  src={active.src || "/placeholder.svg"}
                  alt={active.title}
                  className="w-full h-80 lg:h-80 sm:rounded-tr-lg sm:rounded-tl-lg object-contain object-center bg-white p-6"
                />
              </motion.div>

              <div>
                <div className="flex justify-between items-start p-4 pt-6">
                  <div className="w-full">
                    <motion.h3
                      layoutId={`title-${active.title}-${id}`}
                      className="font-bold text-2xl text-neutral-700 dark:text-neutral-200"
                    >
                      {active.title}
                    </motion.h3>
                    <motion.p
                      layoutId={`description-${active.description}-${id}`}
                      className="text-neutral-600 dark:text-neutral-400"
                    >
                      {active.description}
                    </motion.p>
                  </div>

                  <motion.a
                    layoutId={`button-${active.title}-${id}`}
                    href={active.ctaLink}
                    target="_blank"
                    className="px-4 py-3 rounded-sm font-bold bg-white hover:bg-teal-500 text-background hover:text-white"
                    rel="noreferrer"
                  >
                    {active.ctaText}
                  </motion.a>
                </div>
                <div className="pt-4 relative px-4">
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-neutral-600 text-sm lg:text-base h-40 md:h-fit pb-6 flex flex-col items-start gap-4 overflow-auto dark:text-neutral-400 [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]"
                    // [mask:linear-gradient(to_bottom,white,white,transparent)]
                  >
                    {typeof active.content === "function" ? active.content() : active.content}

                    <ul className="flex flex-wrap gap-3 mt-2 group-hover:text-teal-300 transition-colors duration-500">
                      {active.tech && (
                        (active.tech).map((tech, index) => (
                          <li key={index} className="px-3 py-1.5 text-sm flex items-center rounded-md text-white/90 bg-white/20 font-semibold">
                            {tech}
                          </li>
                        ))
                      )}
                    </ul>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
      <div className="max-w-5xl mx-auto w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
        {cards.map((card, index) => (
          <motion.div
            key={`card-${card.title}-${id}`}
            layoutId={`card-${card.title}-${id}`}
            onClick={() => setActive(card)}
            className="relative rounded-xl cursor-pointer"
          >
            {active !== card && (
              <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} />
            )}
            <div className="relative p-6 flex flex-col items-start bg-white/5 rounded-xl transition-all duration-500 lg:hover:bg-white/10 lg:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:drop-shadow-lg">
              <motion.div layoutId={`image-${card.title}-${id}`} className="w-full mb-4">
                <img
                  width={100}
                  height={100}
                  src={card.src || "/placeholder.svg"}
                  alt={card.title}
                  className="w-full h-48 rounded-lg object-contain object-center bg-white p-4"
                />
              </motion.div>
              <div className="w-full mb-4">
                <motion.h3
                  layoutId={`title-${card.title}-${id}`}
                  className="font-medium text-2xl text-neutral-800 dark:text-neutral-200 mb-1"
                >
                  {card.title}
                </motion.h3>
                <motion.p
                  layoutId={`description-${card.description}-${id}`}
                  className="text-neutral-600 dark:text-neutral-400"
                >
                  {card.description}
                </motion.p>
              </div>
              <motion.button
                layoutId={`button-${card.title}-${id}`}
                className="px-4 py-2 text-sm rounded-sm font-bold bg-gray-100 hover:bg-teal-500 hover:text-white text-black"
              >
                {card.ctaText}
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </>
  )
}

export const CloseIcon = () => {
  return (
    <motion.svg
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
        transition: {
          duration: 0.05,
        },
      }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-black"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  )
}

const cards = [
  {
    title: "METRICS",
    description: "Public website",
    src: "/images/metrics.png",
    ctaText: "View",
    ctaLink: "https://metricscenter.org",
    tech: ["Next.js", "Tailwind", "Vercel"],
    content: () => {
      return (
        <p>
          Desgin, develop, and implement public facing website<br /> <br /> 
        </p>
      )
    },
  },
  {
    description: "Lana Del Rey",
    title: "Summertime Sadness",
    src: "https://assets.aceternity.com/demos/lana-del-rey.jpeg",
    ctaText: "Play",
    ctaLink: "https://ui.aceternity.com/templates",
    content: () => {
      return (
        <p>
          Lana Del Rey, an iconic American singer-songwriter, is celebrated for her melancholic and cinematic music
          style. Born Elizabeth Woolridge Grant in New York City, she has captivated audiences worldwide with her
          haunting voice and introspective lyrics. <br /> <br /> Her songs often explore themes of tragic romance,
          glamour, and melancholia, drawing inspiration from both contemporary and vintage pop culture. With a career
          that has seen numerous critically acclaimed albums, Lana Del Rey has established herself as a unique and
          influential figure in the music industry, earning a dedicated fan base and numerous accolades.
        </p>
      )
    },
  },
  {
    description: "Metallica",
    title: "For Whom The Bell Tolls",
    src: "https://assets.aceternity.com/demos/metallica.jpeg",
    ctaText: "Play",
    ctaLink: "https://ui.aceternity.com/templates",
    content: () => {
      return (
        <p>
          Metallica, an iconic American heavy metal band, is renowned for their powerful sound and intense performances
          that resonate deeply with their audience. Formed in Los Angeles, California, they have become a cultural icon
          in the heavy metal music industry. <br /> <br /> Their songs often reflect themes of aggression, social
          issues, and personal struggles, capturing the essence of the heavy metal genre. With a career spanning over
          four decades, Metallica has released numerous hit albums and singles that have garnered them a massive fan
          following both in the United States and abroad.
        </p>
      )
    },
  },
  {
    description: "Led Zeppelin",
    title: "Stairway To Heaven",
    src: "https://assets.aceternity.com/demos/led-zeppelin.jpeg",
    ctaText: "Play",
    ctaLink: "https://ui.aceternity.com/templates",
    content: () => {
      return (
        <p>
          Led Zeppelin, a legendary British rock band, is renowned for their innovative sound and profound impact on the
          music industry. Formed in London in 1968, they have become a cultural icon in the rock music world. <br />{" "}
          <br /> Their songs often reflect a blend of blues, hard rock, and folk music, capturing the essence of the
          1970s rock era. With a career spanning over a decade, Led Zeppelin has released numerous hit albums and
          singles that have garnered them a massive fan following both in the United Kingdom and abroad.
        </p>
      )
    },
  },
  {
    description: "Mustafa Zahid",
    title: "Toh Phir Aao",
    src: "https://assets.aceternity.com/demos/toh-phir-aao.jpeg",
    ctaText: "Play",
    ctaLink: "https://ui.aceternity.com/templates",
    content: () => {
      return (
        <p>
          &quot;Aawarapan&quot;, a Bollywood movie starring Emraan Hashmi, is renowned for its intense storyline and
          powerful performances. Directed by Mohit Suri, the film has become a significant work in the Indian film
          industry. <br /> <br /> The movie explores themes of love, redemption, and sacrifice, capturing the essence of
          human emotions and relationships. With a gripping narrative and memorable music, &quot;Aawarapan&quot; has
          garnered a massive fan following both in India and abroad, solidifying Emraan Hashmi&apos;s status as a
          versatile actor.
        </p>
      )
    },
  },
]
