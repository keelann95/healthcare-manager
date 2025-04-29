export const encryptData = async (data: string): Promise<string> => {
  // TODO: implement Web Crypto encryption
  return btoa(data);
};

export const decryptData = async (encrypted: string): Promise<string> => {
  // TODO: implement Web Crypto decryption
  return atob(encrypted);
};
