
export class FieldModel {

  public Id!: string;
  public Parent!: string;
  public OriginalName!: string
  public Name!: string;

  public Selected: boolean = false;
  public FieldType!: string
  public Size: string = '0'
  public GroupType: "" | "Group" | "Sum" | "Count" = "";

  constructor(name: string, type: string, size: string, parent: string) {
    this.Name = name;
    this.OriginalName = name;
    this.Parent = parent;
    this.FieldType = type;
    this.Size = size;

    this.Id = this.Parent + "_" + this.OriginalName ;
  }

}


