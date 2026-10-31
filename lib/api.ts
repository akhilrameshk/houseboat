// Small fetch helpers used by client components.
interface ApiOptions {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: unknown;
}

interface ApiError {
  error?: string;
  details?: string[];
}

export async function api<T = Record<string, unknown>>(url: string, { method = "GET", body }: ApiOptions = {}): Promise<T> {
  const res = await fetch(url, {
    method,
    headers: body ? { "Content-Type": "application/json" } : undefined,
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = (await res.json().catch(() => ({}))) as T & ApiError;
  if (!res.ok) {
    throw new Error(data.details?.length ? `${data.error}: ${data.details.join(", ")}` : data.error || "Request failed");
  }
  return data;
}

export interface UploadResult {
  url: string;
  publicId: string;
  width: number;
  height: number;
}

export async function uploadImage(file: File): Promise<UploadResult> {
  const fd = new FormData();
  fd.append("file", file);
  const res = await fetch("/api/upload", { method: "POST", body: fd });
  const data = (await res.json().catch(() => ({}))) as UploadResult & ApiError;
  if (!res.ok) throw new Error(data.error || "Upload failed");
  return data;
}
