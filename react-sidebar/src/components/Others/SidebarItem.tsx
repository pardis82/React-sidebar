import { MdArrowDropDown } from "react-icons/md";
import clsx from "clsx";
import type { ReactNode } from "react";

export interface MenuItemsProps {
  title: string;
  icon?: ReactNode;
  isActive?: boolean;
  isExpanded?: boolean;
  hasSubmenu?: boolean;
  onItemClick?: () => void;
  isCollapsed?: boolean;
  level: number;
}

const SidebarItem: React.FC<MenuItemsProps> = ({
  title,
  icon,
  isActive = false,
  isExpanded = false,
  hasSubmenu = false,
  onItemClick,
  isCollapsed = false,
  level = 0,
}) => {
  // محاسبات پدینگ داینامیک
  const basePadding = 1; // 1rem (معادل px-4)
  const indentPerLevel = 0.75; // 0.75rem (معادل pr-3)

  const dynamicPaddingRight = isCollapsed
    ? `${basePadding}rem`
    : `${basePadding + level * indentPerLevel}rem`;
  const basePaddingLeft = `${basePadding}rem`;

  return (
    <li
      className={clsx(
        "w-full rounded-md cursor-pointer transition-colors duration-150 select-none",
        "py-2.5", // پدینگ عمودی
        "relative", // برای نشانگر

        // منطق رنگ‌بندی تم لایت
        isActive
          ? "bg-purple-50 text-purple-700" // فعال
          : "text-gray-600 hover:bg-gray-100 hover:text-gray-900" // غیرفعال
      )}
      onClick={onItemClick}
    >
      {/* نشانگر (Indicator) برای RTL (سمت راست) */}
      {isActive && (
        <div
          className={clsx(
            "absolute right-0 top-0 h-full w-1 rounded-r-md",
            "bg-purple-600" // رنگ برند
          )}
        />
      )}

      {/* div داخلی برای مدیریت پدینگ (تورفتگی) */}
      <div
        className={clsx(
          "flex items-center w-full",
          isCollapsed ? "justify-center" : "justify-between"
        )}
        style={{
          paddingRight: dynamicPaddingRight,
          paddingLeft: basePaddingLeft,
        }}
      >
        {/* بخش آیکون و عنوان */}
        <div className="flex items-center">
          {icon && (
            // از یک span به عنوان Wrapper استفاده می‌کنیم
            // تا کلاس‌های مربوط به اندازه و فاصله را اعمال کنیم
            <span
              className={clsx(
                "inline-block transition-all duration-200",
                // به جای text-size، از w/h استفاده می‌کنیم تا اندازه SVG را کنترل کنیم
                isCollapsed ? "w-6 h-6" : "w-5 h-5 ml-2"
              )}
            >
              {icon} {/* <- آیکون مستقیماً اینجا رندر می‌شود */}
            </span>
          )}
          <span
            className={clsx(
              "transition-opacity duration-200 ease-in-out",
              isCollapsed ? "opacity-0 hidden" : "opacity-100 inline"
            )}
          >
            {title}
          </span>
        </div>

        {/* فلش زیرمنو */}
        {hasSubmenu && !isCollapsed && (
          <span
            className={clsx(
              "transform transition-transform duration-300 ease-in-out",
              isExpanded ? "rotate-180" : ""
            )}
          >
            <MdArrowDropDown size={20} />
          </span>
        )}
      </div>
    </li>
  );
};

export default SidebarItem;
