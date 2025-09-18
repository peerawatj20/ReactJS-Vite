import { useEffect, useRef } from "react";
import { useForm, type FieldValues, type UseFormProps } from "react-hook-form";
import { useTranslation } from "react-i18next";

const useAppForm = <TFieldValues extends FieldValues = FieldValues>(
  props: UseFormProps<TFieldValues>
) => {
  const { i18n } = useTranslation();

  const hookForm = useForm(props);
  const currentLanguage = useRef(i18n.language);

  const {
    formState: { errors },
    trigger,
  } = hookForm;

  useEffect(() => {
    if (
      Object.keys(errors).length > 0 &&
      currentLanguage.current !== i18n.language
    ) {
      currentLanguage.current = i18n.language;
      trigger();
    }
  }, [i18n.language, errors, trigger]);

  return hookForm;
};
export default useAppForm;
