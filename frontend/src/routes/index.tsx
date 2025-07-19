import { useAppForm } from '@/hooks/form';
import axios, { AxiosError } from 'axios';
import { z } from 'zod';
import { formOptions } from '@tanstack/react-form';
import { createFileRoute } from '@tanstack/react-router';
import { Separator } from '@/components/ui/separator';
import { ErrorMessages } from '@/components/FormComonents';
import { toast } from 'sonner';
export const Route = createFileRoute('/')({
  component: App,
});

const schema = z.object({
  email: z.string().email('Invalid Email'),
  password: z.string().min(4, 'Invalid Passwrod'),
  firstName: z.string().min(1, 'Invalid Name'),
  lastName: z.string().min(1, 'Invalid Name'),
  address: z.object({
    line1: z.string().min(1, 'Invalid Address'),
    line2: z.string().optional(),
    city: z.string().min(1, 'Invalid City'),
    state: z.string().min(2, 'State must be 2 char').max(2, 'State must be 2 char'),
    zip: z.string().min(5, 'Zip must be 5 char').max(5, 'Zip must be 5 char'),
  }),
});

const userFormOptions = formOptions({
  defaultValues: {
    email: 'ianfrye3@gmail.com',
    password: 'password',
    firstName: 'Ian',
    lastName: 'Frye',
    address: {
      line1: '123 Main St',
      line2: '',
      city: 'Springfield',
      state: 'IL',
      zip: '62704',
    },
  } as z.infer<typeof schema>,
});

function App() {
  const form = useAppForm({
    ...userFormOptions,
    validators: {
      onSubmit: schema,
      onSubmitAsync: async ({ value }) => {
        try {
          const resp = await axios.post('http://localhost:3000/test', value);
          const data = resp.data;
          console.log({ data });
          toast.success(data.message);
        } catch (error) {
          if (error instanceof AxiosError) {
            return error.response?.data;
          }
          return 'Something went wrong, please try again';
        }
      },
    },
  });

  return (
    <div className='h-screen w-screen flex flex-col justify-center items-center gap-4'>
      <h1 className='text-bold text-3xl'>User Information Form</h1>
      <form
        className='p-8 shadow-md border rounded-md w-full max-w-[800px] flex flex-col gap-4'
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <div>
          <h2 className='text-2xl font-semibold my-2'>Personal Info</h2>
          <Separator className='mb-4' />
        </div>
        <div className='flex gap-2 w-full'>
          <form.AppField
            name='firstName'
            children={(field) => (
              <field.TextField
                label='First Name'
                containerProps={{ className: 'flex-1' }}
                placeholder='Enter your first name...'
              />
            )}
          />
          <form.AppField
            name='lastName'
            children={(field) => (
              <field.TextField
                label='Last Name'
                containerProps={{ className: 'flex-1' }}
                placeholder='Enter your last name..'
              />
            )}
          />
        </div>
        <div className='flex gap-2 w-full'>
          <form.AppField
            name='email'
            children={(field) => (
              <field.TextField
                label='Email'
                containerProps={{ className: 'flex-1' }}
                placeholder='Enter your email...'
              />
            )}
          />
          <form.AppField
            name='password'
            children={(field) => (
              <field.TextField
                label='Password'
                containerProps={{ className: 'flex-1' }}
                placeholder='Enter your password...'
                type='password'
              />
            )}
          />
        </div>
        <div>
          <h2 className='font-semibold text-2xl my-4'>Address</h2>
          <Separator className='mb-4' />
        </div>
        <div className='flex w-full gap-2 items-center'>
          <form.AppField
            name='address.line1'
            children={(field) => (
              <field.TextField
                label='Address'
                containerProps={{ className: 'flex-2' }}
                placeholder='Enter your address..'
              />
            )}
          />
          <form.AppField
            name='address.line2'
            children={(field) => (
              <field.TextField
                label='Address 2'
                containerProps={{ className: 'flex-1' }}
                placeholder='Apt/Suite/Building'
              />
            )}
          />
        </div>
        <div className='flex items-center gap-2'>
          <form.AppField
            name='address.city'
            children={(field) => (
              <field.TextField
                label='City'
                containerProps={{ className: 'flex-3' }}
                placeholder='Enter your city...'
              />
            )}
          />
          <form.AppField
            name='address.state'
            children={(field) => (
              <field.TextField
                label='State'
                maxLength={2}
                minLength={2}
                containerProps={{ className: 'flex-1' }}
                placeholder='State...'
              />
            )}
          />
          <form.AppField
            name='address.zip'
            children={(field) => (
              <field.TextField
                label='Zip'
                maxLength={5}
                minLength={2}
                containerProps={{ className: 'flex-2' }}
                placeholder='Zip...'
              />
            )}
          />
        </div>
        <form.AppForm>
          <form.SubscribeButton
            label='Submit'
            className='bg-red-600 text-white hover:bg-red-800'
          />
        </form.AppForm>
        <form.Subscribe
          selector={(state) => [state.errorMap]}
          children={([errorMap]) =>
            errorMap.onSubmit ? (
              <div>
                <ErrorMessages errors={[errorMap.onSubmit]} />
              </div>
            ) : null
          }
        />
      </form>
    </div>
  );
}
