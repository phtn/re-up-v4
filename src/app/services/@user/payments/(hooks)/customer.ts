import type { CustomerControllerCreateResponse200 } from ".api/apis/copperx";
import type {
  FindAllCustomerResponseSchema,
  CreateCustomerSchema,
  CopperxCustomerDataSchema,
} from "@src/server/resource/copperx/customer";
import {
  createCustomer,
  deleteCustomer,
  findAllCustomers,
} from "@src/trpc/copperx/customer";
import { onError, onSuccess } from "@src/utils/toast";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import type { AddCustomerHookParams } from "./types";
import { addCustomerInternal } from "@src/trpc/internal/payments/customer";

const customerRoute = `/services/payments/customers`;

export const useCustomerController = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleAddCustomerRoute = () => {
    setLoading(true);
    router.push(`${customerRoute}/add-customer`);
  };

  const handleAddCustomer = async (params: AddCustomerHookParams) => {
    setLoading(true);
    const { data, customerId, userId } = params;

    const customerResource: CreateCustomerSchema = {
      name: data.name,
      phone: data.phone,
      organizationName: data.organization,
      address: {
        line1: data.line1,
        line2: "",
        city: data.city,
        state: data.state,
        postalCode: data.postalCode,
        country: data.country,
      },
      customerReferenceId: customerId,
      shipping: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        organizationName: data.organization,
        address: {
          line1: data.line1,
          line2: "",
          city: data.city,
          state: data.state,
          postalCode: data.postalCode,
          country: data.country,
        },
      },
      email: data.email,
      taxIds,
    };
    await createCustomer(customerResource).then((res) => {
      const response: Record<string, unknown> = JSON.parse(
        res,
      ) as CustomerControllerCreateResponse200;

      const result: CopperxCustomerDataSchema =
        response.data as CopperxCustomerDataSchema;
      console.log(result.name);

      /**
       * [FIREBASE INTERNAL]
       */

      addCustomerInternal({
        userId,
        id: result.id,
        customerReferenceId: result.customerReferenceId,
        responseData: result,
      })
        .then()
        .catch((e: Error) => console.log(e));

      setLoading(false);
      onSuccess("Customer created", `Customer ID: ${result.id}`);
    });
  };

  const handleDeleteCustomer = async (id: string) => {
    setLoading(true);
    await deleteCustomer({ id })
      .then((res) => {
        onSuccess("Customer Account Deleted", `ID: ${id}`);
        setLoading(false);
        console.log(res);
      })
      .catch((e: Error) => {
        console.log(e.message);
        onError("Error", e.message);
        setLoading(false);
      });
  };

  return {
    handleAddCustomerRoute,
    handleAddCustomer,
    handleDeleteCustomer,
    loading,
  };
};

const taxIds = {
  object: "",
  data: [
    {
      name: "",
      value: "",
      country: "",
    },
  ],
};

export const customer: CreateCustomerSchema = {
  name: "Kathryn Bernardo",
  phone: "9155555555",
  organizationName: "Put It Anywhere",
  address: {
    line1: "108 F St",
    line2: "Staug",
    city: "Staug",
    state: "FL",
    postalCode: "32080",
    country: "USA",
  },
  customerReferenceId: uuid(),
  shipping: {
    name: "Kathryn Bernardo",
    email: "faith@ordway.com",
    phone: "8189999999",
    organizationName: "Anywhere You Like",
    address: {
      line1: "21 Lucky Win St",
      line2: "Hanson Manson",
      city: "Beverly Hills",
      state: "CA",
      postalCode: "90210",
      country: "USA",
    },
  },
  // visibility: undefined,
  email: "fuck@butt.com",
  taxIds: {
    object: "IRS",
    data: [
      {
        name: "IRS",
        value: "000",
        country: "US",
      },
    ],
  },
};

export const useFetchCustomer = () => {
  const [cxFetchLoading, setLoading] = useState(false);
  const [customerList, setCustomerList] = useState<
    FindAllCustomerResponseSchema | undefined
  >();

  const handleFindAllCustomers = () => {
    setLoading(true);
    findAllCustomers()
      .then((res) => {
        const response: Record<string, unknown> = JSON.parse(
          res,
        ) as CustomerControllerCreateResponse200;
        setCustomerList(response.data as FindAllCustomerResponseSchema);
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
        console.log(e);
      });
  };

  useEffect(() => {
    handleFindAllCustomers();
  }, []);

  return { handleFindAllCustomers, cxFetchLoading, customerList };
};
