// Converts Mongo documents (ObjectId, Date) to plain JSON-safe objects of type T.
export function plain<T>(x: unknown): T {
  return JSON.parse(JSON.stringify(x)) as T;
}
