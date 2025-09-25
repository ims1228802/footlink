
export default async function apiFetch(url, options = {}) {
  const res = await fetch(url, {
    headers: { "Content-Type": "application/json", ...options.headers },
    ...options,
  });

  if (!res.ok) {
    const msg = await res.text();
    throw new Error(msg || "서버 요청 실패");
  }

  try {
    return await res.json();
  } catch {
    return null;
  }
}
