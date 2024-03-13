import { Form, FormControl, FormField, FormItem } from "@@components/form";
import { InputField } from "@@components/input";
import { Touch } from "@@components/touch";
import { zodResolver } from "@hookform/resolvers/zod";
import { ValidInputFormat } from "@@server/resource/svix";
import {
  ArrowDownToDotIcon,
  ArrowRightIcon,
  CheckCircle2Icon,
  Disc3Icon,
  ListMinusIcon,
} from "lucide-react";
import { useForm, type UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { useWebhookInterface } from "./hooks";
import { type EndpointCreateProps, type EndpointField } from "./types";

export const endpointSchema = z.object({
  name: ValidInputFormat,
  description: ValidInputFormat,
});

export type EndpointSchema = z.infer<typeof endpointSchema>;

const fields: EndpointField[] = [
  {
    name: "name",
    alt: "name",
    placeholder: "Endpoint name",
    type: "text",
    icon: ArrowDownToDotIcon,
  },
  {
    name: "description",
    alt: "file",
    placeholder: "Describe your endpoint",
    type: "text",
    icon: ListMinusIcon,
  },
];

const endpointFormDefaults: EndpointSchema = {
  name: "",
  description: "",
};

export type FormType = UseFormReturn<EndpointSchema>;

export const EndpointForm = ({ webhookId }: EndpointCreateProps) => {
  const form = useForm<EndpointSchema>({
    resolver: zodResolver(endpointSchema),
    defaultValues: endpointFormDefaults,
  });

  const { handleSubmit, control, formState } = form;
  const { getEndpointInfo, loading, createState } = useWebhookInterface();

  const onSubmit = (data: EndpointSchema) => {
    getEndpointInfo({ webhookId, ...data });
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {fields.map((item) => (
          <FormField
            control={control}
            name={item.name}
            key={item.name}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <InputField
                    icon={item.icon}
                    alt={item.alt}
                    placeholder={item.placeholder}
                    type={item.type}
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          ></FormField>
        ))}

        <Touch
          type="submit"
          size={"lg"}
          disabled={!formState.isValid || loading}
          variant={formState.isValid ? "primary" : "default"}
          tail={
            loading || createState.state === "Creating ..."
              ? Disc3Icon
              : createState.state === "Endpoint Created!"
                ? CheckCircle2Icon
                : ArrowRightIcon
          }
          className={"w-full"}
          iconClass={
            loading || createState.state === "Creating ..."
              ? `animate-spin duration-1000`
              : ``
          }
        >
          {createState.state}
        </Touch>
      </form>
    </Form>
  );
};
