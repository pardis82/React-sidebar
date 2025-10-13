interface MenuItems {
    id : number ;
    lable :string;
    path ?: string;
}
interface SidebarProps {
  menuItems: MenuItems[]; // Array of MenuItem objects
  OnclickHandler ?: (item:MenuItems) => void
}

const Sidebar = ({ menuItems }: SidebarProps) => {
  return (
    <div className="Sidebar">
      <h2>Menu</h2>
      {menuItems.map((item) => (
        <div key={item.id} className="menu-item">
          <span>{item.id}, {item.lable}</span>
        </div>
      ))}
    </div>
  );
};

export default Sidebar