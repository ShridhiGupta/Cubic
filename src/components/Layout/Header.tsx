'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Zap, Wallet, User, LogOut } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';

export function Header() {
  const [isConnecting, setIsConnecting] = useState(false);
  const { user, logout } = useAuth();

  const handleConnectWallet = async () => {
    setIsConnecting(true);
    try {
      // TODO: Implement actual wallet connection logic
      if (typeof window !== 'undefined' && window.ethereum) {
        const accounts = await window.ethereum.request({ 
          method: 'eth_requestAccounts' 
        });
        console.log('Connected accounts:', accounts);
        // TODO: Update global state with wallet connection
      } else {
        console.log('MetaMask not detected');
        // TODO: Show wallet installation modal
      }
    } catch (error) {
      console.error('Wallet connection failed:', error);
    } finally {
      setIsConnecting(false);
    }
  };

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  return (
    <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link href="/" className="flex items-center space-x-2">
            <Zap className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold gradient-text">CUBIC</span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">
              Home
            </Link>
            <Link href="/solver" className="text-sm font-medium hover:text-primary transition-colors">
              Solver
            </Link>
            <Link href="/tutorials" className="text-sm font-medium hover:text-primary transition-colors">
              Tutorials
            </Link>
            <Link href="/dashboard" className="text-sm font-medium hover:text-primary transition-colors">
              Dashboard
            </Link>
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          {user ? (
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">{user.username}</span>
              </div>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          ) : (
            <>
              <Link href="/auth/login">
                <Button variant="outline" size="sm">
                  Login
                </Button>
              </Link>
              <Button 
                variant="cyber" 
                size="sm"
                onClick={handleConnectWallet}
                disabled={isConnecting}
              >
                <Wallet className="h-4 w-4" />
                {isConnecting ? 'Connecting...' : 'Connect Wallet'}
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
