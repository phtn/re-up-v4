import { FormControl, FormField, FormItem } from "@@components/form";
import { InputField } from "@@components/input";
import { type Control, type ControllerRenderProps } from "react-hook-form";
import {
  loginFields,
  type LoginField,
  type LoginFormProps,
  type LoginSchema,
} from "./schema";

export const ActiveForm = ({ form, loading, onSubmit }: LoginFormProps) => {
  const { handleSubmit, control } = form;

  return (
    <form onSubmit={handleSubmit(onSubmit)} autoFocus={false}>
      <Fields control={control} fields={loginFields} loading={loading} />
    </form>
  );
};

type RenderProps = {
  field: ControllerRenderProps<LoginSchema>;
  item: LoginField;
};

const render = ({ field, item }: RenderProps) => (
  <FormItem className="my-6">
    <FormControl>
      <InputField
        autoFocus={false}
        icon={item.icon}
        alt={item.alt}
        placeholder={item.placeholder}
        type={item.type}
        {...field}
      />
    </FormControl>
  </FormItem>
);

type FieldProps = {
  fields: LoginField[];
  control: Control<LoginSchema>;
  loading: boolean;
};

const Fields = ({ control, fields, loading }: FieldProps) => {
  return fields.map((item) => (
    <FormField
      key={item.name}
      control={control}
      name={item.name}
      render={({ field }) => render({ field, item })}
      disabled={loading}
    />
  ));
};
