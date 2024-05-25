"use client";

import { type Children } from "@src/app/(main)/types";
import { auth, db } from "@src/lib/db";
import { type ListingsResultDataSchema } from "@src/server/resource/cmc/crypto";
import { type CopperxCustomerDataSchema } from "@src/server/resource/copperx/customer";
import { type CopperxInvoiceResponseDataSchema } from "@src/server/resource/copperx/invoice";
import { type CopperxProductDataSchema } from "@src/server/resource/copperx/product";
import { getCryptoPrices } from "@src/trpc/crypto/prices";
import {
  collection,
  doc,
  type DocumentData,
  type FirestoreDataConverter,
} from "firebase/firestore";
import { createContext, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
// 15 45 135 270 900 1800 3600
// 15 60 195
// 10 30 90 270
//php 2803
//usd 2781
//eur 2790
//jpy 2797
// type Currencies = "usd" | "btc" | "php"
// interface CurrencyPairs {
//   btcusd:

// }
interface PaymentsContextValue {
  customers: {
    customerList: CopperxCustomerDataSchema[] | undefined;
    fetchingCustomers: boolean;
  };
  products: {
    productList: CopperxProductDataSchema[] | undefined;
    fetchingProducts: boolean;
  };
  invoices: {
    invoiceList: CopperxInvoiceResponseDataSchema[] | undefined;
    fetchingInvoices: boolean;
  };
  usd: ListingsResultDataSchema | undefined;
  php: ListingsResultDataSchema | undefined;
}

export const PaymentsContext = createContext<
  PaymentsContextValue | null | undefined
>(null);

export const PaymentsProvider = ({ children }: Children) => {
  const [user] = useAuthState(auth);

  const customerRef = collection(
    doc(db, `users/${user?.uid}/payments/customers`),
    "copperx",
  ).withConverter(customerDataConverter);
  const [customerList, fetchingCustomers] = useCollectionData(customerRef, {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  const productRef = collection(
    doc(db, `users/${user?.uid}/payments/products`),
    "copperx",
  ).withConverter(productDataConverter);
  const [productList, fetchingProducts] = useCollectionData(productRef, {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  const invoiceRef = collection(
    doc(db, `users/${user?.uid}/payments/invoices`),
    "copperx",
  ).withConverter(invoiceDataConverter);
  const [invoiceList, fetchingInvoices] = useCollectionData(invoiceRef, {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  const [php, setPHP] = useState<ListingsResultDataSchema | undefined>();
  const [usd, setUSD] = useState<ListingsResultDataSchema | undefined>();

  useEffect(() => {
    getCryptoPrices(2803)
      .then((res) => {
        setPHP(res.data);
      })
      .catch((e: Error) => console.log(e));

    getCryptoPrices(2781)
      .then((res) => {
        setUSD(res.data);
      })
      .catch((e: Error) => console.log(e));
  }, []);

  return (
    <PaymentsContext.Provider
      value={{
        customers: { customerList, fetchingCustomers },
        products: { productList, fetchingProducts },
        invoices: { invoiceList, fetchingInvoices },
        php,
        usd,
      }}
    >
      {children}
    </PaymentsContext.Provider>
  );
};

const customerDataConverter: FirestoreDataConverter<CopperxCustomerDataSchema> =
  {
    toFirestore(): DocumentData {
      return {};
    },
    fromFirestore(snapshot, options): CopperxCustomerDataSchema {
      const data = snapshot.data(options) as CopperxCustomerDataSchema;

      return {
        name: data.name,
        email: data.email,
        phone: data.phone,
        organizationName: data.organizationName,
        customerNumber: data.customerNumber,
        customerReferenceId: data.customerReferenceId,
        createdAt: data.createdAt,
        address: data.address,
        shipping: data.shipping,
        id: snapshot.id,
      };
    },
  };

const productDataConverter: FirestoreDataConverter<CopperxProductDataSchema> = {
  toFirestore(): DocumentData {
    return {};
  },
  fromFirestore(snapshot, options): CopperxProductDataSchema {
    const data = snapshot.data(options) as CopperxProductDataSchema;

    return {
      name: data.name,
      description: data.description,
      isActive: data.isActive,
      defaultPrice: data.defaultPrice,
      defaultPriceId: data.defaultPriceId,
      createdAt: data.createdAt,
      unitLabel: data.unitLabel,
      url: data.url,
      metadata: data.metadata,
      updatedAt: data.updatedAt,
      images: data.images,
      id: snapshot.id,
    };
  },
};

const invoiceDataConverter: FirestoreDataConverter<CopperxInvoiceResponseDataSchema> =
  {
    toFirestore(): DocumentData {
      return {};
    },
    fromFirestore(snapshot, options): CopperxInvoiceResponseDataSchema {
      const data = snapshot.data(options) as CopperxInvoiceResponseDataSchema;

      return {
        allowPromotionCodes: data.allowPromotionCodes,
        attemptCount: data.attemptCount,
        attempted: data.attempted,
        autoAdvance: data.autoAdvance,
        billingReason: data.billingReason,
        clientReferenceId: data.clientReferenceId,
        collectionMethod: data.collectionMethod,
        createdAt: data.createdAt,
        currency: data.currency,
        customer: data.customer,
        customerId: data.customerId,
        description: data.description,
        dueDate: data.dueDate,
        finalizeScheduleAt: data.finalizeScheduleAt,
        finalizedAt: data.finalizedAt,
        footer: data.footer,
        fromInvoiceId: data.fromInvoiceId,
        invoiceNumber: data.invoiceNumber,
        invoicePaidUrl: data.invoicePaidUrl,
        latestRevisionId: data.latestRevisionId,
        lineItems: data.lineItems,
        markedUncollectibleAt: data.markedUncollectibleAt,
        metadata: data.metadata,
        nextPaymentAttempt: data.nextPaymentAttempt,
        organizationId: data.organizationId,
        paid: data.paid,
        paidAt: data.paidAt,
        paidOutOfBand: data.paidOutOfBand,
        paymentIntentId: data.paymentIntentId,
        paymentSetting: data.paymentSetting,
        paymentSettingId: data.paymentSettingId,
        periodEnd: data.periodEnd,
        periodStart: data.periodStart,
        status: data.status,
        subscriptionId: data.subscriptionId,
        total: data.total,
        updatedAt: data.updatedAt,
        url: data.url,
        visibility: data.visibility,
        id: snapshot.id,
      };
    },
  };
