import { CreateListModalProvider } from "@/app/components/list/create/CreateListModalProvider";
import MobileNavigation from "@/app/components/navigation/MobileNavigation";
import DesktopNavigation from "@/app/components/navigation/DesktopNavigation";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <DesktopNavigation />
      <CreateListModalProvider>{children}</CreateListModalProvider>
      <MobileNavigation />
    </>
  );
}
