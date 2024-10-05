import { auth } from "@/lib/auth/utils";
import { redirect } from "@/lib/navigation";


export default async function UpdateProfileLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await auth()

    if (session && session.user && session.user.isMatched) {
        return redirect('/dashboard')
    }

    return children
}