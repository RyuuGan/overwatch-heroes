export interface IList<T> {
  count: number;
  items: T[];
  page?: number;
  pages?: number;
  limit?: number;
}
