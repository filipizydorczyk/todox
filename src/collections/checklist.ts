import { App, Collection, Errors, FieldTypes, Policies } from "sealious";
import TodoxServer from "../app";

export default class Checklist extends Collection {
    fields = {
        text: FieldTypes.Required(new FieldTypes.Text()),
    };
    defaultPolicy = new Policies.Owner();

    async init(app: App, name: string) {
        await super.init(app, name);
        this.on("before:create", async ([context, item]) => {
            const users_checklists = await (
                app as TodoxServer
            ).collections.checklists
                .list(context)
                .fetch();
            if (users_checklists.items.length > 0) {
                throw new Errors.ValueExists(
                    "You can only create one checklist per user. Edit existing one."
                );
            }
        });
    }
}
