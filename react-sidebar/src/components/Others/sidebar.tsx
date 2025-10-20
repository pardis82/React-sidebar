import SidebarItem from "./SidebarItem";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { GiMagnifyingGlass } from "react-icons/gi";
import { LuAlarmClockCheck } from "react-icons/lu";
import { IoPeopleOutline } from "react-icons/io5";
import { MdOutlineSell } from "react-icons/md";
import { RiCustomerService2Fill } from "react-icons/ri";
import { MdOutlineTextsms } from "react-icons/md";
import { BiPhoneCall } from "react-icons/bi";
import { HiOutlineMail } from "react-icons/hi";
import { GiNotebook } from "react-icons/gi";
import { MdComputer } from "react-icons/md";
import { MdManageAccounts } from "react-icons/md";
import { SiFramework } from "react-icons/si";
import { useState, useEffect } from "react";
import { CiViewList } from "react-icons/ci";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { IoPersonAddOutline } from "react-icons/io5";
import { ImMenu } from "react-icons/im";

const menuItems = [
  { title: "داشبود", icon: MdOutlineDashboardCustomize, id: "dashboard" },
  { title: "سرنخ", icon: GiMagnifyingGlass, id: "leads" },
  { title: "فرصت", icon: LuAlarmClockCheck, id: "oppurtunity" },
  { title: "مشتریان", icon: IoPeopleOutline, id: "customers" },
  {
    title: "فروش",
    icon: MdOutlineSell,
    id: "sales",
    submenu: [
      {
        title: "لیست فروش",
        icon: CiViewList,
        id: "sales-list",
        submenu: [
          {
            title: "سالیانه",
            id: "sales-list-yearly",
          },
        ],
      },
      {
        title: "گزارشات فروش",
        icon: HiOutlineDocumentReport,
        id: "sales-report",
      },
    ],
  },
  { title: "پشتیبانی", icon: RiCustomerService2Fill, id: "helpline" },
  { title: "پیامک", icon: MdOutlineTextsms, id: "sms" },
  { title: "تماس", icon: BiPhoneCall, id: "calls" },
  { title: "ایمیل", icon: HiOutlineMail, id: "email" },
  { title: "پروژه", icon: MdComputer, id: "project" },
  { title: "یادداشت", icon: GiNotebook, id: "notes" },
  {
    title: "وظایف",
    icon: MdManageAccounts,
    id: "responsibility",
    submenu: [
      {
        title: "فردی",
        icon: IoPersonAddOutline,
        id: "responsibility-personal",
      },
      {
        title: "تیمی",
        icon: IoPersonAddOutline,
        id: "responsibility-team",
      },
    ],
  },
  { title: "تنظیمات", icon: SiFramework, id: "settings" },
];

const Sidebar = () => {
  const [iscollapsed, setCollapsed] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setCollapsed(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [activeId, setactiveId] = useState<string | null>(null);
  const [expandIds, setexpandIds] = useState<Set<string>>(new Set());
  const SidebarItemClickHandler = (id: string, hasSubmenu: boolean) => {
    setactiveId(id);
    // if (!hasSubmenu)
    //   return; /*here it first sees if the hasSubmenu is true then using the prev we undestand which id is expanded then if it's already expanded we close it if not we open it */
    if (hasSubmenu && !iscollapsed)
      setexpandIds((prev) => {
        const newSet = new Set(prev);
        newSet.has(id) ? newSet.delete(id) : newSet.add(id);
        return newSet;
      });
    if (iscollapsed && hasSubmenu) {
      setCollapsed(false);
    }
  };

  const renderMenuItems = (items: any[], level = 0) => {
    return items.map((item) => (
      <ul
        key={item.id}
        className="w-full transition-all duration-300 ease-in-out"
        style={{ paddingRight: `${level * 16}px` }}
      >
        <SidebarItem
          title={item.title}
          icon={item.icon}
          hasSubmenu={!!item.submenu} /*turns the item.submenu to boolean */
          isActive={activeId === item.id}
          isExpanded={expandIds.has(item.id)}
          onItemClick={() => SidebarItemClickHandler(item.id, !!item.submenu)}
          isCollapsed={iscollapsed}
        />
        <div
          className={` transition-all duration-200 ease-in-out overflow-hidden ${
            expandIds.has(item.id)
              ? "max-h-96 opacity-100"
              : "max-h-0 opacity-0"
          }`}
        >
          {item.submenu && <ul>{renderMenuItems(item.submenu, level + 1)}</ul>}
        </div>
      </ul>
    ));
  };
  const menuContainerClasses = `bg-gray-600 text-white h-screen fixed top-0 right-0 flex flex-col transition-all duration-300 ease-in-out overflow-y-auto z-40
  lg:relative lg:translate-x-0 lg:w-60 lg:z-auto  ${
    iscollapsed ? "translate-x-full w-60" : "translate-x-0 w-60"
  } `;
  const menuCompanyName =
    "mb-4 mt-3 font-semibold text-lg text-center md:inline";
  return (
    <>
      {/* Mobile Overlay - Shows behind sidebar when open */}
      {!iscollapsed && (
        <div
          className="lg:hidden fixed inset-0  bg-opacity-50 z-30"
          onClick={() => setCollapsed(true)}
        />
      )}
      <div className="lg:hidden flex items-center fixed top-2 right-4 z-50 bg-gray-600 rounded-lg p-2 transition-all duration-200 ">
        <button
          className="lg:hidden z-50 text-white text-2xl "
          onClick={() => setCollapsed((prev) => !prev)}
        >
          <ImMenu />
        </button>
      </div>
      <div
        className={`${menuContainerClasses} fixed top-0 right-0 transition-transform duration-300 ease-in-out  ${
          iscollapsed ? "w-20" : "w-60"
        }`}
      >
        <div className={menuCompanyName}>دات نرم افزار</div>
        <div
          className="flex-1 overflow-y-auto [&::-webkit-scrollbar-track]:bg-gray-200
                [&::-webkit-scrollbar]:w-2
                [&::-webkit-scrollbar-thumb]:bg-gray-400
                [scrollbar-color:rgb(156_163_175)_rgb(74_85_101)]"
        >
          {renderMenuItems(menuItems)}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
