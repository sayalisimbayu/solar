export class AppSetting {
  constructor(
    public id: number,
    public mode: string,
    public value: string,
    public alias: string,
    public type: string
  ) {}
}
export class AppTheme{
  constructor(
    public usid: number,
    public theme: string,
    public skin: string
  ) {}
}
