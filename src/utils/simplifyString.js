export default function simplifyString(string) {
    let str = string.toLowerCase();
    str = str.normalize('NFD').replace(/[\u0300-\u036f]/g, ''); // replaces ä,ö,ü,é... with a,o,u,e...
    str = str.replace(/[ßẞ]/g, 's'); // replaces ß and ẞ with s
    str = str.replace(/c/g, 'k'); // replaces c with k
    str = str.replace(/y/g, 'j'); // replaces y with j
    str = str.replace(/[^a-z0-9]/g, ' '); // replaces all other characters with whitespace
    str = str.replace(/(.)\1+/g, '$1'); // removes duplicates
    str = str.replace(/oe/g, 'o'); // replaces oe with o
    str = str.replace(/ue/g, 'u'); // replaces ue with u
    str = str.replace(/ae/g, 'a'); // replaces ae with a
    str = str.replace(/(.)\1+/g, '$1'); // removes duplicates
    str = str.trim(); // trim string
    return str;
    return str;
}
