import type {
  InvoiceControllerCreateResponse200,
  InvoiceControllerGetAllResponse200,
} from ".api/apis/copperx";
import type {
  FindAllInvoiceSchema,
  CopperxInvoiceDataSchema,
  LineItemSchema,
  CreateInvoiceSchema,
} from "@src/server/resource/copperx/invoice";
import { createInvoice, findAllInvoices } from "@src/trpc/copperx/invoice";
import { onError, onSuccess } from "@src/utils/toast";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { CreateInvoiceHookParams } from "./types";
import type {
  PaymentTypeSchema,
  CurrencySchema,
} from "@src/server/resource/copperx/common";
import { type CopperxProductDataSchema } from "@src/server/resource/copperx/product";
// import { getCryptoPrices } from "@src/trpc/crypto/prices";
import {
  icashAuth,
  icashCreateVA,
  icashGenQRCode,
  icashGetVA,
} from "@src/trpc/icash/merchant";
import type {
  IcashCreateVASchema,
  IcashGenQRSchema,
  IcashGenQRResponseSchema,
  IcashAuthSchema,
} from "@src/server/resource/icash";
import { v4 as uuid } from "uuid";

type CreateLineItemProps = {
  allProducts: CopperxProductDataSchema[] | undefined;
  productIds: string[];
};

const invoicesRoute = `/services/payments/invoices`;

export const useInvoiceController = () => {
  const [invoiceLoading, setLoading] = useState(false);
  const router = useRouter();

  const handleCreateInvoiceRoute = () => {
    setLoading(true);
    router.push(`${invoicesRoute}/create/0/0`);
  };

  const [selectedCustomer, setSelectedCustomer] = useState<string>("");

  const [allProducts, setAllProducts] = useState<
    CopperxProductDataSchema[] | undefined
  >();
  const [productIds, setProductIds] = useState<string[]>([]);

  const [selectedPayment, setSelectedPayment] =
    useState<PaymentTypeSchema>("one_time");

  const [selectedCurrency, setSelectedCurrency] =
    useState<CurrencySchema>("usdt");

  const [lineItems, setLineItems] = useState<LineItemSchema[] | undefined>();

  useEffect(() => {
    // const p = allProducts?.filter((item) => productIds?.includes(item.id));

    // const data = p?.map((item) => ({
    //   priceId: item.defaultPriceId,
    //   priceData: {
    //     currency: selectedCurrency,
    //     interval: undefined,
    //     intervalCount: undefined,
    //     unitAmount: +item.defaultPrice.unitAmount,
    //     productId: item.defaultPrice.productId,
    //     productData: {
    //       name: item.name,
    //       description: item.description,
    //       images: [],
    //     },
    //     type: item.defaultPrice.type,
    //   },
    //   quantity: 1,
    //   periodStart: undefined,
    //   periodEnd: undefined,
    // }));

    const items = createLineItems({ productIds, allProducts });
    setLineItems(items);
  }, [productIds, allProducts]);

  const handleCreateInvoice = async (params: CreateInvoiceHookParams) => {
    setLoading(true);
    const { data, userId } = params;

    const invoiceResource: CreateInvoiceSchema = {
      clientReferenceId: userId,
      customerId: `${selectedCustomer}`,
      description: data.description,
      dueDate: data.dueDate,
      lineItems: {
        data: lineItems!,
      },
      paymentSetting: {
        allowedChains: [{ chainId: 56 }],
        preferredChainId: 56,
        preferredCurrency: "usdt",
        allowSwap: false,
      },
      footer: "",
      allowPromotionCodes: true,
      fromInvoiceId: undefined,
      visibility: undefined,
      customFields: {
        fields: [{ name: "refId", value: userId }],
      },
    };

    console.log(invoiceResource);
    // setLoading(false);
    // onSuccess("Invoice Valid", "Not saved.");
    await createInvoice(invoiceResource)
      .then((res) => {
        const response: Record<string, unknown> = JSON.parse(
          res,
        ) as InvoiceControllerCreateResponse200;

        const data: InvoiceControllerCreateResponse200 =
          response.data as InvoiceControllerCreateResponse200;
        // console.log(res);
        setLoading(false);
        onSuccess("Invoice created", `Customer ID: ${data.id}`);
      })
      .catch((e: Error) => {
        setLoading(false);
        onError(e.name, e.message);
        console.log(e.message);
      });
  };

  return {
    handleCreateInvoiceRoute,
    handleCreateInvoice,
    invoiceLoading,
    selectedCustomer,
    setSelectedCustomer,
    setAllProducts,
    setProductIds,
    setSelectedCurrency,
    selectedCurrency,
    setSelectedPayment,
    selectedPayment,
    lineItems,
  };
};

const createLineItems = ({ productIds, allProducts }: CreateLineItemProps) => {
  const lineItemMap: Record<string, LineItemSchema> = {};

  productIds.forEach((id) => {
    const product = allProducts?.find((p) => p.id === id);
    if (product) {
      if (lineItemMap[product.id]) {
        lineItemMap[product.id]!.quantity += 1;
      } else {
        lineItemMap[product.id] = {
          priceId: product.defaultPriceId,
          priceData: {
            currency: product.defaultPrice.currency,
            interval: undefined,
            intervalCount: undefined,
            unitAmount: +product.defaultPrice.unitAmount,
            productId: product.defaultPrice.productId,
            productData: {
              name: product.name,
              description: product.description,
              images: [],
            },
            type: product.defaultPrice.type,
          },
          quantity: 1,
          periodStart: undefined,
          periodEnd: undefined,
        };
      }
    }
  });
  return Object.values(lineItemMap);
};

export const useFetchInvoices = () => {
  const [fetchingInvoices, setLoading] = useState(false);
  const [invoiceList, setInvoiceList] = useState<FindAllInvoiceSchema>();

  const handleFindAllInvoices = () => {
    setLoading(true);
    findAllInvoices()
      .then((res) => {
        const response: Record<string, unknown> = JSON.parse(
          res,
        ) as InvoiceControllerGetAllResponse200;
        setInvoiceList(response.data as FindAllInvoiceSchema);
        const data = response.data as CopperxInvoiceDataSchema;
        console.log(data);
      })
      .catch((e: Error) => {
        onError("Error", e.message);
      });
  };

  useEffect(() => {
    handleFindAllInvoices();
  }, []);

  return { handleFindAllInvoices, fetchingInvoices, invoiceList };
};

export const useIcash = () => {
  const [qr, setQr] = useState<IcashGenQRResponseSchema | undefined>();
  const [imageUrl, setImageUrl] = useState<string>("");

  const icash_auth = {
    merchantCode: "FASTINSURE",
    merchantUsername: "fastinsure",
    merchantPassword: `XodZy9D5KTcYsQL@\$aRInahMd\$ufR39DsY`,
  };
  const auth_resource: IcashAuthSchema = {
    merchantCode: "FASTINSURE",
    merchantUsername: "fastinsure",
    merchantPassword: `XodZy9D5KTcYsQL@\$aRInahMd\$ufR39DsY`,
  };
  const va_resource: IcashCreateVASchema = {
    merchantCode: "FASTINSURE",
    merchantUsername: "fastinsure",
    merchantPassword: `XodZy9D5KTcYsQL@\$aRInahMd\$ufR39DsY`,
    merchantCustomerId: "370b9afc-43f2-40f5-ae5f-907a1dfbe397", // 370b9afc-43f2-40f5-ae5f-907a1dfbe397
    firstName: "re-up.ph", // van: 77022052965
    lastName: "Wed Services",
  };
  const qr_resource: IcashGenQRSchema = {
    ...icash_auth,
    // merchantCustomerId: "0123456789KILO",
    merchantCustomerId: "370b9afc-43f2-40f5-ae5f-907a1dfbe397",
    merchantTransactionId: uuid(),
    firstName: "elon",
    lastName: "UUID",
    amount: parseFloat((420.69).toFixed(2)),
  };

  const handleGetVA = async () => {
    const response = await icashGetVA("370b9afc-43f2-40f5-ae5f-907a1dfbe397");
    console.log(response);
  };
  const handleCreateVA = async () => {
    const response = await icashCreateVA(va_resource);
    console.log(response);
  };
  const handleAuth = async () => {
    const response = await icashAuth(auth_resource);
    console.log(response);
  };
  const handleGenQR = async () => {
    const response = await icashGenQRCode(qr_resource);
    setQr(response);
    console.log(response.merchantTransactionId);

    const imageData = response.base64Image as string;
    setImageUrl(getImageUrl(imageData));

    onSuccess("QR Generated!", `TxnID: ${response.merchantTransactionId}`);
  };

  return { handleAuth, handleGetVA, handleCreateVA, handleGenQR, qr, imageUrl };
};

const getImageUrl = (imageData: string) => {
  const byteChars = atob(imageData.split(",")[1] ?? "");
  const byteNums = new Array(byteChars.length);

  for (let i = 0; i < byteChars.length; i++) {
    byteNums[i] = byteChars.charCodeAt(i);
  }

  const byteArray = new Uint8Array(byteNums);
  const blob = new Blob([byteArray], { type: "image/png" });

  const imageUrl: string = URL.createObjectURL(blob);
  return imageUrl;
};
