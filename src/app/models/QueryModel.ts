import { FieldModel } from "./FieldModel";
import { FilterModel } from "./FilterModel";
import { HavingModel } from "./HavingModel";
import { JoinModel } from "./JoinModel";
import { TableModel } from "./TableModel";

export class QueryModel {
  SessionId: string = "";
  Tables: any = {};
  Fields: FieldModel[] = [];
  Joins: JoinModel[] = [];
  SelectedFields: FieldModel[] = [];
  Filters: FilterModel[] = [];
  Havings: HavingModel[] = [];
  Page: number = 1;
  PageSize: number = 10;
}
