import type {
  InvoiceControllerCreateResponse200,
  InvoiceControllerGetAllResponse200,
} from ".api/apis/copperx";
import type {
  FindAllInvoiceSchema,
  LineItemSchema,
  CreateInvoiceSchema,
  CopperxInvoiceResponseDataSchema,
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
  IcashGenQRResponseSchema,
} from "@src/server/resource/icash";
import { v4 as uuid } from "uuid";
import { errHandler } from "@src/utils/helpers";
import { addInvoiceInternal } from "@src/trpc/internal/payments/invoice";

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
    const items = createLineItems({ productIds, allProducts });
    setLineItems(items);
  }, [productIds, allProducts]);

  const handleCreateInvoice = async (params: CreateInvoiceHookParams) => {
    setLoading(true);
    const { data, userId } = params;

    if (!lineItems) return;

    const invoiceResource: CreateInvoiceSchema = {
      clientReferenceId: userId,
      customerId: `${selectedCustomer}`,
      description: data.description,
      dueDate: data.dueDate,
      lineItems: {
        data: lineItems,
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

    await createInvoice(invoiceResource)
      .then((res) => {
        const response: Record<string, unknown> = JSON.parse(
          res,
        ) as InvoiceControllerCreateResponse200;

        const data: CopperxInvoiceResponseDataSchema =
          response.data as CopperxInvoiceResponseDataSchema;

        addInvoiceInternal({ userId, id: data.id, responseData: data })
          .then(() => {
            setLoading(false);
            onSuccess("Invoice created", `invoice-id: ${data.id}`);
            router.push(`${invoicesRoute}/${data.id}`);
          })
          .catch((e: Error) => errHandler(e, setLoading));
      })
      .catch((e: Error) => errHandler(e, setLoading));
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

  productIds
    .filter((element) => element !== "0")
    .forEach((id) => {
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
        // const data = response.data as CopperxInvoiceDataSchema;
        // console.log(data);
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

export interface QrResource {
  merchantCustomerId: string;
  lastName: string;
  firstName: string;
  amount: number;
}

export const useIcash = () => {
  const [qr, setQr] = useState<IcashGenQRResponseSchema | undefined>();
  const [imageUrl, setImageUrl] = useState<string>("");
  const [icashLoading, setLoading] = useState(false);

  const icash_auth = {
    merchantCode: `${process.env.NEXT_PUBLIC_ICASH_CODE}`,
    merchantUsername: `${process.env.NEXT_PUBLIC_ICASH_USER}`,
    merchantPassword: `${process.env.NEXT_PUBLIC_ICASH_PASS}`,
  };

  const va_resource: IcashCreateVASchema = {
    ...icash_auth,
    merchantCustomerId: "370b9afc-43f2-40f5-ae5f-907a1dfbe397", // 370b9afc-43f2-40f5-ae5f-907a1dfbe397
    firstName: "re-up.ph", // van: 77022052965
    lastName: "Wed Services",
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
    const response = await icashAuth(icash_auth);
    console.log(response);
  };

  const generateQR = async (resource: QrResource) => {
    setLoading(true);
    const qr_resource = {
      ...icash_auth,
      ...resource,
      merchantTransactionId: uuid(),
    };

    const response = await icashGenQRCode(qr_resource);
    setQr(response);
    console.log(response.merchantTransactionId);

    const imageData = response.base64Image as string;
    if (imageData) {
      setLoading(false);
    }
    setImageUrl(getImageUrl(imageData));

    onSuccess("QR Generated!", `TxnID: ${response.merchantTransactionId}`);
  };

  return {
    qr,
    imageUrl,
    generateQR,
    handleAuth,
    handleGetVA,
    icashLoading,
    handleCreateVA,
  };
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
