import { Form, FormControl, FormField, FormItem } from "@@ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  MapIcon,
  NotebookTabsIcon,
  CircleUserRoundIcon,
  Disc3Icon,
  PlusIcon,
  XIcon,
} from "lucide-react";
import { useForm } from "react-hook-form";
import {
  type AddCustomerFormSchema,
  AddCustomerFormProps,
  customerFields,
  customerFormDefaults,
} from "./schema";
import { type CustomerFormProps } from "../../../types";
import { useCustomerController } from "../../../(hooks)/customer";
import { v4 as uuid } from "uuid";
import { Button } from "@src/app/(ui)/button";
import { cn } from "@src/utils/cn";
import { FormCard } from "@src/app/services/(components)/form-card";
import { InputOption } from "@src/app/services/(components)/field-options";
import { type SwitchProps } from "@radix-ui/react-switch";
import { Switch } from "@src/app/(ui)/switch";

export const AddCustomerForm = ({ userId, route }: CustomerFormProps) => {
  const form = useForm<AddCustomerFormSchema>({
    resolver: zodResolver(AddCustomerFormProps),
    defaultValues: customerFormDefaults,
  });

  const { handleSubmit, control, formState, reset } = form;
  const {
    handleAddCustomer,
    customerLoading,
    sameAsShipping,
    handleToggleSameAddress,
  } = useCustomerController();

  const customerId = uuid();
  const customerInfo = customerFields.slice(0, 2);
  const contactInfo = customerFields.slice(2, 4);
  const customerAddress = customerFields.slice(4);

  const resetInputFields = () => reset(customerFormDefaults);

  const onSubmit = (data: AddCustomerFormSchema) => {
    handleAddCustomer({ customerId, data, userId: `${userId}` })
      .then(resetInputFields)
      .catch((e: Error) => console.log("Form Error", e));
    console.log(data, userId, customerId);
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 gap-x-8 md:grid-cols-2">
          <div className=" h-fit space-y-8 rounded-2xl border-dyan/50 bg-paper px-4 py-6">
            <FormCard
              icon={CircleUserRoundIcon}
              title="Customer Info"
              extra={customerId}
              route={route ?? "cusomers"}
            >
              {customerInfo.map((item, index) => (
                <FormField
                  control={control}
                  name={item.name}
                  key={item.name}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <InputOption
                          props={{
                            item,
                            index,
                            field,
                            length: customerInfo.length,
                          }}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              ))}
            </FormCard>

            <FormCard
              icon={NotebookTabsIcon}
              title="Contact Details"
              route={route ?? "customers"}
            >
              {contactInfo.map((item, index) => (
                <FormField
                  control={control}
                  name={item.name}
                  key={item.name}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <InputOption
                          props={{
                            item,
                            index,
                            field,
                            length: contactInfo.length,
                          }}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                ></FormField>
              ))}
            </FormCard>
          </div>

          <div className="space-y-6 rounded-2xl border-[0px] bg-paper px-4 py-6">
            <FormCard
              icon={MapIcon}
              title="Customer Address"
              extra={
                <SameShippingAddress
                  checked={sameAsShipping}
                  onCheckedChange={handleToggleSameAddress}
                />
              }
              route={route ?? "customers"}
            >
              {customerAddress.map((item, index) => (
                <FormField
                  control={control}
                  name={item.name}
                  key={item.name}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <InputOption
                          props={{
                            item,
                            index,
                            field,
                            length: customerAddress.length,
                          }}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              ))}
            </FormCard>
          </div>
        </div>
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center space-x-4">
            {formState.isDirty ? (
              <Button
                onClick={() => resetInputFields()}
                size={"default"}
                variant={"outline"}
                className={cn(
                  "",
                  formState.isValid
                    ? `border-clay/50 text-clay hover:border-rose-500/50 hover:bg-rose-500 hover:text-white`
                    : ``,
                )}
              >
                <XIcon className="" />

                <p className="pr-2">Reset all fields</p>
              </Button>
            ) : null}
          </div>
          <Button
            type="submit"
            size={"lg"}
            variant={formState.isValid ? "outline" : "default"}
            disabled={!formState.isValid || customerLoading}
            className={cn(
              "space-x-4 border-[0.33px] border-clay",
              formState.isValid
                ? `border-sky-500 bg-sky-500 text-white hover:border-sky-500`
                : `opacity-50`,
            )}
          >
            {customerLoading ? (
              <Disc3Icon className="size-5 animate-spin stroke-1" />
            ) : (
              <PlusIcon />
            )}

            <p>Add Customer</p>
          </Button>
        </div>
      </form>
    </Form>
  );
};

const SameShippingAddress = ({ checked, onCheckedChange }: SwitchProps) => (
  <div className="flex items-center space-x-3 font-sans">
    <p
      className={cn(
        checked ? "text-dyan" : "text-dyan/50",
        "text-sm font-medium tracking-tight",
      )}
    >
      Same as shipping
    </p>
    <div>
      <Switch
        checked={checked}
        onCheckedChange={onCheckedChange}
        aria-label="Same as shipping"
      />
    </div>
  </div>
);
