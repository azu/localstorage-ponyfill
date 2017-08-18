// MIT © 2017 azu
import { createLocalStorage } from "../src/localstorage-ponyfill";
import * as assert from "assert";

describe("localstorage-ponyfill", () => {
    it("should use file by default", () => {
        const localStorage = createLocalStorage();
        localStorage.setItem("key", "value");
        const value = localStorage.getItem("key");
        assert.strictEqual(value, "value");
        localStorage.clear();
    });
    it("should use memory", () => {
        const localStorage = createLocalStorage({ mode: "memory" });
        localStorage.setItem("key", "value");
        const value = localStorage.getItem("key");
        assert.strictEqual(value, "value");
    })
});