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
import { useState } from "react";
import { CiViewList } from "react-icons/ci";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { IoPersonAddOutline } from "react-icons/io5";

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

const menuContainerClasses =
  "w-60 h-screen bg-gray-600 text-white p-4 overflow-y-auto";

const menuCompanyName = "mb-4 font-semibold text-lg text-center";

const Sidebar = () => {
  const [activeid, setactiveid] = useState<string | null>(null);
  const [expandIds, setexpandIds] = useState<Set<string>>(new Set());
  const SidebarItemClickHandler = (itemId: string, hasSubmenu: boolean) => {
    setactiveid(
      itemId
    ); /*here it first sees if the hasSubmenu is true then using the prev we undestand which id is expanded then if it's already expanded we close it if not we open it */
    if (hasSubmenu) {
      setexpandIds((prev) => {
        const newSet = new Set(prev);
        if (newSet.has(itemId)) {
          newSet.delete(itemId);
        } else {
          newSet.add(itemId);
        }
        return newSet;
      });
    }
  };
  const renderMenuItems = (items: any[], level = 0) => {
    return items.map((item) => (
      <div key={item.id} className="w-full">
        <SidebarItem
          title={item.title}
          icon={item.icon}
          hasSubmenu={!!item.submenu} /*turns the item.submenu to boolean */
          isActive={activeid === item.id}
          isExpanded={expandIds.has(item.id)}
          onItemClick={() => SidebarItemClickHandler(item.id, !!item.submenu)}
        />

        {expandIds.has(item.id) && item.submenu && (
          <ul /*className={"ml-4 border-r-2 border-gray-500 w-full"}*/>
            {renderMenuItems(item.submenu, (level = level + 1))}
          </ul>
        )}
      </div>
    ));
  };
  return (
    <>
      <div className={menuContainerClasses}>
        <div className={menuCompanyName}>دات نرم افزار</div>
        <ul>{renderMenuItems(menuItems)}</ul>
      </div>
    </>
  );
};

export default Sidebar;
