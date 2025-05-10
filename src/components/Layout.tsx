import React from 'react';
import Navbar from './Navbar';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar title="泰勒音乐" />
      <main className="flex-grow">
        {children}
      </main>
    </div>
  );
};

export default Layout; 