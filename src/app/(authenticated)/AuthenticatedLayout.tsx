'use client';
import { AuthCheck } from '@/components/AuthCheck';

export function AuthenticatedLayout({ children }: { children: React.ReactNode }) {
  return <AuthCheck>{children}</AuthCheck>;
}
