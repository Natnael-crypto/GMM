import SocketProvider from "@/components/auth/socket-provider";
import AuthGuard from "@/components/providers/auth-guard";

function ChatLayout({ children }: { children: React.ReactNode }) {
    return <SocketProvider>{children}</SocketProvider>;
}

export default AuthGuard({ Component: ChatLayout });