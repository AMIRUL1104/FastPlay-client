import DashboardSidebar from "@/src/components/dashboard/DashboardSidebar";
import { getUserSession } from "@/src/services/core/session";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";



interface DashboardLayoutProps {
    children: ReactNode;
}

const DashboardLayout = async ({
    children,
}: DashboardLayoutProps) => {
    const session = await getUserSession();

    if (!session || !session.role) {
        redirect(`/auth/signin`);
    }

    return (
        <section className="min-h-screen">
            <div className="mx-auto flex max-w-7xl">
                {/* Desktop Sidebar */}
                <aside className="hidden lg:block">
                    <DashboardSidebar role={session.role} />
                </aside>

                {/* Main Content */}
                <main className="min-h-screen flex-1">
                    {children}
                </main>
            </div>
        </section>
    );
};

export default DashboardLayout;