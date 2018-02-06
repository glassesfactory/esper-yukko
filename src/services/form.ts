export class LocalFormStore {
  public model: string;
  public value?: any;
  public defaultValue: any;

  public set(value: any) {
    this.value = value;
  }

  constructor(model: string, defaultValue: any = null) {
    this.value = this.defaultValue = defaultValue;
  }
}
