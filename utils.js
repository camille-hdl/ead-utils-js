//@flow

const XPATH_ANY_TYPE =
    typeof XPathResult !== "undefined" && typeof XPathResult.ANY_TYPE !== "undefined" ? XPathResult.ANY_TYPE : 0;

type ArrayOrTuple = Array<any> | [Element, string] | [string];

/**
 * Returns the first element of the array
 */
export const head = (arr: ArrayOrTuple): any | null => {
    if (typeof arr[0] !== "undefined") return arr[0];
    return null;
};

/**
 * Returns the last element of the array
 */
export const last = (arr: ArrayOrTuple): any | null => {
    if (typeof arr.length !== "undefined" && arr.length > 0 && typeof arr[arr.length - 1] !== "undefined")
        return arr[arr.length - 1];
    return null;
};

/**
 * Executes a xpath query on `doc` but only returns truthy results.
 * If the second argument is a node, it will be used as a context node (see `Document.evaluate` on MDN for documentation),
 * otherwise the document is itself is used.
 * `xpathFilter(doc, query)` or `xpathFilter(doc, node, query)`
 */
export const xpathFilter = (doc: any, ...args: [string] | [Element, string]): Array<any> => {
    const query = args.length === 1 ? head(args) : last(args);
    const contextNode = args.length > 1 ? head(args) : doc;
    let nsResolver = doc.createNSResolver(
        doc.ownerDocument == null ? doc.documentElement : doc.ownerDocument.documentElement
    );
    let xpathResult = doc.evaluate(query, contextNode, nsResolver, XPATH_ANY_TYPE, null);
    let c;
    let elems = [];
    do {
        c = xpathResult.iterateNext();
        if (c) {
            elems.push(c);
        }
    } while (c !== null);
    return elems;
};
