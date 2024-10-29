export interface JsonSerializeMethod<T> {
  fromJson?(json: string): T;
  toJson?(model: T): string;
}
