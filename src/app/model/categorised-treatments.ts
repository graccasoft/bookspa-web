import {TreatmentCategory} from "./treatment-category";
import {Treatment} from "./treatment";

export class CategorisedTreatments{
  category: TreatmentCategory
  treatments: Treatment[]

  constructor(category: TreatmentCategory, treatments: Treatment[]) {
    this.category = category
    this.treatments = treatments
  }
}
