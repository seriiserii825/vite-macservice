export default function toObject(html_element: HTMLElement): { nota: string; priorità: number } {
  const text = html_element.innerHTML;
  const active = html_element.classList.contains("active") ? 1 : 0;
  return {
    nota: text,
    priorità: active,
  };
}
