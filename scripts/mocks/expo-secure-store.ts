const mockStorage: { [key: string]: string } = {};

export async function setItemAsync(key: string, value: string): Promise<void> {
  // Enforce 2048-byte limit to test chunking
  if (typeof value === 'string' && value.length > 2048) {
    throw new Error(`The value is too large for the secure store (maximum 2048 bytes). Got ${value.length} bytes.`);
  }
  mockStorage[key] = value;
}

export async function getItemAsync(key: string): Promise<string | null> {
  return mockStorage[key] ?? null;
}

export async function deleteItemAsync(key: string): Promise<void> {
  delete mockStorage[key];
}

export default {
  setItemAsync,
  getItemAsync,
  deleteItemAsync,
};
