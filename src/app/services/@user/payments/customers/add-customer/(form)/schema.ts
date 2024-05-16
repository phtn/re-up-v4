import { type CreateCustomerSchema } from "@src/server/resource/copperx/customer";
import { v4 as uuid } from "uuid";
import {
  type LucideIcon,
  BuildingIcon,
  FlagIcon,
  MapPinIcon,
  MapPinnedIcon,
  MilestoneIcon,
  RectangleEllipsisIcon,
  SmartphoneIcon,
  UserRoundIcon,
  MailIcon,
} from "lucide-react";
import { z } from "zod";
import { type InputType } from "@src/utils/helpers";

export type FieldName =
  | "name"
  | "email"
  | "phone"
  | "organization"
  | "line1"
  | "line2"
  | "city"
  | "state"
  | "postalCode"
  | "country";

export type CustomerField = {
  name:
    | "name"
    | "email"
    | "phone"
    | "organization"
    | "line1"
    | "line2"
    | "city"
    | "state"
    | "postalCode"
    | "country";
  alt: string;
  icon: LucideIcon;
  label: string;
  placeholder: string;
  type: React.HTMLInputTypeAttribute;
  inputType: InputType;
  disabled: boolean;
};

export const customerFields: CustomerField[] = [
  {
    name: "name",
    alt: "name",
    placeholder: "",
    label: "Customer name",
    type: "text",
    icon: UserRoundIcon,
    inputType: "text",
    disabled: false,
  },
  {
    name: "organization",
    alt: "organization",
    placeholder: "",
    label: "Organization name",
    type: "text",
    icon: BuildingIcon,
    inputType: "text",
    disabled: false,
  },
  {
    name: "email",
    alt: "email",
    placeholder: "",
    label: "email",
    type: "email",
    icon: MailIcon,
    inputType: "text",
    disabled: false,
  },
  {
    name: "phone",
    alt: "phone",
    placeholder: "",
    label: "Phone Number",
    type: "phone",
    icon: SmartphoneIcon,
    inputType: "text",
    disabled: false,
  },
  {
    name: "line1",
    alt: "line1",
    placeholder: "",
    label: "Unit No. / Street Name",
    type: "address",
    icon: MilestoneIcon,
    inputType: "text",
    disabled: false,
  },

  {
    name: "city",
    alt: "city",
    placeholder: "",
    label: "City",
    type: "address",
    icon: MapPinnedIcon,
    inputType: "text",
    disabled: false,
  },
  {
    name: "state",
    alt: "state",
    placeholder: "",
    label: "Region",
    type: "address",
    icon: MapPinIcon,
    inputType: "text",
    disabled: false,
  },
  {
    name: "postalCode",
    alt: "postalCode",
    placeholder: "",
    label: "Postal / Zip code",
    type: "address",
    icon: RectangleEllipsisIcon,
    inputType: "text",
    disabled: false,
  },
  {
    name: "country",
    alt: "country",
    placeholder: "",
    label: "Country",
    type: "address",
    icon: FlagIcon,
    inputType: "text",
    disabled: false,
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
  country: "PH",
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
