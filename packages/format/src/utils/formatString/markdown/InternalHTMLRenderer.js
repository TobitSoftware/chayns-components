/* eslint-disable camelcase */
// noinspection JSUnusedGlobalSymbols,JSUnresolvedReference

import { HtmlRenderer } from 'commonmark';
import { escapeHtmlInText, MESSAGE_CONVERSION_LINE_BREAK } from '../../escape';

const reUnsafeProtocol = /^javascript:|vbscript:|file:|data:/i;
const reSafeDataProtocol = /^data:image\/(?:png|gif|jpeg|webp)/i;

function potentiallyUnsafe(url) {
    return reUnsafeProtocol.test(url) && !reSafeDataProtocol.test(url);
}

// Helper function to produce an HTML tag.
function tag(name, attributes, selfclosing) {
    if (this.disableTags > 0) {
        return;
    }
    this.buffer += `<${name}`;
    if (attributes && attributes.length > 0) {
        let i = 0;
        let attribute;
        // eslint-disable-next-line no-cond-assign
        while ((attribute = attributes[i]) !== undefined) {
            this.buffer += ` ${attribute[0]}="${attribute[1]}"`;
            i++;
        }
    }
    if (selfclosing) {
        this.buffer += ' /';
    }
    this.buffer += '>';
    this.lastOut = '>';
}

function InternalHTMLRenderer(options) {
    // eslint-disable-next-line no-param-reassign
    options = options || {};
    // by default, soft breaks are rendered as newlines in HTML
    // eslint-disable-next-line no-param-reassign
    options.softbreak = options.softbreak || '';
    // set to "<br />" to make them hard breaks
    // set to " " if you want to ignore line wrapping in source
    this.esc = escapeHtmlInText;
    // escape html with a custom function
    // else use escapeXml

    this.disableTags = 0;
    this.lastOut = '\n';
    this.options = options;
}

/* Node methods */

function text(node) {
    this.out(node.literal);
}

function softbreak() {
    this.lit('\n');
}

function linebreak() {
    this.lit('\n');
}

function link(node, entering) {
    const attributes = this.attrs(node);
    if (entering) {
        if (!(this.options.safe && potentiallyUnsafe(node.destination))) {
            attributes.push(['href', this.esc(node.destination)]);
        }
        if (node.title) {
            attributes.push(['title', this.esc(node.title)]);
        }
        this.tag('a', attributes);
    } else {
        this.tag('/a');
    }
}

function image(node, entering) {
    if (entering) {
        if (this.disableTags === 0) {
            if (this.options.safe && potentiallyUnsafe(node.destination)) {
                this.lit('<img style="max-width: 100%" src=""');
            } else {
                this.lit(`<img src="${this.esc(node.destination)}"`);
            }
        }
        this.disableTags += 1;
    } else {
        this.disableTags -= 1;
        if (this.disableTags === 0) {
            if (node.title) {
                this.lit(` title="${this.esc(node.title)}`);
            }
            this.lit('/>');
        }
    }
}

function emph(node, entering) {
    this.tag(entering ? 'em' : '/em');
}

function strong(node, entering) {
    this.tag(entering ? 'strong' : '/strong');
}

function paragraph(node) {
    const grandparent = node.parent.parent;

    if (grandparent !== null && grandparent.type === 'list') {
        return;
    }

    this.cr();
}

function heading(node, entering) {
    const tagName = `h${node.level}`;
    const attributes = this.attrs(node);
    if (entering) {
        this.cr();
        this.tag(tagName, attributes);

        // Removes line break after heading.
        // That line break would be one too many, since headings are block-level elements, and thus already cause a line break behind them.
        if (
            node.next?.type === 'html_block' &&
            node.next?.literal === MESSAGE_CONVERSION_LINE_BREAK
        ) {
            node.next.unlink();
        }
    } else {
        this.tag(`/${tagName}`);
        this.cr();
    }
}

function code(node) {
    this.tag('code class="inline-code"');
    this.out(node.literal);
    this.tag('/code');
}

function code_block(node) {
    console.log('node', node, node.isFenced);
    if (node._isFenced) {
        this.tag('pre', [['language', node.info]]);
        this.tag('code');

        // Removes trailing and leading line break from the code block content.
        const pattern = new RegExp(
            `^(${MESSAGE_CONVERSION_LINE_BREAK}|\\n)+|(${MESSAGE_CONVERSION_LINE_BREAK}|\\n)+$`,
            'g',
        );
        const replaced = node.literal.replaceAll(pattern, '');
        this.out(replaced);

        this.tag('/code');
        this.tag('/pre');

        // Removes line break after code block.
        // That line break would be one too many, since code blocks are block-level elements, and thus already cause a line break behind them.
        if (
            node.next?.type === 'html_block' &&
            node.next?.literal === MESSAGE_CONVERSION_LINE_BREAK
        ) {
            // eslint-disable-next-line no-param-reassign
            node.next.literal = '';
        }
    } else {
        this.out(node.literal);
    }
}

function thematic_break(node) {
    // Removes line break after thematic break.
    // That line break would be one too many, since thematic breaks are block-level elements, and thus already cause a line break behind them.
    if (node.next?.type === 'html_block' && node.next?.literal === MESSAGE_CONVERSION_LINE_BREAK) {
        // eslint-disable-next-line no-param-reassign
        node.next.literal = '';
    }

    const attributes = this.attrs(node);
    this.cr();
    this.tag('hr', attributes, true);
    this.cr();
}

function block_quote(node, entering) {
    const attributes = this.attrs(node);
    if (entering) {
        this.cr();
        this.tag('blockquote', attributes);
        this.cr();
    } else {
        this.cr();
        this.tag('/blockquote');
        this.cr();
    }
}

function list(node, entering) {
    const tagName = node.listType === 'bullet' ? 'ul' : 'ol';
    const attributes = this.attrs(node);

    if (entering) {
        const start = node.listStart;
        if (start !== null && start !== 1) {
            attributes.push(['start', start.toString()]);
        }
        this.cr();
        this.tag(tagName, attributes);
        this.cr();
    } else {
        this.cr();
        this.tag(`/${tagName}`);
        this.cr();
    }
}

function item(node, entering) {
    const attributes = this.attrs(node);
    if (entering) {
        this.tag('li', attributes);
    } else {
        this.tag('/li');
        this.cr();
    }
}

function html_inline(node) {
    if (this.options.safe) {
        this.lit('<!-- raw HTML omitted -->');
    } else {
        this.lit(node.literal);
    }
}

function html_block(node) {
    this.cr();
    if (this.options.safe) {
        this.lit('<!-- raw HTML omitted -->');
    } else {
        this.lit(node.literal);
    }
    this.cr();
}

function custom_inline(node, entering) {
    if (entering && node.onEnter) {
        this.lit(node.onEnter);
    } else if (!entering && node.onExit) {
        this.lit(node.onExit);
    }
}

function custom_block(node, entering) {
    this.cr();
    if (entering && node.onEnter) {
        this.lit(node.onEnter);
    } else if (!entering && node.onExit) {
        this.lit(node.onExit);
    }
    this.cr();
}

/* Helper methods */

function out(s) {
    this.lit(this.esc(s));
}

function attrs(node) {
    const att = [];
    if (this.options.sourcepos) {
        const pos = node.sourcepos;
        if (pos) {
            att.push([
                'data-sourcepos',
                `${String(pos[0][0])}:${String(pos[0][1])}-${String(pos[1][0])}:${String(
                    pos[1][1],
                )}`,
            ]);
        }
    }
    return att;
}

// quick browser-compatible inheritance
InternalHTMLRenderer.prototype = Object.create(HtmlRenderer.prototype);

InternalHTMLRenderer.prototype.text = text;
InternalHTMLRenderer.prototype.html_inline = html_inline;
InternalHTMLRenderer.prototype.html_block = html_block;
InternalHTMLRenderer.prototype.softbreak = softbreak;
InternalHTMLRenderer.prototype.linebreak = linebreak;
InternalHTMLRenderer.prototype.link = link;
InternalHTMLRenderer.prototype.image = image;
InternalHTMLRenderer.prototype.emph = emph;
InternalHTMLRenderer.prototype.strong = strong;
InternalHTMLRenderer.prototype.paragraph = paragraph;
InternalHTMLRenderer.prototype.heading = heading;
InternalHTMLRenderer.prototype.code = code;
InternalHTMLRenderer.prototype.code_block = code_block;
InternalHTMLRenderer.prototype.thematic_break = thematic_break;
InternalHTMLRenderer.prototype.block_quote = block_quote;
InternalHTMLRenderer.prototype.list = list;
InternalHTMLRenderer.prototype.item = item;
InternalHTMLRenderer.prototype.custom_inline = custom_inline;
InternalHTMLRenderer.prototype.custom_block = custom_block;

InternalHTMLRenderer.prototype.esc = escapeHtmlInText;

InternalHTMLRenderer.prototype.out = out;
InternalHTMLRenderer.prototype.tag = tag;
InternalHTMLRenderer.prototype.attrs = attrs;

export default InternalHTMLRenderer;
