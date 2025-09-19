import { useTranslation } from 'react-i18next';

import { zodResolver } from '@hookform/resolvers/zod';
import type { TFunction } from 'i18next';
import type { ZodObject } from 'zod';

// 1. กำหนด Type ของ "Schema Factory" ที่เราจะรับเข้ามา
//    (ฟังก์ชันที่รับ t และ return Zod schema object)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SchemaFactory<T extends ZodObject<any>> = (t: TFunction) => T;

/**
 * Custom hook ที่สร้าง Zod resolver พร้อมกับการแปลภาษาอัตโนมัติ
 * @param schemaFactory ฟังก์ชันที่สร้าง Zod schema
 * @returns zodResolver ที่พร้อมใช้งานใน useForm
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useI18nZodResolver = <T extends ZodObject<any>>(
  schemaFactory: SchemaFactory<T>,
) => {
  // 2. ซ่อน Logic การเรียกใช้ useTranslation ไว้ข้างใน Hook นี้
  const { t } = useTranslation();

  const schema = schemaFactory(t);

  return zodResolver(schema);
};
