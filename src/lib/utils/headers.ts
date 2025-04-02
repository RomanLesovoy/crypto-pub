'use server';

import { cookies, headers } from "next/headers";
import { fallbackLng } from "@/lib/i18n/settings";

export const getHeaders = async () => {
  const headersList = await headers();
  const protocol = headersList.get("x-forwarded-proto") || "http";
  const host = headersList.get("host");
  const path = (await cookies()).get('APP_CURRENT_PATH')!.value;

  const fullUrl = `${protocol}://${host}${path}`;
  const locale = fullUrl.split(host || "")[1].split("/")[1] || fallbackLng;

  return { locale, fullUrl, path };
}
