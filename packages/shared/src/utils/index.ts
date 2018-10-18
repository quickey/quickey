const ALPHABET = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

export function guid(len: number = 8): string {
    let g = "";
    for (let i = 0; i < len; i++) {
        g += ALPHABET.charAt(Math.floor(Math.random() * ALPHABET.length));
    }

    return g;
}

function isTruthy(obj: any): boolean {
    return Boolean(obj);
}

export function every<T = any>(arr: T[], predicate: (item: T) => boolean = isTruthy): boolean {
    for (let i = 0, len = arr.length; i < len; i++) {
        if (!predicate(arr[i])) {
            return false;
        }
    }

    return true;
}

export function lc(str: string) {
    return str.toLowerCase();
}