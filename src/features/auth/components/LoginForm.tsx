import { useTranslation } from 'react-i18next';

import useAppForm from '@/shared/hooks/useAppForm';
import { useI18nZodResolver } from '@/shared/hooks/useI18nZodResolver';
import Button from '@/shared/ui/Button';
import Input from '@/shared/ui/Input';
import Label from '@/shared/ui/Label';

import { type LoginSchemaType, loginSchema } from '../schemas/loginSchema';

const LoginForm = () => {
  const { i18n } = useTranslation();

  const { control, handleSubmit } = useAppForm<LoginSchemaType>({
    resolver: useI18nZodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: LoginSchemaType) => {
    console.log('Login successful with:', data);
    alert(`ยินดีต้อนรับ, ${data.email}!`);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Button onClick={() => i18n.changeLanguage('en')}>English</Button>
      <Button onClick={() => i18n.changeLanguage('th')}>ไทย</Button>
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
