'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type UserRole = 'customer' | 'vendor';

interface RoleContextType {
  role: UserRole;
  toggleRole: () => void;
  setRole: (role: UserRole) => void;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

interface RoleProviderProps {
  children: ReactNode;
}

export function RoleProvider({ children }: RoleProviderProps) {
  const [role, setRoleState] = useState<UserRole>('customer');

  // Load role from localStorage on mount
  useEffect(() => {
    const savedRole = localStorage.getItem('userRole') as UserRole;
    if (savedRole && (savedRole === 'customer' || savedRole === 'vendor')) {
      setRoleState(savedRole);
    }
  }, []);

  // Save role to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('userRole', role);
  }, [role]);

  const toggleRole = () => {
    setRoleState(prevRole => prevRole === 'customer' ? 'vendor' : 'customer');
  };

  const setRole = (newRole: UserRole) => {
    setRoleState(newRole);
  };

  return (
    <RoleContext.Provider value={{ role, toggleRole, setRole }}>
      {children}
    </RoleContext.Provider>
  );
}

export function useRole() {
  const context = useContext(RoleContext);
  if (context === undefined) {
    throw new Error('useRole must be used within a RoleProvider');
  }
  return context;
}
