"use client"
import { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
    const [open, setOpen] = useState(false);

    return (
        <nav className="fixed top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-md">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
                <a href="/" className="flex items-center gap-2">
                    <span className="font-(--font-caveat) text-3xl text-foreground">Drawme</span>
                </a>

                <div className="hidden items-center gap-6 md:flex">
                    <a href="#" className="text-lg text-muted-foreground transition-colors hover:text-foreground">Features</a>
                    <a href="#" className="text-lg text-muted-foreground transition-colors hover:text-foreground">Docs</a>
                    <a href="#" className="text-lg text-muted-foreground transition-colors hover:text-foreground">GitHub</a>
                    <a href="#" className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.02] active:scale-[0.98]">Start drawing</a>
                </div>

                <button
                    className="text-foreground md:hidden"
                    onClick={() => setOpen(!open)}
                    aria-label="Toggle menu"
                >
                    {open ? <X size={22} /> : <Menu size={22} />}
                </button>
            </div>

            {open && (
                <div className="flex flex-col gap-3 border-t border-border bg-background px-6 py-4 md:hidden">
                    <a href="#" className="text-sm text-muted-foreground">Features</a>
                    <a href="#" className="text-sm text-muted-foreground">Docs</a>
                    <a href="#" className="text-sm text-muted-foreground">GitHub</a>
                    <a
                        href="#"
                        className="mt-1 inline-block rounded-lg bg-primary px-4 py-2 text-center text-sm font-semibold text-primary-foreground"
                    >
                        Start drawing
                    </a>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
