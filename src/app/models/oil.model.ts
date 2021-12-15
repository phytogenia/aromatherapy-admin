import {Organoleptics} from "./organoleptic.model";
import {Domain} from "./domain.model";

export class Oil {
  constructor(
    public id: string | null,
    public name: string,
    public sciName: string | null,
    public otherNames: string[] | null,
    public distilledOrgan: string | null,
    public extractionProcess: string | null,
    public allergies: string[] | null,
    public organoleptics: Organoleptics,
    public domains: Domain[],
    public createdAt: Date | null,
    public updatedAt: Date | null
  ) {
  }
}
