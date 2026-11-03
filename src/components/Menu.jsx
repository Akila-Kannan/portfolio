export const Menu = (props) => {
  const { onSectionChange, menuOpened, setMenuOpened } = props;

  return (
    <>
      <button
        onClick={() => setMenuOpened(!menuOpened)}
        aria-label={menuOpened ? "Close navigation" : "Open navigation"}
        aria-expanded={menuOpened}
        className="menu-toggle"
      >
        <div
          className={`bg-white h-0.5 rounded-md w-full transition-all ${
            menuOpened ? "rotate-45  translate-y-0.5" : ""
          }`}
        />
        <div
          className={`bg-white h-0.5 rounded-md w-full my-1 ${
            menuOpened ? "hidden" : ""
          }`}
        />
        <div
          className={`bg-white h-0.5 rounded-md w-full transition-all ${
            menuOpened ? "-rotate-45" : ""
          }`}
        />
      </button>
      <nav className={`menu-panel ${menuOpened ? "open" : "closed"}`} aria-label="Main navigation" aria-hidden={!menuOpened}>
        <span className="eyebrow">Akila Kannan · Portfolio</span>
        <MenuButton label="About" onClick={() => onSectionChange(0)} />
        <MenuButton label="Skills" onClick={() => onSectionChange(1)} />
        <MenuButton label="Projects" onClick={() => onSectionChange(2)} />
        <MenuButton label="Contact" onClick={() => onSectionChange(3)} />
        <span className="mt-8 text-sm text-white/40">Game developer · India</span>
      </nav>
    </>
  );
};

const MenuButton = (props) => {
  const { label, onClick } = props;
  return (
    <button
      onClick={onClick}
      className="menu-link"
    >
      {label}
    </button>
  );
};
