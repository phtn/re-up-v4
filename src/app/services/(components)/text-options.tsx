import { InputFieldAmount, InputFieldPayments } from "@src/app/(ui)/input";
import type { FieldValues } from "react-hook-form";
import type { FieldOptionProps } from "./field-options";
import tw from "tailwind-styled-components";

export const TextInputOptions = <T extends FieldValues>({
  item,
  index,
  length,
  field,
}: FieldOptionProps<T>) => {
  return (
    <>
      {index === 0 ? (
        <TopText {...field} {...item} />
      ) : index === length - 1 ? (
        <BotText {...field} {...item} />
      ) : (
        <MidText {...field} {...item} />
      )}
    </>
  );
};

export const InputAmount = <T extends FieldValues>({
  item,
  field,
}: FieldOptionProps<T>) => {
  return <TopAmount {...field} {...item} />;
};

export const TopAmount = tw(InputFieldAmount)`
  bg-gray-50 h-[64px]
  font-mono text-[10px] font-light placeholder-dyan
  justify-end

  border-[0.33px] border-dyan/50
  rounded-lg
  `;

const TopText = tw(InputFieldPayments)`
  bg-gray-50
  font-mono text-[10px] font-light placeholder-dyan

  border-[0.33px] border-dyan/50
  border-b-dyan/30
  rounded-lg rounded-b-none
  `;

const BotText = tw(InputFieldPayments)`
  bg-gray-50
  font-mono text-[10px] font-light

  border-[0.33px] border-dyan/50
  border-t-0
  rounded-lg rounded-t-none
  `;

const MidText = tw(InputFieldPayments)`
  bg-gray-50
  font-jet text-[10px] font-light placeholder-dyan

  border-[0.33px] border-dyan/50
  border-t-0 border-b-dyan/30
  rounded-none
  `;
