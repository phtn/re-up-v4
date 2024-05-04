import { Form, FormControl, FormField, FormItem } from "@@ui/form";
import { InputField } from "@@ui/input";
import { Touch } from "@@ui/touch";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRightIcon, Disc3Icon, PenLineIcon } from "lucide-react";
import { useForm, type UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { useCreateWebhookApp } from "../../(hooks)/hooks";

export const webhookSchema = z.object({
  name: z.string().min(1),
});

export type WebhookSchema = z.infer<typeof webhookSchema>;

const webhookFormDefaults = {
  name: "",
};

export type FormType = UseFormReturn<WebhookSchema>;

type WebhookFormProps = {
  uid: string | undefined;
};
export const WebhookForm = ({ uid }: WebhookFormProps) => {
  const form = useForm<WebhookSchema>({
    resolver: zodResolver(webhookSchema),
    defaultValues: webhookFormDefaults,
  });

  const { handleSubmit, control, formState } = form;
  const { getName, loading } = useCreateWebhookApp({
    uid,
  });
  const onSubmit = (data: WebhookSchema) => {
    getName(data);
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
          disabled={!formState.isValid || loading}
          variant={formState.isValid ? "primary" : "default"}
          tail={loading ? Disc3Icon : ArrowRightIcon}
          className={"w-full"}
          iconClass={loading ? `animate-spin duration-1000` : ``}
        >
          {loading ? `Submitting` : `Submit`}
        </Touch>
      </form>
    </Form>
  );
};
