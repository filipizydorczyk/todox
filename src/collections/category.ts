import { Collection, FieldTypes, Policies } from "sealious";
import { CoreCategories } from "../types/core-categories";

export default class Category extends Collection {
    fields = {
        name: FieldTypes.Required(new FieldTypes.Text()),
        core_category: FieldTypes.Required(
            new FieldTypes.Enum([CoreCategories.FreeTime, CoreCategories.Work])
        ),
    };
    defaultPolicy = new Policies.Owner();
}
