interface menuItems{
    title: string ;
    icon: React.ElementType
}
const menuItemClasses =
  "py-2 px-3 hover:bg-gray-700 rounded-md cursor-pointer flex items-center"; 
const SidebarItem : React.FC<menuItems> =({title , icon:Icon}) =>{
  return (
    <li className={menuItemClasses}>
      <Icon className="inline-block ml-2" />
      {title}
    </li>
  );
}

export default SidebarItem