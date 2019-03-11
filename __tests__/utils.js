/* eslint-disable */
import { head, last, xpathFilter } from "../utils.js";
import jsdom from "jsdom";
const { JSDOM } = jsdom;
import * as fs from "fs";

test("head", () => {
    const input = [1, 2, 3];
    expect(head(input)).toEqual(1);
    expect(head([])).toBeNull();
    expect(head(1)).toBeNull();
});


test("last", () => {
    const input = [1, 2, 3];
    expect(last(input)).toEqual(3);
    expect(last([])).toBeNull();
    expect(last(1)).toBeNull();
});

describe("xpathFilter", () => {
    test("Without context node", () => {
        const str = fs.readFileSync("fixtures/example-ead.xml");
        const doc = new JSDOM(str);
        expect(xpathFilter(doc, "//titleproper")).toHaveLength(1);
        expect(xpathFilter(doc, "//titleproazeper")).toHaveLength(0);
    });
});