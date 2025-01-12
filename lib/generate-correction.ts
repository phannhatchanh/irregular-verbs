export async function generateCorrection(prompt: string): Promise<Response> {
  const response = await fetch("/api/chatgpt/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt,
    }),
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response;
}
