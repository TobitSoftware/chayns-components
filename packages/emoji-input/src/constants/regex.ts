export const BB_LC_MENTION_REGEX = /\[lc_mention.+?id="([^"]+?)"](.+?)\[\/lc_mention]/g;

export const HTML_LC_MENTION_REGEX =
    /<lc_mention.+?id="([^"]+?)">(?:<span.*?<\/span>)*(.+?)<\/lc_mention>/g;

export const QUOTE_REGEX =
    /(?<![<[])(?<!\[[^]]*)(?<!&lt;[^&]*)(?<=\s|\S)"(?=\S|\s)(?![^[]*\])(?![^&]*&gt;)/g;
