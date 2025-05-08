'use client';

import { useState, useEffect } from 'react';

export function useUser() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const mockUser = {
      name: 'Alice',
      role: 'patient',
    };

    setUser(mockUser);
  }, []);

  return user;
}
