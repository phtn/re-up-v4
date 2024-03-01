import { hashString } from "./helpers";

export const handleHash = async () => {
  console.log(
    await hashString(
      "NZTJ9WsIHqNaQZ8GJWkjCyOhhB92",
      new Date().getTime().toString(36),
    ).then((res) => res),
  );
};
