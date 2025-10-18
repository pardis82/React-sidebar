/*for displaying the menu items only we've created a seprate componenet*/
import { MdArrowDropDown } from "react-icons/md";

interface menuItems {
  title: string;
  icon: React.ElementType;
  id: string;
  submenu?: menuItems[];
  isActive?: boolean;
  isExpanded?: boolean;
  hasSubmenu?: boolean;
  onItemClick?: () => void;
}
const menuItemClasses =
  "py-2 px-3 hover:bg-gray-700 rounded-md cursor-pointer flex items-center"; /*instaed of reapeating the styles*/
const SidebarItem: React.FC<menuItems> = ({
  title,
  icon: Icon,
  id,
  submenu,
  isActive = false,
  isExpanded = false,
  hasSubmenu = false,
  onItemClick,
}) => {
  /* react.fc shows that the menuItems is a functional component */
  return (
    <>
      <li
        className={`${menuItemClasses} ${isActive ? "bg-gray-700" : ""} ${
          hasSubmenu ? "justify-between" : ""
        }`}
        onClick={onItemClick}
      >
        <div className="flex items-center">
          <Icon className="inline-block ml-2" />
          {title}
        </div>

        {hasSubmenu && (
          <span
            className={`transform transition-transform ${
              isExpanded ? "rotate-180" : ""
            }`}
          >
            <MdArrowDropDown />
          </span>
        )}
      </li>

      {isExpanded && hasSubmenu && (
        <ul className="ml-4 border-r-2 border-gray-500">
          {submenu?.map((subitem) => (
            <SidebarItem
              key={subitem.id}
              title={subitem.title}
              icon={subitem.icon}
              id={subitem.id}
              hasSubmenu={!!subitem.submenu}
              isActive={false}
              isExpanded={false}
              onItemClick={onItemClick}
              submenu={subitem.submenu}
            />
          ))}
        </ul>
      )}
    </>
  );
};

export default SidebarItem;
