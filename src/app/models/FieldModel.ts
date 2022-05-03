
export class FieldModel {

  public id!: string;
  public parent!: string;
  public originalname!: string
  public name!: string;

  public selected: boolean = false;
  public type!: string
  public size: string = '0'
  public groupType: "" | "Group" | "Sum" | "Count" = "";

  constructor(name: string, type: string, size: string, parent: string) {
    this.name = name;
    this.originalname = name;
    this.parent = parent;
    this.type = type;
    this.size = size;

    this.id = this.parent + "_" + this.originalname ;
  }

}


