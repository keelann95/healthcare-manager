'use client';

import { useState, useEffect } from 'react';

type User = {
  name: string;
  role: string;
};
export function useUser() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const mockUser: User = {
      name: 'Alice',
      role: 'patient',
    };

    setUser(mockUser);
  }, []);

  return user;
}
