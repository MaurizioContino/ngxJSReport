import { FieldModel } from "./FieldModel";

export class FilterModel {
  public Field!: FieldModel;
  public Operator: string | null = null;
  public Value: string = "";
  public VariableValue: string = "";

}
