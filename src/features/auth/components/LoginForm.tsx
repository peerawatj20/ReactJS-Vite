import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginSchemaType } from "../schemas/loginSchema";
import Label from "../../../shared/ui/Label";
import Input from "../../../shared/ui/Input";
import Button from "../../../shared/ui/Button";
import { useTranslation } from "react-i18next";
import { useMemo } from "react";
import useAppForm from "@/shared/hooks/ีuseAppForm";

// Import reusable components

const LoginForm = () => {
  const { t, i18n } = useTranslation();

  const memoizedSchema = useMemo(() => {
    return loginSchema(t); // 👈 เรียกใช้ Factory เพื่อสร้าง schema ที่แปลแล้ว
  }, [t]);

  const { control, handleSubmit } = useAppForm<LoginSchemaType>({
    resolver: zodResolver(memoizedSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginSchemaType) => {
    console.log("Login successful with:", data);
    alert(`ยินดีต้อนรับ, ${data.email}!`);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Button onClick={() => i18n.changeLanguage("en")}>English</Button>
      <Button onClick={() => i18n.changeLanguage("th")}>ไทย</Button>
      <div>
        <Label htmlFor="email">E-mail</Label>
        <Input<LoginSchemaType>
          name="email"
          type="email"
          placeholder="you@example.com"
          control={control}
        />
      </div>

      <div>
        <Label htmlFor="password">Password</Label>
        <Input<LoginSchemaType>
          name="password"
          type="password"
          placeholder="••••••••"
          control={control}
        />
      </div>

      <Button type="submit" fullWidth>
        Sign In
      </Button>
    </form>
  );
};

export default LoginForm;
