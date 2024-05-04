// import type { InvoiceControllerGetResponse200 } from ".api/apis/copperx";
import type { InvoiceControllerGetAllResponse200 } from ".api/apis/copperx";
import type {
  FindAllInvoiceSchema,
  CreateInvoiceSchema,
} from "@src/server/resource/copperx/invoice";
import { createInvoice, findAllInvoices } from "@src/trpc/copperx/invoice";
import { onError, onSuccess } from "@src/utils/toast";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
// import { v4 as uuid } from "uuid";

const invoicesRoute = `/services/payments/invoices`;

export const useCreateInvoice = () => {
  const [invoiceLoading, setLoading] = useState(false);
  const router = useRouter();

  const handleCreateInvoiceRoute = () => {
    setLoading(true);
    router.push(`${invoicesRoute}/create-invoice`);
  };

  const handleCreateInvoice = async () => {
    setLoading(true);
    await createInvoice(invoiceResource)
      .then((res) => {
        // const response: Record<string, unknown> = JSON.parse(
        //   res,
        // ) as InvoiceControllerCreateResponse200;

        // const data: InvoiceControllerCreateResponse200 =
        //   response.data as InvoiceControllerCreateResponse200;
        console.log(res);
        setLoading(false);
        onSuccess("Invoice created", `Customer ID: ${0}`);
      })
      .catch((e: Error) => {
        onError(e.name, e.message);
        console.log(e);
      });
  };

  return { handleCreateInvoiceRoute, handleCreateInvoice, invoiceLoading };
};

export const invoiceResource: CreateInvoiceSchema = {
  description: "Test Invoice",
  customFields: {
    fields: [{ name: "Custom Field Name", value: "Custom Field Value" }],
  },
  dueDate: "2024-05-08T15:59:59.999Z",
  footer: "",
  fromInvoiceId: undefined,
  clientReferenceId: "1AE5REWUKK",
  visibility: undefined,
  allowPromotionCodes: true,
  customerId: "4ad8dc39-1649-4560-8eac-159375a0249c",
  lineItems: {
    data: [
      {
        priceId: "2ef87743-4e85-4e24-8198-7b9e259698a7",
        priceData: {
          currency: "usdc",
          interval: undefined,
          intervalCount: undefined,
          unitAmount: 50000000000, // "50_000_000_000"
          productId: "e7d0c717-e9d8-45b2-a123-2326d018b369",
          productData: {
            name: "Test Product Name",
            description: "Test Product Description",
            images: [
              "66d25f22-62c2-4fea-8c9f-5dab2ac08cfd/c96e15ab-330f-4415-98ac-c175e024fe3b.png",
            ],
            unitLabel: undefined,
            url: undefined,
            visibility: undefined,
          },
          type: "one_time",
        },
        quantity: 1,
        periodStart: undefined,
        periodEnd: undefined,
      },
    ],
  },
  paymentSetting: {
    allowedChains: [{ chainId: 1 }],
    preferredChainId: 1,
    preferredCurrency: "usdc",
    allowSwap: false,
  },
};

// const newInvoiceResource = {
//   customFields: { fields: [{ name: "string", value: "string" }] },
//   lineItems: {
//     data: [
//       {
//         priceData: {
//           currency: "usdc",
//           productData: {
//             name: "string",
//             description: "string",
//             images: [
//               "66d25f22-62c2-4fea-8c9f-5dab2ac08cfd/c96e15ab-330f-4415-98ac-c175e024fe3b.png",
//             ],
//             unitLabel: "per",
//             url: "string",
//             visibility: 10,
//           },
//           unitAmount: 50000000000,
//           productId: "e7d0c717-e9d8-45b2-a123-2326d018b369",
//           type: "one_time",
//         },
//         quantity: 1,
//         priceId: "2ef87743-4e85-4e24-8198-7b9e259698a7",
//         periodStart: "2024-05-01T08:35:05.803Z",
//         periodEnd: "2024-05-01T08:35:05.803Z",
//       },
//     ],
//   },
//   paymentSetting: {
//     allowSwap: false,
//     allowedChains: [{ chainId: 1 }],
//     preferredChainId: 1,
//     preferredCurrency: "usdc",
//   },
//   description: "anything",
//   dueDate: "2024-05-08T15:59:59.999Z",
//   clientReferenceId: "1AE5REWUKK",
//   visibility: 10,
//   allowPromotionCodes: true,
//   customerId: "4ad8dc39-1649-4560-8eac-159375a0249c",
// };

export const useFetchInvoices = () => {
  const [invFetchLoading, setLoading] = useState(false);
  const [invoiceList, setInvoiceList] = useState<FindAllInvoiceSchema>();

  const handleFindAllInvoices = () => {
    setLoading(true);
    findAllInvoices()
      .then((res) => {
        const response: Record<string, unknown> = JSON.parse(
          res,
        ) as InvoiceControllerGetAllResponse200;
        setInvoiceList(response.data as FindAllInvoiceSchema);
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e.message);
      });
  };

  useEffect(() => {
    handleFindAllInvoices();
  }, []);

  return { handleFindAllInvoices, invFetchLoading, invoiceList };
};
