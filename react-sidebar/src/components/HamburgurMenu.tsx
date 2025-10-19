interface HamburgurMenuProps {
  isOpen: boolean;
  onToggle: () => void;
}

const HamburgurMenu = ({ isOpen, onToggle }: HamburgurMenuProps) => {
  return (
    <button
      className="lg:hidden fixed top-4 right-4 z-50 p-2 rounded-md bg-gray-600 text-white"
      onClick={onToggle}
    >
      <div className="w-6 h-6 flex flex-col justify-between">
        <span
          className={`block h-0.5 w-full bg-white transform transition duration-300 ease-in-out ${
            isOpen ? "rotate-45 translate-y-2.5" : ""
          }`}
        />
        <span
          className={`block h-0.5 w-full bg-white transition duration-300 ease-in-out ${
            isOpen ? "opacity-0" : "opacity-100"
          }`}
        />
        <span
          className={`block h-0.5 w-full bg-white transform transition duration-300 ease-in-out ${
            isOpen ? "-rotate-45 -translate-y-2.5" : ""
          }`}
        />
      </div>
    </button>
  );
};

export default HamburgurMenu;
