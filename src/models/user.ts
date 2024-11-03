import { JsonSerializeMethod } from "./methods/jsonSerialize";

type UserType = {
  id: string;
  name: string;
  color?: string;
} & JsonSerializeMethod<UserType>;

export default class UserModel implements UserType {
  id: string;
  name: string;
  color?: string;

  constructor(id: string, name: string, color?: string) {
    this.id = id;
    this.name = name;
    this.color = color;
  }

  static fromJson(json: string): UserModel {
    const objJson = JSON.stringify(json);
    const obj = JSON.parse(objJson);
    return new UserModel(obj.id, obj.title, obj.color);
  }

  static listEmpty(): UserModel[] {
    return [];
  }
}
