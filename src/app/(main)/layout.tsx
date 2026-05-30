import SideNav from "@/components/side-nav/SideNav";
import TopBar from "@/components/top-bar/TopBar";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-page">
      <SideNav />
      <main className="flex grow flex-col overflow-y-auto bg-page pb-24 md:pb-8">
        <TopBar />
        {children}
      </main>
    </div>
  );
}
