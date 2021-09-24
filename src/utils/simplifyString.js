export default function simplifyString(string) {
    let str = string.toLowerCase();
    str = str.normalize('NFD').replace(/[\u0300-\u036f]/g, ''); // replaces ä,ö,ü,é... with a,o,u,e...
    str = str.replace(/[ßẞ]/g, 's'); // replaces ß and ẞ with s
    str = str.replace(/(.)\1+/g, '$1'); // removes duplicates
    str = str.replace(/[^a-z0-9]/g, ' '); // replaces all other characters with whitespace
    str = ` ${str}`;
    return str;
}
