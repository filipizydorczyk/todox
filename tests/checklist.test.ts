import assert from "assert";
import { SuperContext, Context, CollectionItem, Errors } from "sealious";
import TodoxServer from "../src/app";

let app: TodoxServer;
let context: Context;
let user: CollectionItem;

describe("Checklist tests", async () => {
    before(async () => {
        app = new TodoxServer();
        await app.start();

        user = await app.collections.users.create(new SuperContext(app), {
            username: `test-${Date.now()}`,
            password: "test1234567",
            email: "test@test.test",
        });
        context = new Context(app, Date.now(), user.id);
    });

    after(async () => {
        await app.stop();
    });

    it("Should create checklist while it is user's first", async () => {
        const checklist = await app.collections.checklists.create(context, {
            text: "1. Test my app",
        });
        checklist.decode(context);
        assert.strictEqual(checklist.get("text"), "1. Test my app");
    });

    it("Shouldn't create checklist while user has already created one", async () => {
        try {
            const checklist = await app.collections.checklists.create(context, {
                text: "1. Test my other app",
            });
            checklist.decode(context);
        } catch (e) {
            assert.strictEqual(e instanceof Errors.ValueExists, true);
        }
    });
});
