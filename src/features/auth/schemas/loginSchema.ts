import type { TFunction } from "i18next";
import { z } from "zod";

export const loginSchema = (t: TFunction) => {
  // return schema object ที่ใช้ t() ในการกำหนด error message
  return z.object({
    email: z.email(t("validation.email_invalid")),
    password: z.string().min(1, t("validation.password_required")),
  });
};

const loginSchemaForType = loginSchema(((key: string) => key) as TFunction);
export type LoginSchemaType = z.infer<typeof loginSchemaForType>;
