import { JsonSerializeMethod } from "./methods/jsonSerialize";

type UserType = {
  id: string | null;
  name: string;
  room_id?: string | null;

  color?: string;
} & JsonSerializeMethod<UserType>;

export default class UserModel implements UserType {
  id: string | null;
  name: string;
  color?: string;
  room_id?: string | null;

  constructor(id: string, name: string, color?: string, room_id?: string) {
    this.id = id;
    this.name = name;
    this.color = color;
    this.room_id = room_id;
  }

  static fromJson(json: string): UserModel {
    const objJson = JSON.stringify(json);
    const obj = JSON.parse(objJson);
    return new UserModel(obj.id, obj.name, obj.color, obj.room_id);
  }
  static listEmpty(): UserModel[] {
    return [];
  }
}
