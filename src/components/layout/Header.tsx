import { useEffect, useState } from "react";

const navigation = [
    { label: "Home", href: "#home", icon: "home" },
    { label: "About", href: "#about", icon: "about" },
    { label: "Services", href: "#services", icon: "services" },
    { label: "Farm Work", href: "#projects", icon: "work" },
    { label: "Contact", href: "#contact", icon: "contact" },
];

function NavigationIcon({ name }: { name: string }) {
    const paths = {
        home: "M3 10.5 12 3l9 7.5M5.5 9.5V21h13V9.5M9 21v-6h6v6",
        about: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-7 9a7 7 0 0 1 14 0",
        services: "M5 5h14M5 12h14M5 19h14M2.5 5h.01M2.5 12h.01M2.5 19h.01",
        work: "m12 3 1.4 5.6L19 10l-5.6 1.4L12 17l-1.4-5.6L5 10l5.6-1.4L12 3Zm7 13 .6 2.4L22 19l-2.4.6L19 22l-.6-2.4L16 19l2.4-.6L19 16Z",
        contact: "M4 5h16v14H4zM4 7l8 6 8-6",
    };

    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d={paths[name as keyof typeof paths]} />
        </svg>
    );
}

export function Header() {
    const [darkMode, setDarkMode] = useState(false);
    const [showTopButton, setShowTopButton] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState("home");

    // Load saved theme
    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");

        if (savedTheme === "dark") {
            setDarkMode(true);
            document.documentElement.classList.add("dark");
        }
    }, []);

    // Handle scroll
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 24);
            setShowTopButton(window.scrollY > 500);
        };

        handleScroll();
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    useEffect(() => {
        const sections = navigation
            .map((item) => document.querySelector(item.href))
            .filter((section): section is Element => Boolean(section));

        const updateActiveSection = () => {
            const marker = window.innerHeight * 0.35;
            const currentSection = sections
                .filter((section) => section.getBoundingClientRect().top <= marker)
                .at(-1);

            setActiveSection(currentSection?.id ?? "home");
        };

        updateActiveSection();
        window.addEventListener("scroll", updateActiveSection, { passive: true });
        window.addEventListener("resize", updateActiveSection);

        return () => {
            window.removeEventListener("scroll", updateActiveSection);
            window.removeEventListener("resize", updateActiveSection);
        };
    }, []);

    // Toggle dark/light mode
    const toggleTheme = () => {
        setDarkMode((current) => {
            const nextTheme = !current;

            if (nextTheme) {
                document.documentElement.classList.add("dark");
                localStorage.setItem("theme", "dark");
            } else {
                document.documentElement.classList.remove("dark");
                localStorage.setItem("theme", "light");
            }

            return nextTheme;
        });
    };

    // Scroll to top
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <>
            <header
                className={`site-header ${isScrolled ? "site-header--scrolled" : ""}`}
            >
                <div className="mx-auto flex min-h-20 max-w-7xl items-center justify-between px-6 lg:px-8">

                    {/* Logo */}
                    <a
                        href="#home"
                        className="group flex items-center gap-3"
                    >
                        <span className="logo-mark" aria-hidden="true">
                            <span className="logo-mark__core">L. Onjoro</span>
                            <span className="logo-mark__bar logo-mark__bar--one" />
                            <span className="logo-mark__bar logo-mark__bar--two" />
                            <span className="logo-mark__bar logo-mark__bar--three" />
                        </span>

                        <span className="logo-name" aria-label="L. Onjoro">
                            <span className="logo-name__base"></span>
                            <span className="logo-name__liquid" aria-hidden="true">L. Onjoro</span>
                        </span>
                    </a>

                    {/* Desktop Navigation */}
                    <nav className="hidden items-center gap-7 md:flex">
                        {navigation.map((item) => (
                            <a
                                key={item.label}
                                href={item.href}
                                aria-current={activeSection === item.href.slice(1) ? "page" : undefined}
                                className={`site-nav-link text-sm font-medium transition hover:text-black dark:hover:text-white ${activeSection === item.href.slice(1)
                                    ? "text-sky-600 dark:text-sky-300"
                                    : "text-black/60 dark:text-white/60"
                                    }`}
                            >
                                {item.label}
                            </a>
                        ))}

                        {/* Theme toggle */}
                        <button
                            type="button"
                            onClick={toggleTheme}
                            aria-label="Toggle dark mode"
                            className="grid h-10 w-10 place-items-center rounded-full border border-black/10 bg-white text-lg transition hover:-translate-y-0.5 hover:bg-sky-400 dark:border-white/10 dark:bg-white/10"
                        >
                            {darkMode ? "☀️" : "🌙"}
                        </button>

                        <a
                            href="#contact"
                            className="rounded-full bg-black px-5 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-sky-500 hover:text-black dark:bg-sky-400 dark:text-black dark:hover:bg-white"
                        >
                            Let's talk
                        </a>
                    </nav>

                </div>
            </header>

            <nav className="mobile-bottom-nav md:hidden" aria-label="Mobile navigation">
                {navigation.map((item) => (
                    <a
                        key={item.label}
                        href={item.href}
                        className={`mobile-bottom-nav__link ${activeSection === item.href.slice(1) ? "mobile-bottom-nav__link--active" : ""}`}
                        aria-label={item.label}
                        aria-current={activeSection === item.href.slice(1) ? "page" : undefined}
                    >
                        <NavigationIcon name={item.icon} />
                    </a>
                ))}
            </nav>

            {/* Back to top */}
            <button
                type="button"
                onClick={scrollToTop}
                aria-label="Return to top"
                className={`fixed bottom-6 right-6 z-50 grid h-12 w-12 place-items-center rounded-full bg-black text-xl text-sky-400 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:bg-sky-400 hover:text-black dark:bg-sky-400 dark:text-black dark:hover:bg-white ${showTopButton
                    ? "translate-y-0 opacity-100"
                    : "pointer-events-none translate-y-5 opacity-0"
                    }`}
            >
                ↑
            </button>
        </>
    );
}