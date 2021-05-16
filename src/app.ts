import { resolve } from "path";
import { App, Policies } from "sealious";
import Checklist from "./collections/checklist";
import Category from "./collections/category";
import Task from "./collections/task";

export default class TodoxServer extends App {
    config = {
        datastore_mongo: {
            host: "localhost",
            port: 20724,
            db_name: "sealious-playground",
        },
        upload_path: "./uploaded_files",
        email: {
            from_address: "sealious-playground@example.com",
            from_name: "Sealious playground app",
        },
        "www-server": {
            port: 8080, //listen on this port
        },
    };
    manifest = {
        name: "To Do Server",
        logo: resolve(__dirname, "../assets/logo.png"),
        version: "0.0.1",
        default_language: "en",
        base_url: "localhost:8080",
        admin_email: "admin@example.com",
        colors: {
            primary: "#5294a1",
        },
    };
    collections = {
        ...App.BaseCollections,
        users: App.BaseCollections.users.setPolicy(
            "create",
            new Policies.Noone()
        ),
        checklists: new Checklist(),
        categories: new Category(),
        tasks: new Task(),
    };
}
