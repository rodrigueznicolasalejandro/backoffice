import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MenuList from "../../components/MenuList";
import mockMenu from "../../mock/menu.json";
// import { redirectTo } from "@link/security-module";

const MenuApp = () => {
  const [menuItems, setMenuItems] = useState(mockMenu);
  const navigate = useNavigate();
  return (
    <div className="mt-4 mr-4 bg-white rounded-lg flex flex-col justify-between h-[calc(100vh-60px)] w-[233px] shadow-sm border border-gray-100">
      <div className="p-4">
        <img
          src="/public/assets/logo/logo.png"
          width="40"
          height="40"
          className="rounded-full object-cover mx-auto mb-4"
        />
        <div>
          <MenuList
            items={menuItems}
            onNavigate={(url) => navigate(url)}
          />
          <hr className="w-[100px] border-gray-200 my-4" />
        </div>
      </div>
    </div>
  );
};

export default MenuApp;
