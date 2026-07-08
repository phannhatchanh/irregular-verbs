/**
 * Simple in‑memory cache for Gemini prompts.
 * Stores responses keyed by a hash of the prompt string.
 */

export class GeminiCache {
  private static cache = new Map<string, string>();

  /** Generate a deterministic hash for the prompt (quick implementation). */
  private static hash(prompt: string, modelName?: string): string {
    // Simple hash – not cryptographic, sufficient for caching within a process.
    const key = `${modelName || ""}:${prompt}`;
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      const chr = key.charCodeAt(i);
      hash = (hash << 5) - hash + chr;
      hash |= 0; // Convert to 32bit integer
    }
    return hash.toString();
  }

  /** Retrieve a cached response, or undefined if not present. */
  static get(prompt: string, modelName?: string): string | undefined {
    return this.cache.get(this.hash(prompt, modelName));
  }

  /** Store a response for the given prompt. */
  static set(prompt: string, response: string, modelName?: string): void {
    this.cache.set(this.hash(prompt, modelName), response);
  }
}
