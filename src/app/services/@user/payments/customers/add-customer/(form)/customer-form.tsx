import { Form, FormControl, FormField, FormItem } from "@@ui/form";
import { InputFieldPayments } from "@@ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  BarcodeIcon,
  CheckIcon,
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
import { type FormProps } from "../../../types";
import { useCustomerController } from "../../../(hooks)/customer";
import { v4 as uuid } from "uuid";
import { Button } from "@src/app/(ui)/button";
import { cn } from "@src/utils/cn";
import { Checkbox } from "@src/app/(ui)/checkbox";

export const AddCustomerForm = ({ userId }: FormProps) => {
  const form = useForm<AddCustomerFormSchema>({
    resolver: zodResolver(AddCustomerFormProps),
    defaultValues: customerFormDefaults,
  });

  const { handleSubmit, control, formState, reset } = form;
  const { handleAddCustomer, loading } = useCustomerController();

  const customerId = uuid();
  const customerInfo = customerFields.slice(0, 4);
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
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="space-y-6 rounded-s-lg border-[0.33px] border-dyan/50 bg-paper/50 px-8 pb-8 pt-6">
            <p className="font-medium tracking-tight text-copper">
              Customer Info - Auto generated ID
            </p>
            <InputFieldPayments
              name={"reader"}
              icon={BarcodeIcon}
              alt={"user"}
              placeholder={customerId}
              label={"Auto-ID"}
              type={"text"}
              disabled
            />
            {customerInfo.map((item) => (
              <FormField
                control={control}
                name={item.name}
                key={item.name}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <InputFieldPayments
                        icon={item.icon}
                        alt={item.alt}
                        placeholder={item.placeholder}
                        label={item.label}
                        type={item.type}
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              ></FormField>
            ))}
          </div>

          <div className="space-y-6 rounded-e-lg border-[0.33px] border-l-0 border-dyan/50 bg-paper/50 px-8 pb-8 pt-6">
            <div className="flex items-center justify-between">
              <p className="font-medium tracking-tight text-copper">
                Customer&apos;s Address
              </p>
              <div className="flex items-center space-x-3">
                <p className="font-medium tracking-tight text-copper">
                  Same as shipping
                </p>
                <Checkbox
                  checked={true}
                  aria-label="Same as shipping"
                  className="flex size-5 items-center justify-center text-copper"
                >
                  <CheckIcon
                    className={cn(
                      "h-4 w-4 scale-50 stroke-[0.33px] text-cord transition-all duration-300",
                      true ? `scale-100 stroke-[3px]` : `scale-0 stroke-[1px]`,
                    )}
                  />
                </Checkbox>
              </div>
            </div>
            {customerAddress.map((item) => (
              <FormField
                control={control}
                name={item.name}
                key={item.name}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <InputFieldPayments
                        icon={item.icon}
                        alt={item.alt}
                        placeholder={item.placeholder}
                        label={item.label}
                        type={item.type}
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              ></FormField>
            ))}
          </div>
        </div>
        <div className="flex w-full items-center justify-between py-4">
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
            disabled={!formState.isValid || loading}
            className={cn(
              "space-x-4",
              formState.isValid ? `border-sky-500 text-sky-500` : ``,
            )}
          >
            {loading ? <Disc3Icon className="animate-spin" /> : <PlusIcon />}

            <p>Add Customer</p>
          </Button>
        </div>
      </form>
    </Form>
  );
};
