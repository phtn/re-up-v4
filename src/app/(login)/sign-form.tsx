import { FormControl, FormField, FormItem } from "@@ui/form";
import { InputField } from "@@ui/input";
import { useCallback, type KeyboardEvent } from "react";
import { type Control, type ControllerRenderProps } from "react-hook-form";
import {
  loginFields,
  type LoginField,
  type LoginFormProps,
  type LoginSchema,
} from "./schema";

export const ActiveForm = ({ form, loading, onSubmit }: LoginFormProps) => {
  const { handleSubmit, getValues, control, formState } = form;
  const { isValid } = formState;

  const handleEnter = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      const values = getValues();
      if (e.key === "Enter" && isValid) {
        e.preventDefault();
        onSubmit(values);
      }
    },
    [getValues, isValid, onSubmit],
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Fields
        keyPress={handleEnter}
        control={control}
        fields={loginFields}
        loading={loading}
      />
    </form>
  );
};

type RenderProps = {
  field: ControllerRenderProps<LoginSchema>;
  item: LoginField;
  keyPress: (e: KeyboardEvent<HTMLInputElement>) => void;
};

const render = ({ field, item, keyPress }: RenderProps) => (
  <FormItem className="my-6">
    <FormControl>
      <InputField
        autoFocus={false}
        icon={item.icon}
        alt={item.alt as string}
        placeholder={item.placeholder}
        type={item.type}
        {...field}
        onKeyUp={(e) => keyPress(e)}
      />
    </FormControl>
  </FormItem>
);

type FieldProps = {
  fields: LoginField[];
  control: Control<LoginSchema>;
  loading: boolean;
  keyPress: (e: KeyboardEvent<HTMLInputElement>) => void;
};

const Fields = ({ control, fields, loading, keyPress }: FieldProps) => {
  return fields.map((item) => (
    <FormField
      key={item.name}
      control={control}
      name={item.name}
      render={({ field }) => render({ field, item, keyPress })}
      disabled={loading}
    />
  ));
};

/*
Promised({
      promise: signinPromise,
      loading: "Signing in...",
      success: "signin",
      error: "Error",
    });
*/
