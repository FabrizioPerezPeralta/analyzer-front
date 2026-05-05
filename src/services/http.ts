//const API_BASE_URL = "https://back.bdanalyzer.lat";
const API_BASE_URL = "https://localhost:7068";

const parseError = async (response: Response) => {
  const text = await response.text();
  return text || response.statusText;
};

export const postJson = async <T>(
  path: string,
  body: unknown,
  token?: string
): Promise<T> => {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(await parseError(response));
  }

  return response.json() as Promise<T>;
};

export const getJson = async <T>(path: string, token?: string): Promise<T> => {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  if (!response.ok) {
    throw new Error(await parseError(response));
  }

  return response.json() as Promise<T>;
};

export const postForm = async <T>(
  path: string,
  formData: FormData,
  token: string
): Promise<T> => {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error(await parseError(response));
  }

  return response.json() as Promise<T>;
};
