import React from 'react';
import {
  MdInventory,
  MdMiscellaneousServices,
  MdAttachMoney,
  MdCategory,
  MdBusiness,
  MdCardGiftcard,
  MdPointOfSale
} from 'react-icons/md';

interface MenuItem {
  code: string;
  label: string;
  description: string;
  link_url: string;
  icon_code: string;
  sub_items: MenuItem[];
}

interface MenuListProps {
  items: MenuItem[];
  onNavigate: (url: string) => void;
}

const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
  MdInventory,
  MdMiscellaneousServices,
  MdAttachMoney,
  MdCategory,
  MdBusiness,
  MdCardGiftcard,
  MdPointOfSale
};

const MenuList: React.FC<MenuListProps> = ({ items, onNavigate }) => {
  return (
    <ul className="list-none p-0 m-0">
      {items.map((item) => {
        // Renderizar separador
        if (item.label === "separator") {
          return (
            <li key={item.code} className="my-3">
              <hr className="border-gray-200" />
            </li>
          );
        }

        const IconComponent = iconMap[item.icon_code];
        
        return (
          <li key={item.code} className="mb-1">
            <button
              onClick={() => onNavigate(item.link_url)}
              className="w-full flex items-center gap-3 px-4 py-3 bg-transparent border-none rounded-lg cursor-pointer transition-all text-gray-600 text-sm font-medium text-left hover:bg-gray-100 hover:text-gray-900"
            >
              {IconComponent && (
                <IconComponent 
                  className="text-xl flex-shrink-0"
                />
              )}
              <span>{item.label}</span>
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default MenuList;
