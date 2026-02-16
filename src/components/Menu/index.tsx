import { cn } from "@/utils/classname";
import {
  Menu,
  MenuProps,
  MenuButtonProps,
  MenuButton as MenuButtonComponent,
  MenuItem,
  MenuItemProps,
  MenuItems,
  MenuItemsProps,
} from "@headlessui/react";
import { Link } from "react-router-dom";

export const AnimatedMenu = ({
  render,
  ...props
}: Omit<MenuProps, "children"> & {
  render: (open: boolean) => React.ReactElement;
}) => {
  return <Menu {...props}>{({ open }) => render(open)}</Menu>;
};

const invisibleBoxShadowStyles = {
  boxShadow: "none",
};

export const MenuButton = ({
  children,
  className,
  style,
  ...props
}: Omit<MenuButtonProps, "className" | "style"> & {
  className?: string;
  style?: React.CSSProperties;
}) => {
  return (
    <MenuButtonComponent
      className={cn(className)}
      style={{ ...style, ...invisibleBoxShadowStyles }}
      {...props}
    >
      {children}
    </MenuButtonComponent>
  );
};

interface MenuItemListProps extends MenuItemsProps {
  children: React.ReactNode;
  transition?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export const MenuItemList = ({
  children,
  transition = false,
  className,
  style,
  ...props
}: MenuItemListProps) => {
  return (
    <MenuItems
      transition={transition}
      className={cn(className)}
      style={{ ...style, ...invisibleBoxShadowStyles }}
      {...props}
    >
      {children}
    </MenuItems>
  );
};

interface MenuItemLinkProps extends MenuItemProps {
  children: React.ReactNode;
  to?: string;
  className?: string;
  style?: React.CSSProperties;
}

export const MenuItemLink = ({
  children,
  to = "#",
  className,
  style,
  ...props
}: MenuItemLinkProps) => {
  return (
    <MenuItem>
      <Link to={to} className={cn(className)} style={style} {...props}>
        {children}
      </Link>
    </MenuItem>
  );
};
