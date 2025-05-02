'use client';

import { useEffect, useState } from 'react';
import { saveRecord, getRecords } from '@/lib/indexedDb';
import { generateKey, encryptData, decryptData } from '@/lib/encryption';

type HealthForm = {
  name: string;
  diagnosis: string;
  bloodPressure: number;
};

export default function DashboardPage() {
  const [records, setRecords] = useState<any[]>([]);
  const [form, setForm] = useState<HealthForm>({
    name: '',
    diagnosis: '',
    bloodPressure: 0,
  });

  const [key, setKey] = useState<CryptoKey | null>(null);
  useEffect(() => {
    if (typeof window === 'undefined') return; // ✅ prevents SSR crash

    const load = async () => {
      const key = await generateKey();
      setKey(key); // Save key for future use
      const fetched = await getRecords();

      const decrypted = await Promise.all(
        fetched.map((entry: any) =>
          decryptData(entry.cipherText, new Uint8Array(entry.iv), key).then((data) =>
            JSON.parse(data)
          )
        )
      );
      setRecords(decrypted);
    };

    load().catch((err) => console.error('Failed to load records:', err));
  }, []);
  const loadRecords = async (key: CryptoKey) => {
    try {
      const fetched = await getRecords();

      const decryptedAll = await Promise.all(
        fetched.map(async (entry: any) => {
          try {
            if (
              !entry?.cipherText ||
              !entry?.iv ||
              entry.cipherText.length < 16 || // sanity check
              entry.iv.length !== 12
            ) {
              throw new Error('Invalid encrypted data format');
            }

            const plainText = await decryptData(
              new Uint8Array(entry.cipherText),
              new Uint8Array(entry.iv),
              key
            );

            return JSON.parse(plainText);
          } catch (e) {
            console.warn('Skipping corrupt record:', e);
            return null;
          }
        })
      );

      setRecords(decryptedAll.filter(Boolean)); // Remove nulls
    } catch (error) {
      console.error('Error loading records:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!key) return;

    try {
      const encrypted = await encryptData(JSON.stringify(form), key);
      await saveRecord(encrypted);
      await loadRecords(key);
      setForm({ name: '', diagnosis: '', bloodPressure: '' });
    } catch (error) {
      console.error('Error saving record:', error);
    }
  };

  return (
    <main className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Health Data Entry</h1>

      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          className="w-full p-2 border rounded"
          required
        />
        <input
          name="diagnosis"
          value={form.diagnosis}
          onChange={handleChange}
          placeholder="Diagnosis"
          className="w-full p-2 border rounded"
          required
        />
        <input
          name="bloodPressure"
          value={form.bloodPressure}
          onChange={handleChange}
          placeholder="Blood Pressure"
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Save Record
        </button>
      </form>

      <h2 className="text-xl font-semibold mb-2">Decrypted Health Records</h2>
      <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
        {JSON.stringify(records, null, 2)}
      </pre>
    </main>
  );
}
