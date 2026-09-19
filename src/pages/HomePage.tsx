import { motion } from "framer-motion";
import Typed from "typed.js";
import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { initializeAnalytics, trackEvent } from "../lib/analytics";


const PHOTO = `${import.meta.env.BASE_URL}images/leonard.jpeg`;

const projects = [
    {
        title: "Crop Production & Plot Management — AllPress Farms Ltd, UK",
        category: "Crop Production",
        shortTitle: "Plot management",
        description: "Hands-on crop production at AllPress Farms Ltd in the UK, from ploughing and planting to irrigation, pest control and harvest. Served as Team Coordinator and received the Best Plot Manager Award.",
        imageClass: "project-visual--crop-production",
        image: `${import.meta.env.BASE_URL}images/project-crop-production.svg`,
    },
    {
        title: "Apiculture (Beekeeping) Certification",
        category: "Certification",
        shortTitle: "Beekeeping",
        description: "Certified in apiculture, with practical knowledge of keeping bees and managing hives, a valuable skill for modern, diversified farming.",
        imageClass: "project-visual--apiculture",
        image: `${import.meta.env.BASE_URL}images/project-apiculture.svg`,
    },
    {
        title: "Fish Farming & Feed Formulation",
        category: "Certification",
        shortTitle: "Fish farming & feed",
        description: "Certified in fish farming and feed formulation, with practical knowledge of raising healthy stock and putting together balanced feed.",
        imageClass: "project-visual--fish-farming",
        image: `${import.meta.env.BASE_URL}images/project-fish-farming.svg`,
    },
];

const services = [
    {
        number: "01",
        title: "Crop Production",
        description: "Hands-on field work from ploughing and tilling to planting, topdressing, irrigation and harvest, all aimed at healthy, productive yields.",
        tags: ["Ploughing", "Planting", "Irrigation"],
    },
    {
        number: "02",
        title: "Pest, Weed & Disease Control",
        description: "Practical pest, weed and disease management that protects crops, keeps fields clean and keeps production on track.",
        tags: ["Pest Control", "Weed Control", "Crop Protection"],
    },
    {
        number: "03",
        title: "Beekeeping & Fish Farming",
        description: "Certified in apiculture and fish farming, with practical knowledge of the daily routines behind healthy hives and ponds.",
        tags: ["Apiculture", "Fish Farming", "Certified"],
    },
    {
        number: "04",
        title: "Animal Health & Farm Care",
        description: "Animal health examination, feed formulation and farm structure management for healthier livestock and well-run farms.",
        tags: ["Health Checks", "Feed Formulation", "Farm Structures"],
    },
];

export function HomePage() {
    const [selectedProject, setSelectedProject] = useState<(typeof projects)[number] | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isMessageSent, setIsMessageSent] = useState(false);
    const [submitError, setSubmitError] = useState("");
    const heroEyebrowRef = useRef<HTMLSpanElement>(null);
    const heroFirstNameRef = useRef<HTMLSpanElement>(null);
    const heroLastNameRef = useRef<HTMLSpanElement>(null);
    const heroTitleRef = useRef<HTMLSpanElement>(null);
    const heroDescriptionRef = useRef<HTMLSpanElement>(null);
    const heroWorkLinkRef = useRef<HTMLSpanElement>(null);
    const heroContactLinkRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        initializeAnalytics();

        const typedInstances = [
            new Typed(heroEyebrowRef.current, {
                strings: ["Agriculture • Farming"],
                typeSpeed: 42,
                startDelay: 350,
                showCursor: false,
            }),
            new Typed(heroFirstNameRef.current, {
                strings: ["Leonard"],
                typeSpeed: 95,
                startDelay: 950,
                showCursor: false,
            }),
            new Typed(heroLastNameRef.current, {
                strings: ["Onjoro."],
                typeSpeed: 95,
                startDelay: 2100,
                showCursor: false,
            }),
            new Typed(heroTitleRef.current, {
                strings: ["Crop Production Professional", "Farm Team Coordinator", "Best Plot Manager", "Beekeeping & Fish Farming", "Animal Health & Feed Know-how"],
                typeSpeed: 55,
                backSpeed: 32,
                backDelay: 1500,
                startDelay: 3200,
                loop: true,
                showCursor: false,
            }),
            new Typed(heroDescriptionRef.current, {
                strings: ["I’m an agriculture professional focused on productive, sustainable, well-managed farming from furrow to harvest."],
                typeSpeed: 22,
                startDelay: 3900,
                showCursor: false,
            }),
            new Typed(heroWorkLinkRef.current, {
                strings: ["View my work"],
                typeSpeed: 45,
                startDelay: 5600,
                showCursor: false,
            }),
            new Typed(heroContactLinkRef.current, {
                strings: ["Let’s talk"],
                typeSpeed: 45,
                startDelay: 6300,
                showCursor: false,
            }),
        ];

        return () => typedInstances.forEach((instance) => instance.destroy());
    }, []);

    const handleContactSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsSubmitting(true);
        setSubmitError("");

        try {
            const response = await fetch("https://formsubmit.co/ajax/leonardonjoro@gmail.com", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                },
                body: new FormData(event.currentTarget),
            });

            if (!response.ok) {
                throw new Error("Message delivery failed");
            }

            event.currentTarget.reset();
            setIsMessageSent(true);
            trackEvent({ action: "contact_form_success", category: "engagement", label: "Contact form" });
        } catch {
            setSubmitError("That message could not be sent right now. Please try again or email me directly.");
        } finally {
            setIsSubmitting(false);
        }
    };

    useEffect(() => {
        if (!selectedProject) {
            return;
        }

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setSelectedProject(null);
            }
        };

        document.body.style.overflow = "hidden";
        window.addEventListener("keydown", handleKeyDown);

        return () => {
            document.body.style.overflow = "";
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [selectedProject]);

    return (
        <div className="min-h-screen overflow-hidden bg-sky-50 text-black">
            <Header />

            <main>
                {/* HERO */}
                <section
                    id="home"
                    className="site-section site-section--home relative flex min-h-[100svh] items-center overflow-hidden bg-[#f1ebe5] text-[#211714] dark:bg-[#211714] dark:text-[#f7f1eb] lg:h-screen"
                >
                    {/* Background decoration */}
                    <div className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-sky-300/30 blur-3xl" />

                    <div className="pointer-events-none absolute -right-32 bottom-10 h-96 w-96 rounded-full bg-sky-400/20 blur-3xl" />

                    <div className="mx-auto grid h-full w-full max-w-7xl grid-cols-1 items-center gap-10 px-5 py-24 sm:px-8 sm:py-28 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 lg:px-8 lg:py-0">
                        {/* INTRODUCTION */}
                        <motion.div
                            initial={{ opacity: 0, y: 35 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1.15, delay: 0.35 }}
                            className="relative z-10 order-2 lg:order-2"
                        >
                            <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-sky-600 sm:mb-6 sm:text-sm sm:tracking-[0.25em]">
                                <span ref={heroEyebrowRef} aria-label="Agriculture • Farming" />
                            </p>

                            <h1 className="font-sans text-4xl font-black leading-[0.9] tracking-[-0.06em] sm:text-6xl md:text-7xl lg:text-[88px]">
                                <span ref={heroFirstNameRef} aria-label="Leonard" />
                                <br />
                                <span ref={heroLastNameRef} className="text-sky-500" aria-label="Onjoro." />
                            </h1>

                            <p className="hero-typewriter" aria-live="polite">
                                <span ref={heroTitleRef} />
                                <span className="hero-typewriter__cursor" aria-hidden="true">|</span>
                            </p>

                            <p className="mt-6 max-w-xl text-base leading-7 text-slate-600 sm:mt-10 sm:text-lg sm:leading-8 md:text-xl">
                                <span ref={heroDescriptionRef} aria-label="I’m an agriculture professional focused on productive, sustainable, well-managed farming from furrow to harvest." />
                            </p>

                            <div className="mt-8 flex flex-wrap items-center gap-4 sm:mt-10 sm:gap-6">
                                <a
                                    href="#projects"
                                    className="rounded-full bg-black px-7 py-4 text-sm font-bold text-white transition duration-300 hover:-translate-y-1 hover:bg-sky-500"
                                >
                                    <span ref={heroWorkLinkRef} />
                                </a>

                                <a
                                    href="#contact"
                                    className="group text-sm font-bold"
                                >
                                    <span ref={heroContactLinkRef} />
                                    <span className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                                        ↗
                                    </span>
                                </a>
                            </div>
                        </motion.div>

                        {/* RIGHT VISUAL */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                            animate={{ opacity: 1, scale: 1, rotate: 5 }}
                            transition={{
                                duration: 0.9,
                                ease: [0.17, 0.67, 0.35, 1.15],
                            }}
                            className="hero-visual relative order-1 flex min-h-0 items-center justify-center lg:order-1"
                        >
                            <div className="hero-art relative w-[min(230px,62vw)] overflow-hidden rounded-[1.5rem] border border-black/10 bg-sky-400 p-2 shadow-2xl shadow-sky-900/15 sm:w-[min(280px,58vw)] sm:p-3 lg:w-[min(330px,100%)]">
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.92 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 1.4, ease: "easeOut" }}
                                    className="relative aspect-[0.78] overflow-hidden rounded-[1.1rem] bg-[#2b201c]"
                                >
                                    <motion.div
                                        animate={{ scale: [1, 1.08, 1], opacity: [0.35, 0.55, 0.35] }}
                                        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                                        className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-orange-500/30 blur-3xl"
                                    />
                                    <motion.div
                                        animate={{
                                            y: [0, -8, 0],
                                        }}
                                        transition={{
                                            duration: 10,
                                            repeat: Infinity,
                                            ease: "easeInOut",
                                        }}
                                        className="relative z-10 h-full w-full overflow-hidden"
                                    >
                                        <img
                                            src={`${import.meta.env.BASE_URL}images/leonard1.png`}
                                            alt="Leonard Onjoro"
                                            loading="eager"
                                            fetchPriority="high"
                                            className="h-full w-full object-cover object-center grayscale-[10%] transition duration-1000 hover:scale-105"
                                        />

                                        <div className="absolute inset-0 bg-gradient-to-t from-[#211714]/50 via-transparent to-orange-300/10" />
                                    </motion.div>
                                </motion.div>
                                <div className="flex items-center justify-between px-2 pt-3 text-xs font-black uppercase tracking-[0.2em] text-[#211714]">
                                    <span>Leonard Onjoro</span>
                                    <span className="text-2xl leading-none">↗</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* ABOUT / CV */}
                <section
                    id="about"
                    className="site-section site-section--about relative overflow-hidden bg-[#f7f3ed] py-24 text-[#211714] md:py-36"
                >

                    <div className="site-section__veil site-section__veil--about" />
                    <div className="pointer-events-none absolute -right-32 top-20 h-80 w-80 rounded-full bg-sky-300/20 blur-3xl" />
                    <div className="pointer-events-none absolute -left-40 bottom-20 h-96 w-96 rounded-full bg-amber-200/30 blur-3xl" />

                    <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
                        <motion.div
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.65 }}
                            className="mb-14 flex flex-col justify-between gap-8 border-b border-black/15 pb-8 md:flex-row md:items-end"
                        >
                            <div>
                                <p className="mb-5 text-sm font-black uppercase tracking-[0.25em] text-sky-600">
                                    About me / 01
                                </p>
                                <h2 className="max-w-3xl text-5xl font-black leading-[0.9] tracking-[-0.06em] md:text-7xl">
                                    Field-tested. <span className="whitespace-nowrap text-sky-500">Team-driven.</span>
                                </h2>
                            </div>
                            <p className="max-w-xs text-sm font-bold uppercase leading-6 tracking-[0.12em] text-black/55">
                                Leonard Onjoro<br />
                                Agriculture Professional<br />
                                <span className="normal-case tracking-normal">0768909480 | leonardonjoro@gmail.com</span>
                            </p>
                        </motion.div>

                        <a
                            href={`${import.meta.env.BASE_URL}resume/leonard-onjoro-cv.md`}
                            download
                            className="inline-flex w-fit items-center gap-2 rounded-full bg-black px-5 py-3 text-sm font-black text-white transition hover:-translate-y-1 hover:bg-sky-500 hover:text-black"
                        >
                            Download CV <span aria-hidden="true">↓</span>
                        </a>

                        <div className="grid gap-16 lg:grid-cols-[0.8fr_1.5fr]">
                            <motion.aside
                                initial={{ opacity: 0, x: -24 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, amount: 0.15 }}
                                transition={{ duration: 0.65 }}
                                className="space-y-10"
                            >
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.94 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true, amount: 0.2 }}
                                    transition={{ duration: 0.7, delay: 0.1 }}
                                    className="relative mx-auto w-fit max-w-full overflow-hidden rounded-[2rem] border border-black/10 bg-[#211714] shadow-xl shadow-sky-900/10"
                                >
                                    <img
                                        src={PHOTO}
                                        alt="Leonard Onjoro"
                                        className="block h-auto max-h-[36rem] w-auto max-w-full object-contain object-center grayscale-[10%] transition duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#211714]/75 via-transparent to-sky-300/10" />
                                    <p className="absolute bottom-5 left-5 text-xs font-black uppercase tracking-[0.2em] text-white">
                                        Leonard Onjoro
                                    </p>
                                </motion.div>

                                <div>
                                    <p className="cv-label">Career profile</p>
                                    <p className="mt-5 text-lg leading-8 text-black/70">
                                        Highly motivated and hardworking agriculture professional with practical experience in crop production, farm management, pest and disease control, irrigation, harvesting and agricultural equipment operations. Passionate about sustainable agriculture, improving farm productivity and contributing effectively to modern agricultural operations.
                                    </p>
                                </div>

                                <div>
                                    <p className="cv-label">Key skills</p>
                                    <div className="mt-5 flex flex-wrap gap-2">
                                        {["Farm Tools & Equipment", "Pest & Disease Control", "Weed Control", "Animal Health Examination", "Beekeeping", "Farm Structure Management", "Leadership", "Communication", "Teamwork"].map((skill) => (
                                            <span key={skill} className="cv-skill">{skill}</span>
                                        ))}
                                    </div>
                                </div>

                                <div className="border-l-4 border-sky-400 pl-5">
                                    <p className="text-sm font-black uppercase tracking-[0.15em] text-sky-600">Recognition</p>
                                    <p className="mt-3 text-xl font-bold leading-7">Team Coordinator and Best Plot Manager Award at AllPress Farms Ltd, UK.</p>
                                </div>
                            </motion.aside>

                            <div className="space-y-16">
                                <motion.div
                                    initial={{ opacity: 0, y: 24 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.15 }}
                                    transition={{ duration: 0.65 }}
                                >
                                    <p className="cv-label">Work history</p>
                                    <div className="mt-7 space-y-10 border-l border-black/20 pl-6 md:pl-8">
                                        <article className="relative">
                                            <span className="cv-timeline-dot" />
                                            <p className="text-sm font-black uppercase tracking-[0.14em] text-sky-600">Mar 2026 - Sep 2026</p>
                                            <h3 className="mt-2 text-2xl font-black">AllPress Farms Ltd</h3>
                                            <p className="mt-1 font-bold text-black/55">United Kingdom</p>
                                            <p className="mt-4 leading-7 text-black/65">Hands-on crop production covering ploughing, tilling, planting, topdressing, weed control, irrigation, pest control, rigging and harvesting, and crop processing.</p>
                                            <p className="mt-3 text-sm font-bold text-black/55">Achievement: Team Coordinator and winner of the Best Plot Manager Award.</p>
                                        </article>
                                    </div>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: 24 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.15 }}
                                    transition={{ duration: 0.65 }}
                                    className="grid gap-10 border-t border-black/15 pt-10 md:grid-cols-2"
                                >
                                    <div>
                                        <p className="cv-label">Education</p>
                                        <div className="mt-6 space-y-5 text-black/70">
                                            <div><p className="font-black text-black">Diploma in Information Communication Technology</p><p>Kitale National Polytechnic, 2023 - 2025</p></div>
                                            <div><p className="font-black text-black">Certificate of Secondary Education</p><p>Bujwang'a Secondary School, Funyula, 2018 - 2021</p></div>
                                            <div><p className="font-black text-black">Certificate of Primary Education</p><p>Bumbe Primary School, Funyula, 2013 - 2017</p></div>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="cv-label">Practical knowledge</p>
                                        <ul className="mt-6 space-y-3 text-lg font-bold text-black/70">
                                            <li>Apiculture (beekeeping)</li>
                                            <li>Fish farming</li>
                                            <li>Animal health examination</li>
                                            <li>Feed formulation</li>
                                            <li>Farm structure management</li>
                                        </ul>
                                    </div>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: 24 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.15 }}
                                    transition={{ duration: 0.65 }}
                                    className="grid gap-10 border-t border-black/15 pt-10 md:grid-cols-2"
                                >
                                    <div>
                                        <p className="cv-label">Farm operations</p>
                                        <ul className="mt-6 space-y-3 text-lg font-bold text-black/70">
                                            <li>Ploughing &amp; tilling</li>
                                            <li>Planting &amp; topdressing</li>
                                            <li>Weed, pest &amp; disease control</li>
                                            <li>Irrigation</li>
                                            <li>Rigging, harvesting &amp; processing</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <p className="cv-label">Certifications</p>
                                        <ul className="mt-6 space-y-3 text-black/70">
                                            <li>Apiculture</li>
                                            <li>Fish Farming</li>
                                            <li>Feed Formulation</li>
                                        </ul>
                                    </div>
                                </motion.div>


                            </div>
                        </div>
                    </div>
                </section>

                {/* SERVICES */}
                <section id="services" className="site-section services-section">
                    <img
                        src={`${import.meta.env.BASE_URL}images/services-bg.svg`}
                        alt="Rows of crops stretching toward the horizon"
                        loading="lazy"
                        className="services-section__background"
                    />
                    <div className="services-section__veil" />

                    <div className="relative mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-36">
                        <motion.div
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.7 }}
                            className="mb-14 max-w-3xl"
                        >
                            <p className="mb-6 text-sm font-black uppercase tracking-[0.25em] text-sky-300">
                                Services I offer / 02
                            </p>
                            <h2 className="text-5xl font-black leading-[0.9] tracking-[-0.06em] text-white md:text-7xl">
                                Good ground, <span className="text-sky-300">grown properly.</span>
                            </h2>
                            <p className="mt-7 max-w-xl text-lg leading-8 text-white/65">
                                From preparing the soil to the final harvest, I help turn farm plans into healthy crops and well-run operations.
                            </p>
                        </motion.div>

                        <div className="services-grid">
                            {services.map((service, index) => (
                                <motion.article
                                    key={service.number}
                                    initial={{ opacity: 0, y: 28 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.15 }}
                                    transition={{ duration: 0.55, delay: index * 0.1 }}
                                    className="service-card group"
                                >
                                    <div className="service-card__top">
                                        <span className="service-card__number">{service.number}</span>
                                        <span className="service-card__arrow" aria-hidden="true">↗</span>
                                    </div>
                                    <h3>{service.title}</h3>
                                    <p>{service.description}</p>
                                    <div className="service-card__tags">
                                        {service.tags.map((tag) => <span key={tag}>{tag}</span>)}
                                    </div>
                                </motion.article>
                            ))}
                        </div>
                    </div>
                </section>

                {/* PROJECTS */}
                <section
                    id="projects"
                    className="site-section site-section--projects bg-black py-28 text-white md:py-36"
                >

                    <div className="site-section__veil site-section__veil--projects" />
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="mb-16 flex flex-col justify-between gap-8 md:flex-row md:items-end">
                            <div>
                                <p className="mb-6 text-sm font-bold uppercase tracking-[0.25em] text-sky-400">
                                    Selected work
                                </p>

                                <h2 className="max-w-3xl text-5xl font-bold tracking-[-0.05em] md:text-7xl">
                                    Results that speak for themselves.
                                </h2>
                            </div>

                            <span className="text-sky-400">2026</span>
                        </div>

                        <div className="grid gap-6 md:grid-cols-3">
                            {projects.map((project, index) => (
                                <motion.article
                                    key={project.title}
                                    whileHover={{ y: -8 }}
                                    transition={{ duration: 0.25 }}
                                    className="project-card group overflow-hidden rounded-3xl bg-black"
                                >
                                    <button
                                        type="button"
                                        onClick={() => setSelectedProject(project)}
                                        className={`project-visual ${project.imageClass}`}
                                        aria-label={`Open ${project.title} details`}
                                    >
                                        <img
                                            src={project.image}
                                            alt=""
                                            loading="lazy"
                                            className="project-visual__image"
                                        />
                                        <span className="project-visual__grid" />
                                        <span className="project-visual__number">0{index + 1}</span>
                                        <span className="project-visual__open">View details ↗</span>
                                    </button>

                                    <div className="p-7">
                                        <p className="text-xs uppercase tracking-widest text-sky-400">
                                            {project.category}
                                        </p>

                                        <h3 className="mt-3 text-2xl font-bold">
                                            {project.shortTitle}
                                        </h3>

                                        <button
                                            type="button"
                                            onClick={() => setSelectedProject(project)}
                                            className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-white transition group-hover:gap-4"
                                        >
                                            Explore highlight <span aria-hidden="true">→</span>
                                        </button>
                                    </div>
                                </motion.article>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CONTACT */}
                <section
                    id="contact"
                    className="site-section contact-section bg-sky-400 py-24 md:py-32"
                >

                    <div className="site-section__veil site-section__veil--contact" />
                    <div className="mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-24 lg:px-8">
                        <div className="self-center">
                            <p className="mb-8 text-sm font-black uppercase tracking-[0.25em]">
                                Get in touch
                            </p>

                            <h2 className="max-w-2xl text-6xl font-black leading-[0.85] tracking-[-0.07em] md:text-8xl">
                                Need a hand?
                                <br />
                                <span className="text-white">Let’s grow.</span>
                            </h2>

                            <p className="mt-8 max-w-md text-lg leading-8 text-black/70">
                                Tell me about your farm, the work that needs doing, or the opportunity you have in mind.
                            </p>

                            <a
                                href="mailto:leonardonjoro@gmail.com"
                                className="mt-8 inline-flex items-center gap-2 text-sm font-black underline decoration-2 underline-offset-4 transition hover:gap-4"
                            >
                                leonardonjoro@gmail.com <span aria-hidden="true">↗</span>
                            </a>

                            <br />

                            <a
                                href="tel:0768909480"
                                className="mt-4 inline-flex items-center gap-2 text-sm font-black underline decoration-2 underline-offset-4 transition hover:gap-4"
                            >
                                0768909480 <span aria-hidden="true">↗</span>
                            </a>
                        </div>

                        <form
                            action="https://formsubmit.co/leonardonjoro@gmail.com"
                            method="POST"
                            onSubmit={handleContactSubmit}
                            className={`contact-form ${isMessageSent ? "contact-form--success" : ""}`}
                        >
                            {isMessageSent ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="contact-success"
                                    role="status"
                                >
                                    <div className="contact-success__confetti" aria-hidden="true">
                                        {Array.from({ length: 18 }, (_, index) => (
                                            <span key={index} style={{ "--confetti-index": index } as React.CSSProperties} />
                                        ))}
                                    </div>
                                    <span className="contact-success__burst" aria-hidden="true">✦</span>
                                    <p className="contact-success__eyebrow">Message received</p>
                                    <h3>GROW!</h3>
                                    <p className="contact-success__copy">Your message is on its way to Leonard. Thanks for reaching out.</p>
                                    <button
                                        type="button"
                                        className="contact-success__reset"
                                        onClick={() => setIsMessageSent(false)}
                                    >
                                        Send another message ↗
                                    </button>
                                </motion.div>
                            ) : (
                                <>
                                    <input type="hidden" name="_subject" value="New farm enquiry" />
                                    <input type="hidden" name="_template" value="table" />
                                    <input type="hidden" name="_captcha" value="false" />
                                    <input type="text" name="_honey" className="hidden" tabIndex={-1} autoComplete="off" />

                                    <div className="contact-form__row">
                                        <label>
                                            Your name
                                            <input type="text" name="name" placeholder="Jane Doe" required />
                                        </label>
                                        <label>
                                            Email address
                                            <input type="email" name="email" placeholder="jane@company.com" required />
                                        </label>
                                    </div>

                                    <label>
                                        Subject
                                        <input type="text" name="message_subject" placeholder="Let’s work together" required />
                                    </label>

                                    <label>
                                        Your message
                                        <textarea name="message" rows={6} placeholder="Tell me a little about what you need..." required />
                                    </label>

                                    <button
                                        type="submit"
                                        className="contact-form__submit"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? "Sending..." : "Send message"} {!isSubmitting && <span aria-hidden="true">↗</span>}
                                    </button>
                                    {submitError && <p className="contact-form__error" role="alert">{submitError}</p>}
                                </>
                            )}
                        </form>
                    </div>
                </section>
            </main>
            <Footer />

            {selectedProject && (
                <div
                    className="project-modal-backdrop"
                    role="presentation"
                    onClick={() => setSelectedProject(null)}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.92, y: 24 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.96, y: 12 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="project-modal-title"
                        className="project-modal"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <button
                            type="button"
                            onClick={() => setSelectedProject(null)}
                            className="project-modal__close"
                            aria-label="Close project details"
                        >
                            ×
                        </button>
                        <div className={`project-modal__visual project-visual ${selectedProject.imageClass}`}>
                            <img src={selectedProject.image} alt="" className="project-visual__image" />
                            <span className="project-visual__grid" />
                            <span className="project-visual__number">Project detail</span>
                        </div>
                        <div className="project-modal__content">
                            <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-500">{selectedProject.category}</p>
                            <h2 id="project-modal-title" className="mt-3 max-w-3xl text-3xl font-black leading-tight text-white md:text-5xl">{selectedProject.title}</h2>
                            <p className="mt-6 max-w-2xl text-base leading-8 text-white/65 md:text-lg">{selectedProject.description}</p>
                            <a
                                href="#contact"
                                onClick={() => setSelectedProject(null)}
                                className="mt-8 inline-flex items-center gap-3 rounded-full bg-sky-400 px-6 py-3 text-sm font-black text-black transition hover:bg-white hover:gap-5"
                            >
                                Let’s talk about it <span aria-hidden="true">↗</span>
                            </a>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );
}
