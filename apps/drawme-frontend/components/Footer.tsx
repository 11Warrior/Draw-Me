const Footer = () => {
  return (
    <footer className="border-t border-border px-6 py-10">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 sm:flex-row">
        <div className="flex items-center gap-2">
          <span className="font-display text-2xl text-foreground">Drawme</span>
        </div>
        <div className="flex items-center gap-6 text-sm text-muted-foreground">
          <a href="#" className="transition-colors hover:text-foreground">GitHub</a>
          <a href="#" className="transition-colors hover:text-foreground">Docs</a>
          <a href="#" className="transition-colors hover:text-foreground">Twitter</a>
        </div>
        <p className="text-sm text-muted-foreground">
          Made with love for sketchers everywhere
        </p>
      </div>
    </footer>
  );
};

export default Footer;
