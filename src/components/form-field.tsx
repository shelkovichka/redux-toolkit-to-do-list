import {
  Controller,
  Control,
  FieldValues,
  Path,
  FieldErrors,
} from 'react-hook-form';

import {Input} from '@/components/ui/input';

interface FormFieldProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  errors: FieldErrors<T>;
  placeholder: string;
  type?: string;
}

const FormField = <T extends FieldValues>({
  name,
  control,
  errors,
  placeholder,
  type = 'text',
}: FormFieldProps<T>) => {
  return (
    <div className="relative">
      <Controller
        name={name}
        control={control}
        render={({field}) => (
          <Input {...field} type={type} placeholder={placeholder} />
        )}
      />
      {errors[name] && (
        <p className="absolute top-9 left-3.5 text-red-500 text-sm">
          {errors[name]?.message as string}
        </p>
      )}
    </div>
  );
};

export default FormField;
