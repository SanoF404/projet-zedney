import { registerAs } from '@nestjs/config';

export default registerAs(
  'agent',
  (): Record<string, any> => ({
    ollama: {
      baseUrl: process.env.OLLAMA_BASE_URL ?? 'http://localhost:11434',
      model: process.env.OLLAMA_MODEL ?? 'llama3',
      temperature: process.env.OLLAMA_TEMPERATURE
        ? Number.parseFloat(process.env.OLLAMA_TEMPERATURE)
        : 0.7,
      timeoutMs: process.env.OLLAMA_TIMEOUT_MS
        ? Number.parseInt(process.env.OLLAMA_TIMEOUT_MS)
        : 60000,
    },
  }),
);
