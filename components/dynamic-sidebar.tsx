'use client';

import React from 'react';
import { useRole } from '@/contexts/RoleContext';
import { CustomerSidebar } from '@/components/customer-sidebar';
import { VendorSidebar } from '@/components/vendor-sidebar';

export function DynamicSidebar() {
  const { role } = useRole();

  return role === 'customer' ? <CustomerSidebar /> : <VendorSidebar />;
}
