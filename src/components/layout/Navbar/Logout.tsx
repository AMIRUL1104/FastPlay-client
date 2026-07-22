"use client"
import { authClient } from '@/src/lib/auth-client';
import { FiLogOut } from 'react-icons/fi'
import { useRouter } from 'next/navigation';
function Logout() {
    const router = useRouter();
    return (

        <button
            type="button"
            onClick={async () => {
                await authClient.signOut({
                    fetchOptions: {
                        onSuccess: () => {
                            router.push("/auth/signin"); // redirect to login page
                            router.refresh();
                        },
                    },
                });
            }}
            className="flex w-full cursor-pointer items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-bold text-rose-600 transition-colors hover:bg-rose-500/10"
        >
            <FiLogOut size={16} />
            <span>Logout</span>
        </button>
    )
}

export default Logout