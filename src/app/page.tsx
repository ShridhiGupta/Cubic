'use client';

import { Button } from '@/components/ui/Button';
import { Header } from '@/components/Layout/Header';
import { Zap, Play, ArrowRight, Activity, Shield, Gauge } from 'lucide-react';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto px-4 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                Solve Any 3x3 Cube{' '}
                <span className="gradient-text">Instantly</span>
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-lg">
                AI-powered Web3-style cube solver with real-time visualization. 
                Experience the future of speedcubing with our cyberpunk interface.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/solver">
                  <Button size="lg" className="w-full sm:w-auto">
                    <Zap className="h-5 w-5 mr-2" />
                    Start Solving
                  </Button>
                </Link>
                
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  <Play className="h-5 w-5 mr-2" />
                  Try Demo
                </Button>
              </div>
              
              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <span>Supported By:</span>
                <div className="flex gap-4">
                  {/* Placeholder for partner logos */}
                  <div className="w-8 h-8 bg-muted rounded"></div>
                  <div className="w-8 h-8 bg-muted rounded"></div>
                  <div className="w-8 h-8 bg-muted rounded"></div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="cyber-border rounded-lg p-8 bg-card/50 backdrop-blur">
                <div className="aspect-square flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="text-6xl font-bold gradient-text">0.04s</div>
                    <div className="text-sm text-muted-foreground">CURRENT STEP</div>
                    <div className="font-mono text-primary">R U R' U'</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">The Future of Cubing</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Experience a seamless blend of AI technology and decentralized infrastructure 
              for the ultimate solving experience.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="cyber-border rounded-lg p-8 bg-card/50 backdrop-blur">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                <Activity className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Real-time 3D Input</h3>
              <p className="text-muted-foreground">
                Input your cube's state using our high-fidelity 3D interface or instant 
                camera scan with neural network recognition.
              </p>
            </div>
            
            <div className="cyber-border rounded-lg p-8 bg-card/50 backdrop-blur">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Instant Solution</h3>
              <p className="text-muted-foreground">
                Our advanced AI algorithm will find the most efficient God's Number 
                solution path in milliseconds using edge computing.
              </p>
            </div>
            
            <div className="cyber-border rounded-lg p-8 bg-card/50 backdrop-blur">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Step-by-step Guide</h3>
              <p className="text-muted-foreground">
                Follow an interactive, animated guide that walks you through every 
                rotation with detailed move notation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 border-t border-border">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-4xl font-bold">
              Ready to master the cube in the Web3 era?
            </h2>
            <p className="text-xl text-muted-foreground">
              Join the decentralized cubing revolution. Solve your first cube for free 
              and mint your solution path as a commemorative NFT.
            </p>
            <Link href="/solver">
              <Button size="lg" variant="cyber">
                Launch App
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Zap className="h-6 w-6 text-primary" />
                <span className="text-lg font-bold gradient-text">CUBIC</span>
              </div>
              <p className="text-sm text-muted-foreground">
                The ultimate decentralized platform for speedcubing enthusiasts, 
                powered by advanced AI and blockchain technology.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/solver" className="hover:text-primary">3D Solver</Link></li>
                <li><Link href="#" className="hover:text-primary">Camera Scan</Link></li>
                <li><Link href="#" className="hover:text-primary">Algorithms</Link></li>
                <li><Link href="#" className="hover:text-primary">API Access</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#" className="hover:text-primary">About Us</Link></li>
                <li><Link href="#" className="hover:text-primary">Community</Link></li>
                <li><Link href="#" className="hover:text-primary">Partners</Link></li>
                <li><Link href="#" className="hover:text-primary">Whitepaper</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#" className="hover:text-primary">Privacy Policy</Link></li>
                <li><Link href="#" className="hover:text-primary">Terms of Service</Link></li>
                <li><Link href="#" className="hover:text-primary">Cookie Policy</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              © 2024 Cuberweb3. All rights reserved. Built on Decentralized Nodes.
            </p>
            <div className="flex items-center gap-4 mt-4 sm:mt-0">
              <span className="text-xs text-muted-foreground">v2.0.0 (Stable)</span>
              <span className="text-xs text-green-400">Network Active</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
