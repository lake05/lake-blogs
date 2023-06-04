export default function getFormattedDate(dateStr: string): string {
  return new Intl.DateTimeFormat("zh-CN", { dateStyle: "long" }).format(
    new Date(dateStr)
  );
}
