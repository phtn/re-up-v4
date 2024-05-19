import { Form, FormControl, FormField, FormItem } from "@@ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DevTool } from "@hookform/devtools";
import { Button } from "@src/app/(ui)/button";
import { FormCard } from "@src/app/services/(components)/form-card";
import { InputOption } from "@src/app/services/(components)/field-options";
import { cn } from "@src/utils/cn";
import {
  CurrencyIcon,
  Disc3Icon,
  FileBarChart2,
  HandCoinsIcon,
  PackageCheckIcon,
  PackageOpenIcon,
  PackageXIcon,
  ReceiptTextIcon,
  TagIcon,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { useProductController } from "../../../(hooks)/product";
import { type ProductFormProps } from "../../../types";
import {
  AddProductFormProps,
  productFields,
  productFormDefaults,
  type AddProductFormSchema,
} from "./schema";
import { SwitchOption } from "@src/app/services/(components)/switch-options";
import { SelectOption } from "@src/app/services/(components)/select-options";
import { currencyList, transformer } from "../../../(context)/currency-list";
import { paymentTypes } from "../../../(context)/payment-types";
import { TopAmount } from "@src/app/services/(components)/text-options";
import { useEffect } from "react";

export const AddProductForm = ({ userId, route }: ProductFormProps) => {
  const {
    handleProductStatus,
    handleAddProduct,
    productLoading,
    setPaymentType,
    setCurrency,
    currency,
    isActive,
    type,
  } = useProductController();

  const extraDefaults = { currency, type };
  const defaultValues = {
    ...productFormDefaults,
    ...extraDefaults,
    unitAmount: "",
  };

  const form = useForm<AddProductFormSchema>({
    resolver: zodResolver(AddProductFormProps),
    defaultValues,
    mode: "onChange",
  });

  const { handleSubmit, setValue, control, formState, reset, register } = form;
  const { isValid } = formState;

  useEffect(() => {
    setValue("isActive", isActive, { shouldDirty: true, shouldTouch: true });
  }, [isActive, setValue]);

  useEffect(() => {
    setValue("type", type, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  }, [type, setValue]);

  useEffect(() => {
    setValue("currency", currency, { shouldDirty: true, shouldTouch: true });
  }, [currency, setValue]);

  const productInfo = productFields.slice(0, 2);
  const productDetails = productFields.slice(3, 5);

  const resetInputFields = () => reset(defaultValues);

  const onSubmit = (data: AddProductFormSchema) => {
    handleAddProduct({ data, userId })
      .then(resetInputFields)
      .catch((_: Error) => console.log("Form Error", "Not your fault."));
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 gap-x-4 rounded-xl bg-mojo md:grid-cols-2">
          <div className="h-fit space-y-8 rounded-xl border-dyan/50 bg-mojo px-4 py-6">
            <FormCard
              icon={PackageOpenIcon}
              title="Product Info"
              extra={""}
              route={route ?? "products"}
            >
              {productInfo.map((item, index) => (
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
                            isValid,
                            length: productInfo.length,
                          }}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              ))}
            </FormCard>

            <FormCard
              icon={FileBarChart2}
              title="Product Details"
              route={route ?? "products"}
            >
              <SwitchOption
                position="top"
                id="isActive"
                on="Active"
                off="Inactive"
                checked={isActive}
                onCheckedChange={handleProductStatus}
                icon={isActive ? PackageCheckIcon : PackageXIcon}
                label="Product Status"
              />
              {productDetails.map((item, index) => (
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
                            index: index + 1,
                            field,
                            length: productDetails.length + 1,
                            isValid,
                          }}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                ></FormField>
              ))}
            </FormCard>
          </div>

          <div className="h-fit space-y-6 rounded-xl border-[0px] bg-mojo px-4 py-6">
            <FormCard
              icon={ReceiptTextIcon}
              title="Pricing"
              route={route ?? "products"}
            >
              <SelectOption
                title={"Type"}
                label={"Payment Type@required"}
                icon={HandCoinsIcon}
                onValueChange={setPaymentType}
                options={paymentTypes ?? []}
                transformer={transformer}
                loading={false}
                position="top"
              />
              <SelectOption
                title="Currency"
                icon={CurrencyIcon}
                label="Select currency@required"
                loading={false}
                options={currencyList ?? []}
                onValueChange={setCurrency}
                transformer={transformer}
                position="bottom"
              />

              <div className="py-4">
                <TopAmount
                  label="Unit Price@required"
                  icon={TagIcon}
                  // value={unitAmount}
                  {...register("unitAmount")}
                />
              </div>
            </FormCard>
            <div className="flex w-full items-center justify-between">
              <div className="flex items-center space-x-4">
                {formState.isDirty ? (
                  <Button
                    onClick={resetInputFields}
                    size={"default"}
                    variant={"ghost"}
                    className={cn(
                      "",
                      formState.isValid
                        ? `border-clay/50 text-clay hover:border-rose-500/50 hover:bg-rose-500 hover:text-white`
                        : ``,
                    )}
                  >
                    <p className="pr-2">Clear all fields</p>
                  </Button>
                ) : null}
              </div>
              <Button
                type="submit"
                size={"lg"}
                variant={isValid ? "outline" : "default"}
                // disabled={!formState.isValid || loading}
                className={cn(
                  "space-x-4",
                  isValid
                    ? `border-dyan bg-dyan text-white hover:border-dyan`
                    : productLoading
                      ? `bg-dyan/10 text-dyan/80`
                      : `cursor-not-allowed bg-amber-700/5 text-clay/80 opacity-80`,
                )}
              >
                <p>{productLoading ? "Adding..." : "Add Product"}</p>
                {productLoading ? (
                  <Disc3Icon className="size-5 animate-spin stroke-1" />
                ) : null}
              </Button>
            </div>
          </div>
        </div>
      </form>
      <DevTool control={control} />
    </Form>
  );
};
