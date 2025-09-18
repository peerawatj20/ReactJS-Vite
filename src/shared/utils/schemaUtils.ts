import type { TFunction } from 'i18next';
import { type ZodObject, type ZodRawShape, z } from 'zod';

export const createI18nSchema = <T extends ZodRawShape>(
  builder: (t: TFunction) => ZodObject<T>,
) => {
  return builder;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type SchemaType<T extends (t: TFunction) => ZodObject<any>> = z.infer<
  ReturnType<T>
>;
