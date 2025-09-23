import { z } from 'zod';

import { type SchemaType, createI18nSchema } from '@/shared/utils/schema.utils';

export const loginSchema = createI18nSchema((t) => {
  return z.object({
    email: z.email(
      t('translation:features.auth.login.validation.invalid_email'),
    ),
    password: z
      .string()
      .min(
        8,
        t('translation:features.auth.login.validation.password_required'),
      ),
  });
});

export type LoginSchemaType = SchemaType<typeof loginSchema>;
