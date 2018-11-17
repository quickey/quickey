export function multiWordFilter(actual: string, expected: string = ""): boolean {
    let reg: any = "";
    expected.split(" ").forEach((v) => {
        v = v.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
        reg += "(?=.*" + v + ")";
    });

    reg = new RegExp(reg, "i");

    return actual.search(reg) > -1;
}