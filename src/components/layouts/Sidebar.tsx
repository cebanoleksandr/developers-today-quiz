import { DocumentTextIcon, PlusCircleIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import SidebarItem from "./SidebarItem";

export type SidebarItemType = {
  title: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  href: string;
}

const Sidebar = () => {
  const sidebarItems = [
    { title: 'Quizzes', icon: DocumentTextIcon, href: '/' },
    { title: 'Create', icon: PlusCircleIcon, href: '/create' },
  ];

  return (
    <div className="fixed flex flex-col justify-between left-0 top-0 w-52 h-screen border-r border-grey-3 p-2 bg-bg-sidebar z-[2] bg-white">
      <div>
        <Link to='/' className="text-green-500 font-bold text-3xl p-2">Quizzes</Link>

        <ul className="h-4/5 mb-[10px] mt-7 overflow-y-auto">
          {sidebarItems.map(item => (
            <SidebarItem key={item.title} item={item} />
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Sidebar;