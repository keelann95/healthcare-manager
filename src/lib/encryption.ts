// Symmetric key encryption using AES-GCM

export async function generateKey(): Promise<CryptoKey> {
  const existingKey = sessionStorage.getItem('cryptoKey');

  if (existingKey) {
    const key = await crypto.subtle.importKey(
      'jwk',
      JSON.parse(existingKey),
      { name: 'AES-GCM' },
      true,
      ['encrypt', 'decrypt']
    );
    return key;
  }

  const newKey = await crypto.subtle.generateKey({ name: 'AES-GCM', length: 256 }, true, [
    'encrypt',
    'decrypt',
  ]);

  const exportedKey = await crypto.subtle.exportKey('jwk', newKey);
  sessionStorage.setItem('cryptoKey', JSON.stringify(exportedKey));

  return newKey;
}

export async function encryptData(data: string, key: CryptoKey) {
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encoded = new TextEncoder().encode(data);
  const cipherText = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, encoded);

  return {
    cipherText: Array.from(new Uint8Array(cipherText)), // Convert for storage
    iv: Array.from(iv),
  };
}

export async function decryptData(cipherText: Uint8Array, iv: Uint8Array, key: CryptoKey) {
  const decrypted = await crypto.subtle.decrypt(
    {
      name: 'AES-GCM',
      iv,
    },
    key,
    cipherText
  );

  return new TextDecoder().decode(decrypted);
}
