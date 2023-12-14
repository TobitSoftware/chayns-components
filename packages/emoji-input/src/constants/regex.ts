export const BB_LC_MENTION_REGEX = /\[lc_mention.+?id="([^"]+?)"](.+?)\[\/lc_mention]/g;
export const BB_NER_IGNORE_REGEX = /\[nerIgnore](.+?)\[\/nerIgnore]/g;
export const BB_NER_REPLACE_REGEX =
    /\[nerReplace\s+(?:type="([^"]*)"\s+value="([^"]*)"\s*|\s*value="([^"]*)"\s+type="([^"]*)")](.*?)\[\/nerReplace]/gi;

export const HTML_LC_MENTION_REGEX =
    /<lc_mention.+?id="([^"]+?)">(?:<span.*?<\/span>)*(.+?)<\/lc_mention>/g;
export const HTML_NER_IGNORE_REGEX = /<nerIgnore>(.+?)<\/nerIgnore>/g;
export const HTML_NER_REPLACE_REGEX =
    /<nerReplace\s+(?:type="([^"]*)"\s+value="([^"]*)"\s*|\s*value="([^"]*)"\s+type="([^"]*)")>(.*?)<\/nerReplace>/gi;
