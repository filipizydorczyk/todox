import assert from "assert";
import { SuperContext, Context, Errors } from "sealious";
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

    it("Should add task with category and fill core_category", async () => {
        const category = await app.collections.categories.create(context, {
            name: "Test category",
            core_category: CoreCategories.FreeTime,
        });

        const task = await app.collections.tasks.create(context, {
            text: "Test fields",
            category: category.id,
        });

        task.decode(context);

        assert.strictEqual(task.get("category"), category.id);
        assert.strictEqual(task.get("core_category"), CoreCategories.FreeTime);
    });

    it("Should fail due to lack of category and core_category at the same time", async () => {
        try {
            const task = await app.collections.tasks.create(context, {
                text: "Test fields",
            });
        } catch (e) {
            assert.strictEqual(e instanceof Errors.ValidationError, true);
        }
    });
});
