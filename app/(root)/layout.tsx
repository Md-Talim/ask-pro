import LeftSidebar from "@/components/shared/left-sidebar";
import Navbar from "@/components/shared/navbar";
import RightSidebar from "@/components/shared/right-sidebar";
import { Toaster } from "@/components/ui/toaster";
import { ReactNode } from "react";

const RootLayout = ({ children }: { children: ReactNode }) => (
  <main className="background-light850_dark100 relative">
    <Navbar />
    <div className="flex">
      <LeftSidebar />
      <section className="flex min-h-screen flex-1 flex-col px-6 pb-6 pt-36 max-md:pb-14 sm:px-14">
        <div className="mx-auto w-full max-w-5xl">{children}</div>
      </section>

      <RightSidebar />
    </div>

    <Toaster />
  </main>
);

export default RootLayout;
