import SidebarItem from "./sidebaritem";
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

const menuItems = [
  { title: "داشبود", icon: MdOutlineDashboardCustomize },
  { title: "سرنخ", icon: GiMagnifyingGlass },
  { title: "فرصت", icon: LuAlarmClockCheck },
  { title: "مشتریان", icon: IoPeopleOutline },
  { title: "فروش", icon: MdOutlineSell },
  { title: "پشتیبانی", icon: RiCustomerService2Fill },
  { title: "پیامک", icon: MdOutlineTextsms },
  { title: "تماس", icon: BiPhoneCall },
  { title: "ایمیل", icon: HiOutlineMail },
  { title: "پروژه", icon: MdComputer },
  { title: "یادداشت", icon: GiNotebook },
  { title: "وظایف", icon: MdManageAccounts },
  { title: "تنظیمات", icon: SiFramework },
];

  const menuContainerClasses =
    "w-40 h-screen bg-gray-600 text-white p-4 overflow-y-auto";

    const menuCompanyName = "mb-4 font-semibold text-lg text-center";
const Sidebar = () => {
  return (
    <>
      <div className={menuContainerClasses}>
        <div className={menuCompanyName}>دات نرم افزار</div>
        <ul>
          {menuItems.map((item, index) => (
            <SidebarItem key={index} title={item.title} icon={item.icon} />
          ))}
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
