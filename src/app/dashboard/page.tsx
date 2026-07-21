import { redirect } from "next/navigation";

import { getUserSession } from "@/src/services/core/session";


const DashboardPage = async () => {
    const session = await getUserSession();

    if (!session || !session.role) {
        redirect(`/auth/signin`);
    }

    if (session.role) {
        redirect(`/dashboard/${session.role}`);
    }

};

export default DashboardPage;