import { CreatePaymentPayload, OrderResponse } from "@/types/payments";
import { API_BASE_URL, DEVICE_ID } from "@env";
import { create } from "axios";

const BASE_URL = API_BASE_URL;
const DEVICE_ID_HEADER = DEVICE_ID?.trim();
const DEFAULT_HEADERS: Record<string, string> = {};

if (DEVICE_ID_HEADER) {
  DEFAULT_HEADERS["X-Device-Id"] = DEVICE_ID_HEADER;
}

const paymentsApi = create({
  baseURL: BASE_URL,
  headers: DEFAULT_HEADERS,
});

export async function createPayment(payload: CreatePaymentPayload) {
  const formData = new FormData();
  formData.append(
    "expected_output_amount",
    String(payload.expected_output_amount),
  );
  formData.append("fiat", payload.fiat);
  formData.append("notes", payload.notes);

  return paymentsApi.post<OrderResponse>("/orders/", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    transformRequest: (data) => data,
  });
}

export async function getPaymentInfo(identifier: string) {
  return paymentsApi.get<OrderResponse>(`/orders/info/${identifier}`);
}
