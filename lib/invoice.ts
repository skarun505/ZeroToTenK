export interface InvoiceData {
  invoiceNo: string;
  orderId: string;
  orderDate: string;
  buyerName: string;
  buyerPhone: string;
  buyerAddress: string;
  buyerCity: string;
  buyerState: string;
  buyerPincode: string;
  productTitle: string;
  serialOrImei: string;
  grade: string;
  hsnCode: string;
  amountPaise: number;
  discountPaise: number;
  paymentMode: string;
  utrOrPaymentId?: string;
  warrantyMonths: number;
}

export const SELLER_DETAILS = {
  legalName: "ZeroToTenK Digital Publishing",
  tradeName: "ZeroToTenK",
  gstin: "33AAECJ9204M1Z2",
  pan: "AAECJ9204M",
  address: "Digital Innovation Hub, Indiranagar, Bengaluru, Karnataka - 560038",
  email: "support@zerototenk.in",
  phone: "+91 63806 40087",
  stateCode: "29", // Karnataka
};

export function generateInvoiceNumber(orderId: string): string {
  const year = new Date().getFullYear();
  const shortId = orderId.slice(-6).toUpperCase();
  return `Z10K-${year}-${shortId}`;
}

export function formatINR(paise: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(paise / 100);
}
