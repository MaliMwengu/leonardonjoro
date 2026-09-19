const footerLinks = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Farm Work", href: "#projects" },
    { label: "Contact", href: "#contact" },
];

export function Footer() {
    return (
        <footer className="border-t border-black/10 bg-sky-50 text-black dark:border-white/10 dark:bg-black dark:text-white">
            <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
                <div className="grid gap-12 md:grid-cols-3">
                    {/* Brand */}
                    <div>
                        <a
                            href="#home"
                            className="inline-flex items-center gap-3"
                        >
                            <span className="grid h-11 w-11 place-items-center rounded-full bg-black text-sm font-black text-sky-400 dark:bg-sky-400 dark:text-black">
                                LO
                            </span>

                            <span className="text-sm font-black tracking-[0.15em]">
                                LEONARD ONJORO
                            </span>
                        </a>

                        <p className="mt-6 max-w-sm leading-7 text-black/60 dark:text-white/60">
                            Agriculture professional growing productive, sustainable
                            and well-managed farm operations.
                        </p>
                    </div>

                    {/* Navigation */}
                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-sky-500">
                            Navigation
                        </h3>

                        <nav className="mt-5 grid grid-cols-2 gap-3">
                            {footerLinks.map((link) => (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    className="text-sm text-black/60 transition hover:text-sky-500 dark:text-white/60 dark:hover:text-sky-400"
                                >
                                    {link.label}
                                </a>
                            ))}
                        </nav>
                    </div>

                    {/* Connect */}
                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-sky-500">
                            Connect
                        </h3>

                        <div className="mt-5 flex flex-col gap-3">
                            <a
                                href="mailto:leonardonjoro@gmail.com"
                                className="text-sm text-black/60 transition hover:text-sky-500 dark:text-white/60 dark:hover:text-sky-400"
                            >
                                Email ↗
                            </a>

                            <a
                                href="tel:0768909480"
                                className="text-sm text-black/60 transition hover:text-sky-500 dark:text-white/60 dark:hover:text-sky-400"
                            >
                                Call ↗
                            </a>

                            <a
                                href="#projects"
                                className="text-sm text-black/60 transition hover:text-sky-500 dark:text-white/60 dark:hover:text-sky-400"
                            >
                                View my work ↗
                            </a>
                        </div>
                    </div>
                </div>

                <div className="mt-14 flex flex-col gap-4 border-t border-black/10 pt-6 text-xs text-black/50 dark:border-white/10 dark:text-white/40 sm:flex-row sm:items-center sm:justify-between">
                    <p>
                        © {new Date().getFullYear()} Leonard Onjoro. All rights reserved.
                    </p>

                    <p>
                        Built with React + TypeScript
                    </p>
                </div>
            </div>
        </footer>
    );
}