import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";

export default function Home() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div style={{ padding: 20 }}>Loading...</div>;
  }

  return (
    <div style={{ padding: 20 }}>
      {!session ? (
        <div className="guest-view">
          <h1>Welcome</h1>
          <button 
            onClick={() => signIn()}
            style={{
              padding: '8px 16px',
              background: '#0070f3',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Sign in
          </button>
        </div>
      ) : (
        <div className="authenticated-view">
          <h2>
            Hello, {session.user?.name || 'User'} 
            {session.user?.role && ` (${session.user.role})`}
          </h2>
          
          <nav style={{ margin: '20px 0', display: 'flex', gap: '15px' }}>
            {session.user?.role === "SUPERVISOR" && (
              <>
                <Link 
                  href="/supervisor/create" 
                  style={{ textDecoration: 'none', color: '#0070f3' }}
                >
                  Create Doc
                </Link>
                <Link 
                  href="/review" 
                  style={{ textDecoration: 'none', color: '#0070f3' }}
                >
                  My Documents
                </Link>
              </>
            )}
            {session.user?.role && ["MANAGER", "STANDARISASI"].includes(session.user.role) && (
              <Link 
                href="/review" 
                style={{ textDecoration: 'none', color: '#0070f3' }}
              >
                Review Docs
              </Link>
            )}
          </nav>

          <button 
            onClick={() => signOut()}
            style={{
              padding: '8px 16px',
              background: '#f44336',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}