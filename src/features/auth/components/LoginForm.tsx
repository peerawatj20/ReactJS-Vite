import { useTranslation } from 'react-i18next';

import { useAppDispatch } from '@/app/hooks';

import useAppForm from '@/shared/hooks/useAppForm';
import { useI18nZodResolver } from '@/shared/hooks/useI18nZodResolver';
import { logout } from '@/shared/state/auth.slice';
import Button from '@/shared/ui/common/Button';
import Input from '@/shared/ui/common/Input';
import Label from '@/shared/ui/common/Label';

import { type LoginSchemaType, loginSchema } from '../schemas/login.schema';
import { loginFlow } from '../state/authFlow.thunk';

const LoginForm = () => {
  const { i18n } = useTranslation();
  const dispatch = useAppDispatch();

  const { control, handleSubmit } = useAppForm<LoginSchemaType>({
    resolver: useI18nZodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginSchemaType) => {
    const res = await dispatch(loginFlow(data)).unwrap();
    console.log('res', res);

    setTimeout(() => {
      dispatch(logout());
    }, 1000);
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
