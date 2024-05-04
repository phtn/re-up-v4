import { type Field } from "@src/app/(ui)/input";
import { type CreateCustomerSchema } from "@src/server/resource/copperx/customer";
import { v4 as uuid } from "uuid";
import {
  AtSignIcon,
  BuildingIcon,
  MapPinnedIcon,
  SmartphoneIcon,
  UserRoundIcon,
} from "lucide-react";
import { z } from "zod";

export const customerFields: Field[] = [
  {
    name: "name",
    alt: "name",
    placeholder: "Customer name",
    label: "Customer name",
    type: "text",
    icon: UserRoundIcon,
  },
  {
    name: "email",
    alt: "email",
    placeholder: "Customer email",
    label: "Customer email",
    type: "email",
    icon: AtSignIcon,
  },
  {
    name: "phone",
    alt: "phone",
    placeholder: "Phone number",
    label: "Customer phonenumber",
    type: "phone",
    icon: SmartphoneIcon,
  },
  {
    name: "organization",
    alt: "organization",
    placeholder: "Organization name",
    label: "Organization name",
    type: "text",
    icon: BuildingIcon,
  },
  {
    name: "line1",
    alt: "line1",
    placeholder: "Unit No. / Street Name",
    label: "Line 1",
    type: "address",
    icon: MapPinnedIcon,
  },

  {
    name: "city",
    alt: "city",
    placeholder: "City",
    label: "City",
    type: "address",
    icon: MapPinnedIcon,
  },
  {
    name: "state",
    alt: "state",
    placeholder: "Region",
    label: "Region",
    type: "address",
    icon: MapPinnedIcon,
  },
  {
    name: "postalCode",
    alt: "postalCode",
    placeholder: "Postal / Zip code",
    label: "Postal/Zip code",
    type: "address",
    icon: MapPinnedIcon,
  },
  {
    name: "country",
    alt: "country",
    placeholder: "Philippines",
    label: "Country",
    type: "address",
    icon: MapPinnedIcon,
  },
];

export const AddCustomerFormProps = z.object({
  email: z.string().email(),
  name: z.string(),
  phone: z.string(),
  organization: z.string(),
  line1: z.string(),
  line2: z.string(),
  city: z.string(),
  state: z.string(),
  postalCode: z.string(),
  country: z.string(),
});
export type AddCustomerFormSchema = z.infer<typeof AddCustomerFormProps>;

export const customerFormDefaults: AddCustomerFormSchema = {
  name: "",
  email: "",
  phone: "",
  organization: "",
  line1: "",
  line2: "",
  city: "",
  state: "",
  postalCode: "",
  country: "Philippines",
};

export const customerResource: CreateCustomerSchema = {
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
