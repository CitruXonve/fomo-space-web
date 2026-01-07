import { Button } from "@/components/Button";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

interface PopupProps {
  isOpen?: boolean;
  title?: string;
  message?: string;
  onClose?: () => void;
  clickOutsideToClose?: boolean;
}

export const Popup = (props: PopupProps) => {
  const {
    isOpen = true,
    title = "Default Title",
    message = "Default Text",
    onClose = () => {},
    clickOutsideToClose = false,
  } = props;
  return (
    <Dialog
      open={isOpen}
      as="div"
      onClose={clickOutsideToClose ? onClose : () => {}}
      className="relative z-10 focus:outline-none"
    >
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto backdrop-blur-sm data-closed:opacity-0">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="w-full max-w-md rounded-xl bg-white/95 p-6 border-1 border-gray-300 shadow-2xl backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
          >
            <DialogTitle as="h3" className="text-base/7 font-medium text-black">
              {title}
            </DialogTitle>
            <p className="mt-2 text-sm/6 text-black/50">{message}</p>
            <div className="mt-4">
              <Button
                className="inline-flex items-center gap-2 rounded-md bg-gray-700 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-gray-600 data-open:bg-gray-700"
                onClick={onClose}
              >
                Got it
              </Button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};
