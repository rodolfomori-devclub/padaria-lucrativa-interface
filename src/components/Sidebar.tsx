import { ChevronDown, ChevronRight, LogOut, User } from "lucide-react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "~/contexts/AuthContext";
import { cn } from "~/lib/utils";
import {
  ADMIN_SIDEBAR_NAVIGATION,
  BASIC_SIDEBAR_NAVIGATION,
  PRO_SIDEBAR_NAVIGATION,
  ROUTES,
  USER_MENU_ITEMS,
  type NavItem,
} from "~/routes/routes";
import { UserRole } from "~/types/user";
import { hasProAccess } from "~/utils/plans";
import {
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenuItem,
  Sidebar as SidebarRoot,
} from "./ui";

interface SidebarProps {
  className?: string;
}

interface NavItemComponentProps {
  item: NavItem;
  isActive: (path: string) => boolean;
}

function NavItemComponent({ item, isActive }: NavItemComponentProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (item.children) {
    return (
      <SidebarMenuItem>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-base transition-colors"
        >
          <div className="flex items-center">
            <item.icon className="mr-3 h-5 w-5" />
            {item.name}
          </div>
          {isOpen ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </button>
        {isOpen && (
          <div className="ml-6 mt-2 space-y-1">
            {item.children.map((child) => (
              <NavItemComponent
                key={child.name}
                item={child}
                isActive={isActive}
              />
            ))}
          </div>
        )}
      </SidebarMenuItem>
    );
  }

  return (
    <SidebarMenuItem>
      <Link
        to={item.href!}
        className={cn(
          "flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
          isActive(item.href!)
            ? "bg-highlight/10 text-highlight"
            : "text-gray-600 hover:bg-gray-50 hover:text-base"
        )}
      >
        <item.icon className="mr-3 h-5 w-5" />
        {item.name}
      </Link>
    </SidebarMenuItem>
  );
}

function UserSection() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const onLogout = () => {
    logout();
    navigate(ROUTES.LOGIN);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-highlight text-white">
          <User className="h-5 w-5" />
        </div>
        <div className="ml-3 flex-1 overflow-hidden">
          <p className="text-sm font-medium text-gray-700 truncate">
            {user?.name || "Usuário"}
          </p>
          <p className="text-xs text-gray-500 truncate">{user?.email}</p>
        </div>
      </div>

      <div className="space-y-1">
        {USER_MENU_ITEMS.map((item) => (
          <Link
            key={item.name}
            to={item.href}
            className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-base transition-colors"
          >
            <item.icon className="mr-3 h-4 w-4" />
            {item.name}
          </Link>
        ))}

        <button
          onClick={onLogout}
          className="flex w-full items-center rounded-md px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
        >
          <LogOut className="mr-3 h-4 w-4" />
          Sair
        </button>
      </div>
    </div>
  );
}

export function Sidebar({ className }: SidebarProps) {
  const location = useLocation();
  const { user } = useAuth();

  const isActive = (path: string) => {
    return location.pathname.includes(path);
  };

  const getSidebarNavigation = (): NavItem[] => {
    if (!user) return BASIC_SIDEBAR_NAVIGATION;

    if (user.role === UserRole.ADMIN || user.role === UserRole.EMPLOYEE) {
      return ADMIN_SIDEBAR_NAVIGATION;
    }

    if (user.role === UserRole.CLIENT) {
      return hasProAccess(user) ? PRO_SIDEBAR_NAVIGATION : BASIC_SIDEBAR_NAVIGATION;
    }

    return BASIC_SIDEBAR_NAVIGATION;
  };

  const SIDEBAR_ROUTES = getSidebarNavigation();

  return (
    <SidebarRoot className={cn(className, "w-60")}>
      <SidebarHeader>
        <h1 className="text-xl font-bold text-base">Padaria Lucrativa</h1>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          {SIDEBAR_ROUTES.map((item) => (
            <NavItemComponent key={item.name} item={item} isActive={isActive} />
          ))}
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <UserSection />
      </SidebarFooter>
    </SidebarRoot>
  );
}
