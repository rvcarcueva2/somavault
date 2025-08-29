import type { Metadata } from "next";
import AdminPanelSidebar from "@/app/components/AdminPanelSidebar";

export const metadata: Metadata = {
  title: " Events | Somavault",
  description:
    "Manage and view events",
};

export default function SidebarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <div className="flex min-h-screen">
        <AdminPanelSidebar />
        <main className="flex-1 bg-gray-50 p-8">
          {children}
        </main>
      </div>
  );
}