import { useState, useCallback, type ReactNode } from "react";
import { useLocation, Link } from "react-router-dom";
import clsx from "clsx";
import SidebarItem from "../Others/SidebarItem";
import { MdArrowBack } from "react-icons/md";

// ایمپورت کردن آیکون‌های یکپارچه از lucide-react
import {
  LayoutDashboard,
  Search,
  Target,
  Users,
  Tag,
  LifeBuoy,
  MessageSquare,
  Phone,
  Mail,
  Computer,
  Notebook,
  ClipboardCheck,
  Settings,
} from "lucide-react";

export type MenuItem = {
  path?: string;
  title: string;
  icon?: ReactNode;
  children?: MenuItem[]; // زیرمنو هم آرایه‌ای از همین نوع است
};

// دیتای نهایی با آیکون‌های lucide
export const sidebarData: MenuItem[] = [
  {
    title: "داشبورد",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        className="lucide lucide-layout-dashboard inline-block transition-all duration-200 text-lg ml-2"
        aria-hidden="true"
      >
        <rect width="7" height="9" x="3" y="3" rx="1"></rect>
        <rect width="7" height="5" x="14" y="3" rx="1"></rect>
        <rect width="7" height="9" x="14" y="12" rx="1"></rect>
        <rect width="7" height="5" x="3" y="16" rx="1"></rect>
      </svg>
    ),
    path: "/",
  },
  {
    title: "سرنخ",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        className="lucide lucide-search inline-block transition-all duration-200 text-lg ml-2"
        aria-hidden="true"
      >
        <path d="m21 21-4.34-4.34"></path>
        <circle cx="11" cy="11" r="8"></circle>
      </svg>
    ),
    path: "/leads",
  },
  {
    title: "فرصت",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        className="lucide lucide-target inline-block transition-all duration-200 text-lg ml-2"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="10"></circle>
        <circle cx="12" cy="12" r="6"></circle>
        <circle cx="12" cy="12" r="2"></circle>
      </svg>
    ),
    path: "/oppurtunity",
  },
  {
    title: "مشتریان",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        className="lucide lucide-users inline-block transition-all duration-200 text-lg ml-2"
        aria-hidden="true"
      >
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
        <path d="M16 3.128a4 4 0 0 1 0 7.744"></path>
        <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
        <circle cx="9" cy="7" r="4"></circle>
      </svg>
    ),
    path: "/customers",
  },
  {
    title: "فروش",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        className="lucide lucide-tag inline-block transition-all duration-200 text-lg ml-2"
        aria-hidden="true"
      >
        <path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z"></path>
        <circle cx="7.5" cy="7.5" r=".5" fill="currentColor"></circle>
      </svg>
    ),
    children: [
      {
        title: "لیست فروش",
        children: [{ title: "سالیانه", path: "/sales/list/yearly" }],
      },
      { title: "گزارشات فروش", path: "/sales/report" },
    ],
  },
  {
    title: "پشتیبانی",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        className="lucide lucide-life-buoy inline-block transition-all duration-200 text-lg ml-2"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="10"></circle>
        <path d="m4.93 4.93 4.24 4.24"></path>
        <path d="m14.83 9.17 4.24-4.24"></path>
        <path d="m14.83 14.83 4.24 4.24"></path>
        <path d="m9.17 14.83-4.24 4.24"></path>
        <circle cx="12" cy="12" r="4"></circle>
      </svg>
    ),
    path: "/helpline",
  },
  {
    title: "پیامک",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        className="lucide lucide-message-square inline-block transition-all duration-200 text-lg ml-2"
        aria-hidden="true"
      >
        <path d="M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z"></path>
      </svg>
    ),
    path: "/sms",
  },
  {
    title: "تماس",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        className="lucide lucide-phone inline-block transition-all duration-200 text-lg ml-2"
        aria-hidden="true"
      >
        <path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"></path>
      </svg>
    ),
    path: "/calls",
  },
  {
    title: "ایمیل",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        className="lucide lucide-mail inline-block transition-all duration-200 text-lg ml-2"
        aria-hidden="true"
      >
        <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"></path>
        <rect x="2" y="4" width="20" height="16" rx="2"></rect>
      </svg>
    ),
    path: "/email",
  },
  {
    title: "پروژه",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        className="lucide lucide-computer inline-block transition-all duration-200 text-lg ml-2"
        aria-hidden="true"
      >
        <rect width="14" height="8" x="5" y="2" rx="2"></rect>
        <rect width="20" height="8" x="2" y="14" rx="2"></rect>
        <path d="M6 18h2"></path>
        <path d="M12 18h6"></path>
      </svg>
    ),
    path: "/project",
  },
  {
    title: "یادداشت",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        className="lucide lucide-notebook inline-block transition-all duration-200 text-lg ml-2"
        aria-hidden="true"
      >
        <path d="M2 6h4"></path>
        <path d="M2 10h4"></path>
        <path d="M2 14h4"></path>
        <path d="M2 18h4"></path>
        <rect width="16" height="20" x="4" y="2" rx="2"></rect>
        <path d="M16 2v20"></path>
      </svg>
    ),
    path: "/notes",
  },
  {
    title: "وظایف",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        className="lucide lucide-clipboard-check"
        aria-hidden="true"
      >
        <rect width="8" height="4" x="8" y="2" rx="1" ry="1"></rect>
        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
        <path d="m9 14 2 2 4-4"></path>
      </svg>
    ),
    children: [
      { title: "فردی", path: "/responsibility/personal" },
      { title: "تیمی", path: "/responsibility/team" },
    ],
  },
  {
    title: "تنظیمات",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        className="lucide lucide-settings inline-block transition-all duration-200 text-lg ml-2"
        aria-hidden="true"
      >
        <path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"></path>
        <circle cx="12" cy="12" r="3"></circle>
      </svg>
    ),
    path: "/settings",
  },
];

export const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>(
    {}
  );
  const location = useLocation();
  const activePath = location.pathname;

  const toggleCollapse = () => setIsCollapsed((prev) => !prev);

  const handleItemClick = useCallback(
    (itemTitle: string, hasChildren: boolean) => {
      if (hasChildren) {
        setExpandedItems((prev) => ({
          ...prev,
          [itemTitle]: !prev[itemTitle],
        }));
      }
    },
    []
  );

  const renderItems = (items: MenuItem[], level: number = 0) => {
    return (
      <ul className={clsx("flex flex-col gap-y-0.5", level > 0 && "mt-1")}>
        {items.map((item) => {
          const isActive = activePath === item.path;
          const isExpanded = !!expandedItems[item.title];
          const hasSubmenu = !!item.children && item.children.length > 0;

          const content = (
            <SidebarItem
              title={item.title}
              icon={item.icon}
              isActive={isActive}
              isExpanded={isExpanded}
              hasSubmenu={hasSubmenu}
              isCollapsed={isCollapsed}
              level={level}
              onItemClick={() => handleItemClick(item.title, hasSubmenu)}
            />
          );

          return (
            <div key={item.title}>
              {item.path ? (
                <Link to={item.path}>{content}</Link>
              ) : (
                <div>{content}</div>
              )}
              {hasSubmenu &&
                isExpanded &&
                !isCollapsed &&
                renderItems(item.children!, level + 1)}
            </div>
          );
        })}
      </ul>
    );
  };

  return (
    <nav
      className={clsx(
        "flex flex-col h-full transition-all duration-300",
        // استایل تم روشن
        "bg-white border-r border-gray-200 text-gray-700", // (برای سایدبار راست‌چین)
        isCollapsed ? "w-20" : "w-64",
        // اسکرول به خود nav منتقل شد تا پدینگ‌ها تداخل نکنند
        "overflow-y-auto sidebar-body"
      )}
    >
      {/* پدینگ‌ها به هدر و فوتر منتقل شدند */}
      <div className="flex items-center justify-between mb-6 px-4 pt-4">
        {!isCollapsed && (
          <span className="text-xl font-bold text-gray-900">CRM شما</span>
        )}
        <button
          onClick={toggleCollapse}
          className="p-1 rounded-md text-gray-500 hover:bg-gray-100"
        >
          <MdArrowBack
            className={clsx(
              "transition-transform duration-300",
              isCollapsed && "rotate-180"
            )}
          />
        </button>
      </div>

      {/* این div دیگر اسکرول ندارد */}
      <div className="flex-1">{renderItems(sidebarData, 0)}</div>

      {/* <div className="mt-auto px-4 pb-4"> ... فوتر ... </div> */}
    </nav>
  );
};

export default Sidebar;
