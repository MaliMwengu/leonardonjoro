import { useEffect, useState } from "react";

const navigation = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Farm Work", href: "#projects" },
    { label: "Contact", href: "#contact" },
];

export function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const [showTopButton, setShowTopButton] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

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
                        onClick={() => setMenuOpen(false)}
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
                                className="site-nav-link text-sm font-medium text-black/60 transition hover:text-black dark:text-white/60 dark:hover:text-white"
                            >
                                {item.label}
                            </a>
                        ))}

                        {/* Theme toggle */}
                        <button
                            type="button"
                            onClick={toggleTheme}
                            aria-label="Toggle dark mode"
                            className="grid h-10 w-10 place-items-center rounded-full border border-black/10 bg-white text-lg transition hover:-translate-y-0.5 hover:bg-leaf-400 dark:border-white/10 dark:bg-white/10"
                        >
                            {darkMode ? "☀️" : "🌙"}
                        </button>

                        <a
                            href="#contact"
                            className="rounded-full bg-soil-900 px-5 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-leaf-500 hover:text-black dark:bg-leaf-400 dark:text-black dark:hover:bg-white"
                        >
                            Let's talk
                        </a>
                    </nav>

                    {/* Mobile controls */}
                    <div className="flex items-center gap-3 md:hidden">
                        <button
                            type="button"
                            onClick={toggleTheme}
                            aria-label="Toggle dark mode"
                            className="grid h-10 w-10 place-items-center rounded-full bg-soil-900 text-lg dark:bg-leaf-400"
                        >
                            {darkMode ? "☀️" : "🌙"}
                        </button>

                        <button
                            type="button"
                            aria-label="Toggle navigation"
                            aria-expanded={menuOpen}
                            onClick={() => setMenuOpen((current) => !current)}
                            className="relative grid h-11 w-11 place-items-center rounded-full bg-soil-900 dark:bg-leaf-400"
                        >
                            <span className="flex flex-col gap-1.5">
                                <span
                                    className={`block h-0.5 w-5 bg-leaf-400 transition ${menuOpen
                                        ? "translate-y-1 rotate-45"
                                        : ""
                                        } dark:bg-soil-950`}
                                />

                                <span
                                    className={`block h-0.5 w-5 bg-leaf-400 transition ${menuOpen
                                        ? "-translate-y-1 -rotate-45"
                                        : ""
                                        } dark:bg-soil-950`}
                                />
                            </span>
                        </button>
                    </div>
                </div>

                {/* Mobile menu */}
                <div
                    className={`overflow-hidden border-t border-black/10 bg-[#f1ebe5] transition-all duration-300 dark:border-white/10 dark:bg-[#211714] md:hidden ${menuOpen
                        ? "max-h-[500px] opacity-100"
                        : "max-h-0 opacity-0"
                        }`}
                >
                    <nav className="mx-auto flex max-w-7xl flex-col px-6 py-5">
                        {navigation.map((item, index) => (
                            <a
                                key={item.label}
                                href={item.href}
                                onClick={() => setMenuOpen(false)}
                                className="flex items-center justify-between border-b border-black/10 py-4 text-lg font-semibold dark:border-white/10 dark:text-white"
                            >
                                <span>{item.label}</span>
                                <span className="text-leaf-500">
                                    0{index + 1}
                                </span>
                            </a>
                        ))}

                        <a
                            href="#contact"
                            onClick={() => setMenuOpen(false)}
                            className="mt-5 rounded-full bg-soil-900 px-6 py-4 text-center text-sm font-bold text-white dark:bg-leaf-400 dark:text-black"
                        >
                            Let's talk →
                        </a>
                    </nav>
                </div>
            </header>

            {/* Back to top */}
            <button
                type="button"
                onClick={scrollToTop}
                aria-label="Return to top"
                className={`fixed bottom-6 right-6 z-50 grid h-12 w-12 place-items-center rounded-full bg-soil-900 text-xl text-leaf-400 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:bg-leaf-400 hover:text-black dark:bg-leaf-400 dark:text-black dark:hover:bg-white ${showTopButton
                    ? "translate-y-0 opacity-100"
                    : "pointer-events-none translate-y-5 opacity-0"
                    }`}
            >
                ↑
            </button>
        </>
    );
}