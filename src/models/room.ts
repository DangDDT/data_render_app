import { JsonSerializeMethod } from "./methods/jsonSerialize";

type RoomType = {
  id: string;
  name: string;
} & JsonSerializeMethod<RoomType>;

export default class RoomModel implements RoomType {
  id: string;
  name: string;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }

  static fromJson(json: string): RoomModel {
    const objJson = JSON.stringify(json);
    const obj = JSON.parse(objJson);
    return new RoomModel(obj.id, obj.title);
  }
  static listEmpty(): RoomModel[] {
    return [];
  }
}
