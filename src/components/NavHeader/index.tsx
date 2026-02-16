import { cn } from "@/utils/classname";
import { MenuItemLink, MenuItemList, MenuButton, AnimatedMenu } from "../Menu";

const NavHeader = ({ items }: { items: { label: string; to: string }[] }) => {
  const navItemClasses =
    "flex w-full gap-2 justify-end px-3 py-1.5 rounded-sm data-focus:bg-gray-100 dark:data-focus:bg-gray-600 box-shadow-sm";
  const themeToggleClasses = "text-gray-800 dark:text-white";

  return (
    <div
      id="app-header"
      className="fixed top-0 left-0 w-full flex flex-row justify-between items-center bg-white/80 dark:bg-tertiary/60 z-10 backdrop-blur-sm"
      style={{ boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.5)" }}
    >
      <div className="flex flex-row justify-start items-center">
        <span className="text-2xl font-bold dark:text-white mx-4 my-4 select-none"></span>
        <h1 className="max-[300px]:hidden text-xl font-bold dark:text-white mx-4 my-4 select-none">
          FomoSpace.me
        </h1>
      </div>
      <div className="flex flex-row justify-end items-center px-3">
        <AnimatedMenu
          render={(open: boolean) => (
            <>
              <MenuButton
                className={cn(
                  "p-2 flex items-center gap-4 text-sm font-semibold cursor-pointer text-shadow-xl hover:glow-effect-primary",
                  themeToggleClasses,
                )}
              >
                <svg
                  className={cn(`h-7 w-7 select-none ${themeToggleClasses}`)}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line
                    x1="4"
                    y1="12"
                    x2="20"
                    y2="12"
                    className="transition-all duration-300 ease-in-out"
                    style={{
                      transformOrigin: "12px 12px",
                      transform: open ? "rotate(45deg)" : "translateY(-6px)",
                    }}
                  />
                  <line
                    x1="4"
                    y1="12"
                    x2="20"
                    y2="12"
                    className="transition-all duration-300 ease-in-out"
                    style={{ opacity: open ? 0 : 1 }}
                  />
                  <line
                    x1="4"
                    y1="12"
                    x2="20"
                    y2="12"
                    className="transition-all duration-300 ease-in-out"
                    style={{
                      transformOrigin: "12px 12px",
                      transform: open ? "rotate(-45deg)" : "translateY(6px)",
                    }}
                  />
                </svg>
              </MenuButton>
              <MenuItemList
                transition
                anchor="bottom end"
                className={cn(
                  "origin-top transition duration-200 ease-out data-closed:scale-y-0 data-closed:opacity-0",
                  "flex flex-col gap-2 p-1 z-20 mt-[9px] min-w-30",
                  "text-[13px] font-medium text-gray-600 dark:text-white",
                  "border border-1 border-gray-200 rounded-md box-shadow-md dark:border-gray-700 cursor-pointer bg-white/90 dark:bg-tertiary/60 backdrop-blur-sm",
                )}
              >
                {items.map(({ label, to }, index) => (
                  <MenuItemLink
                    key={`menu-item-${index}`}
                    to={to}
                    className={navItemClasses}
                  >
                    {label}
                  </MenuItemLink>
                ))}
              </MenuItemList>
            </>
          )}
        />
      </div>
    </div>
  );
};

export default NavHeader;
