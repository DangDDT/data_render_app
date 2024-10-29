import { JsonSerializeMethod } from "./methods/jsonSerialize";

type SampleModelType = {
  id: number;
  title: string;
} & JsonSerializeMethod<SampleModelType>;

export default class SampleModel implements SampleModelType {
  id: number;
  title: string;

  constructor(id: number, title: string) {
    this.id = id;
    this.title = title;
  }

  static fromJson(json: string): SampleModel {
    const objJson = JSON.stringify(json);
    const obj = JSON.parse(objJson);
    return new SampleModel(obj.id, obj.title);
  }
  static listEmpty(): SampleModel[] {
    return [];
  }
}
