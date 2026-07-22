import { getUserProfile } from "@/src/services/server/api";
import ProfileForm from "./ProfileForm";


// কুকি ও সেশন রিড করার কারণে পেজটিকে ডায়নামিক হিসেবে সেট করা হয়েছে
export const dynamic = "force-dynamic";

export default async function ProfilePage() {
    const user = await getUserProfile();
    console.log(user)

    // API রেসপন্স থেকে ইউজারের ডেটা আলাদা করা
    // const user: UserProfileData | null = response?.data || response || null;

    if (!user) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center px-4">
                <div className="rounded-2xl border border-white/10 bg-navy p-8 text-center shadow-xl">
                    <h2 className="text-xl font-bold text-white">Profile Not Found</h2>
                    <p className="mt-2 text-sm text-gray-400">
                        Please log in to view and manage your profile details.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-bg-main py-8 px-4 sm:px-6 lg:px-8">
            <ProfileForm user={user} />
        </main>
    );
}