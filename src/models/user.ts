import { JsonSerializeMethod } from "./methods/jsonSerialize";

type UserType = {
  id: string;
  name: string;
  cellPosition?: {
    x: number;
    y: number;
  };
  color?: string;
} & JsonSerializeMethod<UserType>;

export default class UserModel implements UserType {
  id: string;
  name: string;
  cellPosition?: {
    x: number;
    y: number;
  };
  color?: string;

  constructor(
    id: string,
    name: string,
    cellPosition?: { x: number; y: number },
    color?: string,
  ) {
    this.id = id;
    this.name = name;
    this.cellPosition = cellPosition;
    this.color = color;
  }

  static fromJson(json: string): UserModel {
    const objJson = JSON.stringify(json);
    const obj = JSON.parse(objJson);
    return new UserModel(obj.id, obj.title, obj.cellPosition, obj.color);
  }
  static listEmpty(): UserModel[] {
    return [];
  }
}
