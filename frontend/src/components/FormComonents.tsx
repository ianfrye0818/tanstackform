import { useStore } from '@tanstack/react-form';

import { useFieldContext, useFormContext } from '../hooks/form-context';

import { Button, type ButtonProps } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea as ShadcnTextarea } from '@/components/ui/textarea';
import * as ShadcnSelect from '@/components/ui/select';
import { Slider as ShadcnSlider } from '@/components/ui/slider';
import { Switch as ShadcnSwitch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';

export type FieldError = { errors: Array<string | { message: string }> };

interface ISubscribeButton extends ButtonProps {
  label: string;
}

export function SubscribeButton({ label, ...props }: ISubscribeButton) {
  const form = useFormContext();
  return (
    <form.Subscribe selector={(state) => state.isSubmitting}>
      {(isSubmitting) => (
        <Button
          type='submit'
          disabled={isSubmitting}
          {...props}
        >
          {isSubmitting ? <Loader2 className='mr-2 h-4 w-4 animate-spin' /> : label}
        </Button>
      )}
    </form.Subscribe>
  );
}

export function ErrorMessages({
  errors,
}: {
  errors: string | Array<string | { message: string }>;
}) {
  if (typeof errors === 'string') {
    errors = [errors];
  }

  return (
    <>
      {errors.map((error, index) => (
        <div
          key={index}
          className='text-red-500 mt-1 font-bold text-sm italic'
        >
          {typeof error === 'string' ? error : error.message}
        </div>
      ))}
    </>
  );
}

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  containerProps?: React.HTMLAttributes<HTMLDivElement>;
}
export function TextField({ label, containerProps, ...props }: TextFieldProps) {
  const field = useFieldContext<string>();
  const errors = useStore(field.store, (state) => state.meta.errors);

  return (
    <div {...containerProps}>
      <Label
        htmlFor={label}
        className='mb-2 text-xl font-bold'
      >
        {label}
      </Label>
      <Input
        value={field.state.value}
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(e.target.value)}
        {...props}
      />
      {field.state.meta.isTouched && <ErrorMessages errors={errors} />}
    </div>
  );
}

export function TextArea({ label, rows = 3 }: { label: string; rows?: number }) {
  const field = useFieldContext<string>();
  const errors = useStore(field.store, (state) => state.meta.errors);

  return (
    <div>
      <Label
        htmlFor={label}
        className='mb-2 text-xl font-bold'
      >
        {label}
      </Label>
      <ShadcnTextarea
        id={label}
        value={field.state.value}
        onBlur={field.handleBlur}
        rows={rows}
        onChange={(e) => field.handleChange(e.target.value)}
      />
      {field.state.meta.isTouched && <ErrorMessages errors={errors} />}
    </div>
  );
}

export function Select({
  label,
  values,
  placeholder,
}: {
  label: string;
  values: Array<{ label: string; value: string }>;
  placeholder?: string;
}) {
  const field = useFieldContext<string>();
  const errors = useStore(field.store, (state) => state.meta.errors);

  return (
    <div>
      <ShadcnSelect.Select
        name={field.name}
        value={field.state.value}
        onValueChange={(value) => field.handleChange(value)}
      >
        <ShadcnSelect.SelectTrigger className='w-full'>
          <ShadcnSelect.SelectValue placeholder={placeholder} />
        </ShadcnSelect.SelectTrigger>
        <ShadcnSelect.SelectContent>
          <ShadcnSelect.SelectGroup>
            <ShadcnSelect.SelectLabel>{label}</ShadcnSelect.SelectLabel>
            {values.map((value) => (
              <ShadcnSelect.SelectItem
                key={value.value}
                value={value.value}
              >
                {value.label}
              </ShadcnSelect.SelectItem>
            ))}
          </ShadcnSelect.SelectGroup>
        </ShadcnSelect.SelectContent>
      </ShadcnSelect.Select>
      {field.state.meta.isTouched && <ErrorMessages errors={errors} />}
    </div>
  );
}

export function Slider({ label }: { label: string }) {
  const field = useFieldContext<number>();
  const errors = useStore(field.store, (state) => state.meta.errors);

  return (
    <div>
      <Label
        htmlFor={label}
        className='mb-2 text-xl font-bold'
      >
        {label}
      </Label>
      <ShadcnSlider
        id={label}
        onBlur={field.handleBlur}
        value={[field.state.value]}
        onValueChange={(value) => field.handleChange(value[0])}
      />
      {field.state.meta.isTouched && <ErrorMessages errors={errors} />}
    </div>
  );
}

export function Switch({ label }: { label: string }) {
  const field = useFieldContext<boolean>();
  const errors = useStore(field.store, (state) => state.meta.errors);

  return (
    <div>
      <div className='flex items-center gap-2'>
        <ShadcnSwitch
          id={label}
          onBlur={field.handleBlur}
          checked={field.state.value}
          onCheckedChange={(checked) => field.handleChange(checked)}
        />
        <Label htmlFor={label}>{label}</Label>
      </div>
      {field.state.meta.isTouched && <ErrorMessages errors={errors} />}
    </div>
  );
}
