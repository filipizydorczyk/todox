import assert from "assert";
import { SuperContext } from "sealious";
import TodoxServer from "../src/app";
import { CoreCategories } from "../src/types/core-categories";

describe("Tasks tests", async () => {
    it("Should add task with only core category", async () => {
        const app = new TodoxServer();
        await app.start();
        const context = new SuperContext(app);

        const task = await app.collections.tasks.create(context, {
            text: "Test fields",
            core_category: CoreCategories.Work,
        });

        task.decode(context);

        assert.strictEqual(task.get("core_category"), CoreCategories.Work);
        await app.stop();
    });
});
