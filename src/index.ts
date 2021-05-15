import { resolve } from "path";
import Sealious, { App, Collection, FieldTypes, Policies } from "sealious";

const app = new (class extends App {
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
        name: "My ToDo list",
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
        tasks: new (class extends Collection {
            fields = {
                title: new FieldTypes.Text(),
                done: new FieldTypes.Boolean(),
            };
            defaultPolicy = new Policies.Public();
        })(),
    };
})();

app.start();
