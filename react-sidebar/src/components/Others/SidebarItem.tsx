import { MdArrowDropDown } from "react-icons/md";
interface menuItems {
  title: string;
  icon?: React.ElementType;
  id: string;
  submenu?: menuItems[];
}
interface menuItemsProps {
  title: string;
  icon?: React.ElementType;
  isActive?: boolean;
  isExpanded?: boolean;
  hasSubmenu?: boolean;
  onItemClick?: () => void;
}
const menuItemClasses =
  "py-3 px-5 hover:bg-gray-700/50 rounded-md cursor-pointer flex items-center "; /*instaed of reapeating the styles*/
const SidebarItem: React.FC<menuItemsProps> = ({
  title,
  icon: Icon,
  isActive = false,
  isExpanded = false,
  hasSubmenu = false,
  onItemClick,
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
          {Icon && <Icon className="inline-block ml-2" />}
          {title}
        </div>

        {hasSubmenu && (
          <span
            className={` mt-2 ml-4 transform transition-transform ${
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
