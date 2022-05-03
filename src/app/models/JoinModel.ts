import { FieldModel } from "./FieldModel";

export class JoinModel {

  public f1!: FieldModel;
  public f2!: FieldModel;
  public joinType: number = 0;

  constructor(f1: FieldModel, f2: FieldModel) {
    this.f1 = f1;
    this.f2 = f2;
  }

}
