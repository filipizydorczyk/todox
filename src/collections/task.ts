import {
    App,
    Collection,
    CollectionItem,
    Errors,
    FieldTypes,
    Policies,
    Context,
} from "sealious";
import TodoxServer from "../app";
import Donelean from "../fields/donelean";
import { CoreCategories } from "../types/core-categories";

const validate_item = async (
    app: TodoxServer,
    context: Context,
    item: CollectionItem
) => {
    await item.decode(context);

    const category = item.body.raw_input.category as string;
    const core_category = item.body.raw_input.core_category as string;

    if (category) {
        const ct = await app.collections.categories.getByID(context, category);

        item.set("core_category", ct.get("core_category"));
    } else if (!core_category && !category) {
        throw new Errors.ValidationError(
            "Either core_category or category has to have value."
        );
    }
};

export default class Task extends Collection {
    fields = {
        text: FieldTypes.Required(new FieldTypes.Text()),
        done: new Donelean(),
        category: new FieldTypes.SingleReference("category"),
        core_category: new FieldTypes.Enum([
            CoreCategories.FreeTime,
            CoreCategories.Work,
        ]),
    };
    defaultPolicy = new Policies.Owner();

    async init(app: TodoxServer, name: string) {
        await super.init(app, name);
        this.on("before:create", async ([context, item]) => {
            await validate_item(app, context, item);
        });

        this.on("before:edit", async ([context, item]) => {
            await validate_item(app, context, item);
        });
    }
}
