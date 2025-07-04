import { type FC } from "react";
import { NavLink } from "react-router-dom";
import type { SidebarItemType } from "./Sidebar";

interface ISidebarItem {
  item: SidebarItemType;
}

const SidebarItem: FC<ISidebarItem> = ({ item }) => {
  const Icon = item.icon;

  return (
    <li
      className='relative mb-[2px] flex items-center justify-between rounded-[12px] 
       hover:bg-primary-dark cursor-pointer'
      style={{ overflow: 'hidden' }}
    >
      <NavLink
        to={item.href}
        className={({ isActive }) => 
          `flex gap-3 items-center w-full h-full p-2 
           overflow-hidden rounded-[12px]
          ${isActive ? 'bg-green-200 font-semibold text-green-500' : 'hover:bg-green-100 text-gray-800'}`
        }
      >
        <Icon className='w-5 h-5 text-green-500' />
        {item.title}
      </NavLink>
    </li>
  )
}

export default SidebarItem;