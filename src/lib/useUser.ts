'use client';

import { useState, useEffect } from 'react';

export function useUser() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const mockUser = {
      name: 'Alice',
      role: 'provider',
    };

    setUser(mockUser);
  }, []);

  return user;
}
