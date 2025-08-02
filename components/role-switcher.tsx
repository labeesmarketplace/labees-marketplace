'use client';

import React from 'react';
import { ArrowLeftRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useRole } from '@/contexts/RoleContext';
import { useRouter } from 'next/navigation';

export function RoleSwitcher() {
  const { role, toggleRole } = useRole();
  const router = useRouter();

  const currentMode = role === 'customer' ? 'Customer' : 'Vendor';
  const switchToMode = role === 'customer' ? 'Vendor' : 'Customer';

  const handleToggleRole = () => {
    toggleRole();
    // Navigate to the appropriate dashboard
    if (role === 'customer') {
      // Currently customer, switching to vendor
      router.push('/vendor/dashboard');
    } else {
      // Currently vendor, switching to customer
      router.push('/home');
    }
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleToggleRole}
            className="h-8 w-8 p-0 hover:bg-accent hover:text-accent-foreground transition-colors"
            aria-label={`Switch to ${switchToMode} mode`}
          >
            <ArrowLeftRight className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p>Currently: {currentMode} mode</p>
          <p>Click to switch to {switchToMode}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
