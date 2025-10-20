import { MdArrowDropDown } from "react-icons/md";

export interface MenuItemsProps {
  title: string;
  icon?: React.ElementType;
  isActive?: boolean;
  isExpanded?: boolean;
  hasSubmenu?: boolean;
  onItemClick?: () => void;
  isCollapsed?: boolean;
}

const menuItemClasses =
  "py-3 px-5 hover:bg-gray-700/50 rounded-md cursor-pointer flex items-center transition-colors duration-100 select-none "; /*instaed of reapeating the styles*/
const SidebarItem: React.FC<MenuItemsProps> = ({
  title,
  icon: Icon,
  isActive = false,
  isExpanded = false,
  hasSubmenu = false,
  onItemClick,
  isCollapsed = false,
}) => {
  /* react.fc shows that the menuItems is a functional component */
  return (
    <>
      <li
        className={`${menuItemClasses} ${
          isActive ? "bg-gray-700/75" : ""
        } w-full px-6`}
        onClick={onItemClick}
      >
        <div className="flex items-center">
          {Icon && (
            <Icon
              className={`inline-block ml-2 transition-all duartion-200 ${
                isCollapsed ? "text-2xl mx-auto" : "text-lg"
              }`}
            />
          )}
          <span
            className={`transition-all duration-200 ease-in-out ${
              isCollapsed ? "hidden" : "inline"
            }`}
          >
            {title}
          </span>
        </div>

        {hasSubmenu && (
          <span
            className={` mt-2 ml-4 transform transition-transform duration-300 ease-in-out ${
              isExpanded ? "rotate-180" : ""
            }`}
          >
            <MdArrowDropDown />
          </span>
        )}
      </li>
    </>
  );
};

export default SidebarItem;
