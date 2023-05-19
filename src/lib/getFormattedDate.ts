export default function getFomattedDate(dateStr: string): string {
  return new Intl.DateTimeFormat("zh-CN", { dateStyle: "long" }).format(
    new Date(dateStr)
  );
}
