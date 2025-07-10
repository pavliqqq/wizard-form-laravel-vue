export function splitter(str) {
    const parts = str.trim().split(/\s+/);

    return {
        firstName: parts[0],
        lastName: parts[1],
    };
}
