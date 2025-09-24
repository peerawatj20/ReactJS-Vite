import { z } from 'zod';

const envSchema = z.object({
  VITE_API_BASE_URL: z.string().url('VITE_API_BASE_URL must be a valid URL'),

  //   VITE_GOOGLE_MAPS_API_KEY: z
  //     .string()
  //     .min(1, 'VITE_GOOGLE_MAPS_API_KEY is required'),

  MODE: z.enum(['development', 'production', 'test']).default('development'),
});

let envConfig: z.infer<typeof envSchema>;

try {
  envConfig = envSchema.parse(import.meta.env);
} catch (error) {
  if (error instanceof z.ZodError) {
    console.error('🔥 Invalid environment variables:', error.format());
    throw new Error(
      'Invalid environment variables. Please check your .env file.',
    );
  }
  throw error;
}

export const config = {
  apiBaseUrl: envConfig.VITE_API_BASE_URL,
  //   googleMapsApiKey: envConfig.VITE_GOOGLE_MAPS_API_KEY,
  nodeEnv: envConfig.MODE,
} as const;
