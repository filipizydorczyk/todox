import assert from "assert";
import { SuperContext, Context } from "sealious";
import TodoxServer from "../src/app";
import { CoreCategories } from "../src/types/core-categories";

let app: TodoxServer;
let context: Context;

describe("Tasks tests", async () => {
    before(async () => {
        app = new TodoxServer();
        context = new SuperContext(app);

        await app.start();
    });

    after(async () => {
        await app.stop();
    });

    it("Should add task with only core category", async () => {
        const task = await app.collections.tasks.create(context, {
            text: "Test fields",
            core_category: CoreCategories.Work,
        });

        task.decode(context);

        assert.strictEqual(task.get("core_category"), CoreCategories.Work);
    });
});
