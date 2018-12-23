// MIT © 2017 azu
import * as assert from "assert";
import * as path from "path";
import { createLocalStorage } from "../src";
import * as trash from "trash";
describe("localstorage-ponyfill", () => {
    it("should use file by default", () => {
        const localStorage = createLocalStorage();
        localStorage.setItem("key", "value");
        const value = localStorage.getItem("key");
        assert.strictEqual(value, "value");
        localStorage.clear();
    });
    it("should store data file to specific directory", () => {
        const storeFilePath = path.join(__dirname, "test.data");
        const localStorage = createLocalStorage({
            storeFilePath: storeFilePath
        });
        localStorage.setItem("key", "value");
        const value = localStorage.getItem("key");
        assert.strictEqual(value, "value");
        localStorage.clear();
        return trash(storeFilePath);
    });
    it("should use memory", () => {
        const localStorage = createLocalStorage({ mode: "memory" });
        localStorage.setItem("key", "value");
        const value = localStorage.getItem("key");
        assert.strictEqual(value, "value");
    });
});
