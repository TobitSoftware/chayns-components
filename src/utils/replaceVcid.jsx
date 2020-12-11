import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

const escapeHTML = (text) => {
    const div = document.createElement('div');
    div.innerText = text;
    return div.innerHTML;
};

const replaceVcid = (text) => {
    if (/\u200b/.test(text)) {
        return (
            <span
                dangerouslySetInnerHTML={{
                    __html: escapeHTML(text).replace(/\u200b/g, () => {
                        return (
                            ' ' +
                            renderToStaticMarkup(
                                <span className="vcid-check--blue">
                                    <span />
                                    <span />
                                    <span />
                                </span>
                            )
                        );
                    }),
                }}
            />
        );
    }
    return text;
};

export default replaceVcid;
