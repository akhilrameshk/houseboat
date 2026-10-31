export const digits = (n: string = ""): string => String(n).replace(/\D/g, "");

export function waLink(number: string, text: string = ""): string {
  const d = digits(number);
  const base = d ? `https://wa.me/${d}` : "https://wa.me/";
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

export const telLink = (n: string = ""): string => (digits(n) ? `tel:+${digits(n)}` : "#");
