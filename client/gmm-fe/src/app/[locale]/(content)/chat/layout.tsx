import SocketProvider from '@/components/auth/socket-provider';
import AuthGuard from '@/components/auth/guard/auth-guard';
import { Role } from '@/lib/schemas/role';

function ChatLayout({ children }: { children: React.ReactNode }) {
  return <SocketProvider>{children}</SocketProvider>;
}

export default AuthGuard({ Component: ChatLayout, allowedRoles: [Role.User] });
