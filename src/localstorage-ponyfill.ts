// MIT © 2017 azu
export type LocalStoragePonyfillMode = "browser" | "node" | "memory"

export interface LocalStoragePonyfillOptions {
    // "auto" by default
    mode?: "auto" | LocalStoragePonyfillMode;
    // save file path. that is used in "node" mode
    storeFilePath?: string;
}

export interface LocalStoragePonyfill {
    readonly length: number;

    clear(): void;

    getItem(key: string): string | null;

    key(index: number): string | null;

    removeItem(key: string): void;

    setItem(key: string, data: string): void;

    [key: string]: any;

    [index: number]: string;
}

const autoSelectMode = (): LocalStoragePonyfillMode => {
    if (typeof window === "object" && window.localStorage) {
        return "browser";
    } else {
        return "node";
    }
};

export function createLocalStorage(options: LocalStoragePonyfillOptions = {}): LocalStoragePonyfill {
    const mode = options.mode || "auto";
    const actualMode: LocalStoragePonyfillMode = mode === "auto" ? autoSelectMode() : mode;
    if (actualMode === "browser") {
        return window.localStorage;
    } else if (actualMode === "node") {
        const appRoot = require('app-root-path');
        const path = require("path");
        const LocalStorage = require('node-localstorage').LocalStorage;
        const defaultCacheDir = path.join(appRoot.toString(), ".cache");
        if (!options.storeFilePath) {
            const mkdirp = require('mkdirp');
            mkdirp.sync(defaultCacheDir)
        }
        const saveFilePath = options.storeFilePath ? options.storeFilePath : path.join(defaultCacheDir, "localstorage-ponyfill");
        return new LocalStorage(saveFilePath);
    } else if (actualMode === "memory") {
        return require("localstorage-memory");
    }
    throw new Error("Unknown mode:" + actualMode);
}