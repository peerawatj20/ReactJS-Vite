import { useTranslation } from 'react-i18next';

import useAppForm from '@/shared/hooks/useAppForm';
import { useI18nZodResolver } from '@/shared/hooks/useI18nZodResolver';
import Button from '@/shared/ui/common/Button';
import Label from '@/shared/ui/common/Label';
import Input from '@/shared/ui/form/Input';

import { useAuthActions } from '../hooks/useAuthActions';
import { type LoginSchemaType, loginSchema } from '../schemas/login.schema';

const LoginForm = () => {
  const { i18n } = useTranslation();

  const { handleLogin } = useAuthActions();

  const { control, handleSubmit } = useAppForm<LoginSchemaType>({
    resolver: useI18nZodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginSchemaType) => {
    handleLogin(data);
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
          inputProps={{ maxLength: 50 }}
        />
      </div>

      <div>
        <Label htmlFor="password">Password</Label>
        <Input<LoginSchemaType>
          name="password"
          type="password"
          placeholder="••••••••"
          control={control}
          inputProps={{ maxLength: 12 }}
        />
      </div>

      <Button type="submit" fullWidth>
        Sign In
      </Button>
    </form>
  );
};

export default LoginForm;
