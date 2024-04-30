import { useCallback, type ReactElement } from "react";

type Anything = ReactElement | string | number | null | undefined;

interface BitFlipProps {
  state: string | boolean | undefined;
  zero: Anything;
  one: Anything;
  default?: Anything;
}

/**
 * https://re-up.ph
 */
export const BitFlip = (props: BitFlipProps) => {
  // const bitCheck = useCallback(() => {
  //   if (!props.state) return props.zero;
  //   return props.state ? props.one : props.zero;
  // }, [props.state, props.zero, props.one]);

  const Z = useCallback(() => props.zero, [props.zero]);
  const O = useCallback(() => props.one, [props.one]);

  return !props.state ? Z() : O();
};

type Primitive = string | number | boolean | null | undefined;

interface BitFlipPrimeProps {
  state: boolean;
  zero: Primitive;
  one: Primitive;
}

export const BitFlipPrime = (props: BitFlipPrimeProps): Primitive => {
  const Z = useCallback(() => props.zero, [props.zero]);
  const O = useCallback(() => props.one, [props.one]);

  return props.state ? O() : Z();
};

interface BitFlipStrProps {
  state: boolean;
  zero: string;
  one: string;
}

export const BitFlipStr = (props: BitFlipStrProps): string => {
  const Z = useCallback(() => props.zero, [props.zero]);
  const O = useCallback(() => props.one, [props.one]);

  return props.state ? O() : Z();
};
