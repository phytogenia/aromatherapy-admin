export enum DomainType {
  wellBeing = 'wellBeing',
  health = 'health',
  beauty = 'beauty'
}

export class Domain {
  constructor(
    public id: string | null,
    public type: DomainType,
    public properties: string | null,
    public precautionOfUse: string | null,
    public areaOfUse: string | null,
    public practicalUse: string | null,
    public synergy: string | null,
    public oilId: string | null
  ) {
  }


}
