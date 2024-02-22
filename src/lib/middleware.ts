import { get } from "@vercel/edge-config";
import { NextResponse } from "next/server";

export const config = { matcher: "/webhooks" };

export const middleware = async () => {
  const sa = await get("sa");

  return NextResponse.json(sa);
};
