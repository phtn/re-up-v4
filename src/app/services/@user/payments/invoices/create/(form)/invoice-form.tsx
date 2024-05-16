import { Form, FormControl, FormField, FormItem } from "@@ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@src/app/(ui)/button";
import { cn } from "@src/utils/cn";
import {
  ContactRoundIcon,
  Disc3Icon,
  FilePenLineIcon,
  MapPinIcon,
  PenLineIcon,
  PlusIcon,
  XIcon,
  type LucideIcon,
} from "lucide-react";
import { useForm, type Control } from "react-hook-form";
import { useInvoiceController } from "../../../(hooks)/invoice";
import { type FormProps } from "../../../types";
import {
  CreateInvoiceFormProps,
  invoiceFields,
  invoiceFormDefaults,
  type CreateInvoiceFormSchema,
  type InvoiceField,
} from "./schema";
// import { Checkbox } from "@src/app/(ui)/checkbox";
import { FormCard, GreyCard } from "@src/app/services/(components)/form-card";
import { InputOption } from "@src/app/services/(components)/field-options";
import { type CopperxCustomerDataSchema } from "@src/server/resource/copperx/customer";
import { type LineItemSchema } from "@src/server/resource/copperx/invoice";
import { opts } from "@src/utils/helpers";
import { useCallback, useEffect, useMemo, useState } from "react";
import { getDecimalAmount } from "../../../(hooks)/helpers";
import { type CurrencySchema } from "@src/server/resource/copperx/common";
import { CustomerSelect } from "../(components)/customer-select";
import { ProductSelect } from "../(components)/product-select";

export const CreateInvoiceForm = ({
  userId,
  onSelect,
  customerList,
  currentCustomerId,
  productList,
  productIdList,
  addProduct,
  // removeProduct,
}: FormProps) => {
  const form = useForm<CreateInvoiceFormSchema>({
    resolver: zodResolver(CreateInvoiceFormProps),
    defaultValues: invoiceFormDefaults,
  });

  // Invoice Hook
  const {
    lineItems,
    handleCreateInvoice,
    invoiceLoading,
    setProductIds,
    setAllProducts,
  } = useInvoiceController();

  useEffect(() => {
    setProductIds(productIdList);
  }, [productIdList, setProductIds]);

  useEffect(() => {
    setAllProducts(productList);
  }, [productList, setAllProducts]);

  const { handleSubmit, control, formState, reset } = form;

  const invoiceInfo = invoiceFields.slice(0, 2);
  const resetInputFields = () => reset(invoiceFormDefaults);

  const [customerEditor] = useState(false);
  const CustomerDetailOptions = useCallback(() => {
    const options = opts(
      <CustomerEditInfo inputFields={invoiceInfo} control={control} />,
      <ContactDetailRenderer
        icon={ContactRoundIcon}
        list={customerList ?? []}
        id={currentCustomerId}
      />,
    );
    return <>{options.get(customerEditor)}</>;
  }, [customerEditor, invoiceInfo, control, currentCustomerId, customerList]);

  const onSubmit = (data: CreateInvoiceFormSchema) => {
    handleCreateInvoice({ data, userId: `${userId}` })
      .then(resetInputFields)
      .catch((e: Error) => console.log("Form Error", e));
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 rounded-xl md:grid-cols-5">
          <div className="col-span-2 h-fit space-y-4 rounded-xl rounded-tr-none border-dyan/50 bg-paper px-4 py-6">
            <CustomerSelect
              customerList={customerList}
              onSelect={onSelect}
              currentCustomerId={currentCustomerId}
            />

            <GreyCard>
              <CustomerDetailOptions />
            </GreyCard>
          </div>

          <div className="col-span-3 h-fit space-y-4 rounded-xl rounded-l-none border-[0px] bg-mojo px-4 py-6">
            <ProductSelect
              productList={productList}
              onAddProduct={addProduct}
            />

            <FormCard
              icon={FilePenLineIcon}
              title={`Items@${productIdList.length - 1}`}
              route={"grey"}
            >
              <ProductDetailRenderer list={lineItems ?? []} />
            </FormCard>
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
                // disabled={!formState.isValid || loading}
                className={cn(
                  "space-x-4 rounded-lg border-[0.33px] border-clay/50 font-semibold tracking-tight",
                  formState.isValid
                    ? `bg-sky-500 text-white hover:border-sky-500`
                    : ``,
                )}
              >
                {invoiceLoading ? (
                  <Disc3Icon className="size-5 animate-spin stroke-1" />
                ) : (
                  <PlusIcon />
                )}

                <p>Create Invoice</p>
              </Button>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
};

type CustomerInfoProps = {
  inputFields: InvoiceField[];
  control: Control<CreateInvoiceFormSchema>;
};
export const CustomerEditInfo = ({
  inputFields,
  control,
}: CustomerInfoProps) => (
  <>
    {inputFields.map((item, index) => (
      <FormField
        control={control}
        name={item.name}
        key={item.name}
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <InputOption
                inputType={item.inputType}
                props={{
                  item,
                  index,
                  field,
                  length: inputFields.length,
                }}
              />
            </FormControl>
          </FormItem>
        )}
      />
    ))}
  </>
);

type RenderProps<T> = {
  list: T[];
  id: string | undefined;
  icon: LucideIcon;
};
const ContactDetailRenderer = (
  props: RenderProps<CopperxCustomerDataSchema>,
) => {
  const { list, id } = props;

  const customer = useMemo(() => {
    return list?.find((item) => item.id === id);
  }, [list, id]);

  const contactDetails = useMemo(
    () => [
      { name: "email", value: customer?.email },
      { name: "phone", value: customer?.phone },
      { name: "organization", value: customer?.organizationName },
    ],
    [customer],
  );

  const address = useMemo(
    () => [
      { name: "unit / st", value: customer?.address?.line1 },
      { name: "city", value: customer?.address?.city },
      {
        name: "region",
        value: `${customer?.address?.state}`,
      },
      {
        name: "country",
        value: `${customer?.address?.country}, ${customer?.address?.postalCode}`,
      },
    ],
    [customer],
  );

  if (!customer) {
    return (
      <div className="flex h-[100px] items-center justify-center">
        <div />
      </div>
    );
  }
  return (
    <div className="space-y-4 px-3 py-4 text-sm font-medium text-dyan">
      <DetailHeader title="Contact Details" id={id} icon={ContactRoundIcon} />
      <div className="rounded-[6px] border-[0.33px] border-clay/50 bg-slate-400/10">
        <DetailItem label="Contact Info" values={contactDetails ?? []} />
      </div>
      <div className="h-1" />
      <DetailHeader title="Address" id={id} icon={MapPinIcon} />
      <div className="rounded-[6px] border-[0.33px] border-clay/50 bg-slate-400/10">
        <DetailItem label="Address Info" values={address ?? []} />
      </div>
    </div>
  );
};

type DetailHeaderProps = {
  title: string;
  icon: LucideIcon;
  id: string | undefined;
};
const DetailHeader = (props: DetailHeaderProps) => {
  const { title } = props;
  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex space-x-3 font-sans text-[17px] font-semibold tracking-tighter text-dyan">
        <props.icon size={18} strokeWidth={1.5} className={cn("text-dyan")} />
        <p>{title}</p>
      </div>
      <div className="rounded p-[2px] hover:bg-slate-300/80">
        <PenLineIcon className="size-4 text-dyan" />
      </div>
    </div>
  );
};

type DetailItemProps = {
  values: {
    name: string;
    value: string | undefined;
  }[];
  label?: string;
};
const DetailItem = (props: DetailItemProps) => {
  const { values } = props;
  if (!values) return;

  return (
    <>
      {values?.map((value, i) => (
        <div
          key={i}
          className={cn(
            "flex h-10 w-full items-center justify-between border-clay/30 px-3",
            i !== values?.length - 1 ? "border-b-[0.33px]" : "border-0",
          )}
        >
          <p className="font-mono text-xs text-dyan/70">{value.name}</p>
          <p className="font-sans text-[13px]">{value?.value}</p>
        </div>
      ))}
    </>
  );
};

type ProductRenderProps<T> = {
  list: T[];
  currency?: CurrencySchema;
  icon?: LucideIcon;
};
const ProductDetailRenderer = ({
  list,
}: ProductRenderProps<LineItemSchema>) => {
  // const products = useMemo(() => {
  //   return list?.filter((item) => ids.includes(item.id));
  // }, [list, ids]);

  const parser = (value: number) => Number(getDecimalAmount(String(value)));

  const total = useMemo(() => {
    return list.reduce((acc, cur) => {
      const decimalValue = parser(cur.priceData.unitAmount * cur.quantity);
      return (acc += decimalValue);
    }, 0);
  }, [list]);

  const totalItems = useMemo(() => {
    return list.reduce((acc, cur) => {
      const itemCount = cur?.quantity;
      return (acc += itemCount);
    }, 0);
  }, [list]);

  return (
    <div className="space-y-2 py-2">
      <div className="grid w-full grid-cols-10 px-2 font-medium tracking-tight text-copper/70">
        <div className="col-span-5">Item</div>
        <div className="col-span-1 flex justify-center">Qty</div>
        <div className="col-span-2 flex justify-end">Unit Price</div>
        <div className="col-span-2 flex justify-end">Total</div>
      </div>
      <div className="rounded-[6px] border-[0.33px] border-clay/50 bg-zap/80">
        <LineItem items={list} label="Product Item" />
      </div>

      <div className="h-2" />
      <div className="flex h-14 items-center rounded-[6px] border-[0.33px] border-clay/50 bg-dyan px-3 text-zap">
        <div className="grid w-full grid-cols-10">
          <div className="col-span-5 flex flex-col">
            <p className="text-[18px] font-semibold tracking-tight">Total</p>
          </div>
          <div className="col-span-1 flex items-center justify-center font-mono">
            {totalItems}
          </div>
          <div className="col-span-2" />
          <div className="col-span-2 flex items-center justify-end space-x-1">
            <div className="flex items-center space-x-2">
              <p className="text-[18px] font-semibold tracking-tight">
                {total.toLocaleString("en-US", { minimumFractionDigits: 2 })}
              </p>
              <p className="text-[14px] font-medium uppercase tracking-tighter text-sky-400">
                {`${list[0]?.priceData.currency}`}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

type LineItemProps = {
  items: LineItemSchema[];
  label?: string;
};
const LineItem = (props: LineItemProps) => {
  const { items } = props;
  if (!items) return;

  return (
    <>
      {items?.map((item, i) => (
        <div
          key={i}
          className={cn(
            "flex h-16 items-center border-clay/50 px-3 text-xs text-dyan",
            i !== items.length - 1 ? "border-b-[0.33px]" : "border-0",
          )}
        >
          <div className="grid w-full grid-cols-10">
            <div className="col-span-5 flex flex-col space-y-1 overflow-x-scroll whitespace-nowrap">
              <p className="text-[16px] font-semibold tracking-tight text-dyan">
                {item.priceData?.productData?.name}
              </p>
              <p className="text-dyan/70">
                {item.priceData?.productData?.description}
              </p>
            </div>
            <div className="col-span-1 flex items-center justify-center font-mono">
              {item.quantity}
            </div>
            <div className="col-span-2 flex items-center justify-end space-x-1 uppercase">
              <div className="flex items-center space-x-0.5 font-mono tracking-tighter">
                <p className="text-sm">
                  {getDecimalAmount(String(item.priceData.unitAmount))}
                </p>
                <p className="text-[12px] font-normal text-dyan/50">
                  {item.priceData.currency}
                </p>
              </div>
            </div>
            <div className="col-span-2 flex items-center justify-end space-x-1 uppercase">
              <div className="flex items-center space-x-0.5 tracking-tighter">
                <p className="font-mono text-sm font-medium">
                  {getDecimalAmount(
                    String(item.priceData.unitAmount * item.quantity),
                  )}
                </p>
                <p className="font-mono text-xs text-dyan/50">
                  {item.priceData.currency}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

// const AcceptCrypto = () => (
//   <div className="flex items-center space-x-3">
//     <p className="font-medium tracking-tight text-copper">Accept Crypto</p>
//     <Checkbox
//       checked={true}
//       aria-label="Accept Crypto Payments"
//       className="flex size-5 items-center justify-center text-copper"
//     >
//       <CheckIcon
//         className={cn(
//           "h-4 w-4 scale-50 stroke-[0.33px] text-cord transition-all duration-300",
//           true ? `scale-100 stroke-[3px]` : `scale-0 stroke-[1px]`,
//         )}
//       />
//     </Checkbox>
//   </div>
// );
