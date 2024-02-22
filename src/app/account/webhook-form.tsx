import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRightIcon, PenLineIcon } from "lucide-react";
import { type UseFormReturn, useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem } from "../_components/form";
import { InputField } from "../_components/input";
import { Touch } from "../_components/touch";

export const webhookSchema = z.object({
  name: z.string().min(1),
});

export type WebhookSchema = z.infer<typeof webhookSchema>;

const webhookFormDefaults = {
  name: "",
};

export type FormType = UseFormReturn<WebhookSchema>;

export const WebhookForm = () => {
  const form = useForm<WebhookSchema>({
    resolver: zodResolver(webhookSchema),
    defaultValues: webhookFormDefaults,
  });

  const { handleSubmit, control, formState } = form;

  const onSubmit = (data: WebhookSchema) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormField
          control={control}
          name={"name"}
          render={({ field }) => (
            <FormItem className="my-6">
              <FormControl>
                <InputField
                  icon={PenLineIcon}
                  alt={"Pen"}
                  placeholder={"Webhook Name"}
                  type={"name"}
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Touch
          type="submit"
          size={"lg"}
          variant={formState.isValid ? "primary" : "default"}
          tail={ArrowRightIcon}
          className={"w-full"}
        >
          Submit
        </Touch>
      </form>
    </Form>
  );
};
