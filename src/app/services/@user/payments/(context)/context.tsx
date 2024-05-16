"use client";

import { type Children } from "@src/app/(main)/types";
import { auth, db } from "@src/lib/db";
import { type CopperxCustomerDataSchema } from "@src/server/resource/copperx/customer";
import { type CopperxProductDataSchema } from "@src/server/resource/copperx/product";
import {
  collection,
  doc,
  type DocumentData,
  type FirestoreDataConverter,
} from "firebase/firestore";
import { createContext } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

interface PaymentsContextValue {
  customers: {
    customerList: CopperxCustomerDataSchema[] | undefined;
    fetchingCustomers: boolean;
  };
  products: {
    productList: CopperxProductDataSchema[] | undefined;
    fetchingProducts: boolean;
  };
  invoices: undefined;
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

  return (
    <PaymentsContext.Provider
      value={{
        customers: { customerList, fetchingCustomers },
        products: { productList, fetchingProducts },
        invoices: undefined,
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
