import { describe, expect, test } from 'vitest';
import { formatStringToHtml } from './formatString';

const removeLinebreaks = (text: string) => text.replace(/\n/g, '');

describe('HTML Formatter Function', () => {
    describe('Format Plain Text', () => {
        describe('Line breaks', () => {
            test('should format line breaks correctly', () => {
                const result = formatStringToHtml('Line 1\nLine 2');
                expect(result.html).toEqual('<p>Line 1\nLine 2</p>');
                expect(result.tables).toEqual([]);
            });

            test('should format multiple line breaks correctly', () => {
                const result = formatStringToHtml('Line 1\n\nLine 2');
                expect(result.html).toEqual('<p>Line 1</p>\n<p>Line 2</p>');
                expect(result.tables).toEqual([]);
            });

            test('should remove trailing and leading new lines', () => {
                const result = formatStringToHtml('\n\n\nLine 1\n\n\n');
                expect(result.html).toEqual('<p>Line 1</p>');
                expect(result.tables).toEqual([]);
            });
        });

        describe('Whitespaces', () => {
            test('should not remove repeated whitespaces', () => {
                const result = formatStringToHtml('Text    with    spaces');
                expect(result.html).toEqual('<p>Text    with    spaces</p>');
                expect(result.tables).toEqual([]);
            });

            test('should not remove leading and trailing whitespaces', () => {
                const result = formatStringToHtml('   Text   ');
                expect(result.html).toEqual('<p>   Text   </p>');
                expect(result.tables).toEqual([]);
            });
        });

        describe('HTML', () => {
            test('should escape < and > correctly', () => {
                const resultEscape = formatStringToHtml('<div>Test</div>');
                expect(resultEscape.html).toEqual('<p>&lt;div&gt;Test&lt;/div&gt;</p>');
                expect(resultEscape.tables).toEqual([]);
            });

            test('should not escape &', () => {
                const resultEscape1 = formatStringToHtml('&lt;div&gt;Test&lt;/div&gt;');
                expect(resultEscape1.html).toEqual('<p>&lt;div&gt;Test&lt;/div&gt;</p>');
                expect(resultEscape1.tables).toEqual([]);

                const resultEscape2 = formatStringToHtml(
                    '&amp;lt;div&amp;gt;Test&amp;lt;/div&amp;gt;',
                );
                expect(resultEscape2.html).toEqual(
                    '<p>&amp;lt;div&amp;gt;Test&amp;lt;/div&amp;gt;</p>',
                );
                expect(resultEscape2.tables).toEqual([]);
            });

            // TODO Decide if & should be escaped, when they are not part of an HTML entity.
        });

        describe('URLs', () => {
            test('should not format URLs', () => {
                const result = formatStringToHtml('https://example.com');
                expect(result.html).toEqual('<p>https://example.com</p>');
                expect(result.tables).toEqual([]);
            });
        });
    });

    describe('Format Markdown', () => {
        describe('All Elements', () => {
            test('should format text styling correctly', () => {
                const boldResult = formatStringToHtml('**bold**');
                expect(boldResult.html).toEqual('<p><strong>bold</strong></p>');
                expect(boldResult.tables).toEqual([]);

                const italicResult = formatStringToHtml('*italic*');
                expect(italicResult.html).toEqual('<p><em>italic</em></p>');
                expect(italicResult.tables).toEqual([]);

                const inlineCodeResult = formatStringToHtml('`inline code`');
                expect(inlineCodeResult.html).toEqual('<p><code>inline code</code></p>');
                expect(inlineCodeResult.tables).toEqual([]);
            });

            test('should format headings correctly', () => {
                const h1Result = formatStringToHtml('# h1');
                expect(h1Result.html).toEqual('<h1>h1</h1>');
                expect(h1Result.tables).toEqual([]);

                const h2Result = formatStringToHtml('## h2');
                expect(h2Result.html).toEqual('<h2>h2</h2>');
                expect(h2Result.tables).toEqual([]);

                const h3Result = formatStringToHtml('### h3');
                expect(h3Result.html).toEqual('<h3>h3</h3>');
                expect(h3Result.tables).toEqual([]);

                const h4Result = formatStringToHtml('#### h4');
                expect(h4Result.html).toEqual('<h4>h4</h4>');
                expect(h4Result.tables).toEqual([]);

                const h5Result = formatStringToHtml('##### h5');
                expect(h5Result.html).toEqual('<h5>h5</h5>');
                expect(h5Result.tables).toEqual([]);

                const h6Result = formatStringToHtml('###### h6');
                expect(h6Result.html).toEqual('<h6>h6</h6>');
                expect(h6Result.tables).toEqual([]);
            });

            test('should format links correctly', () => {
                const result = formatStringToHtml('[Link](https://example.com)');
                expect(result.html).toEqual('<p><a href="https://example.com">Link</a></p>');
                expect(result.tables).toEqual([]);
            });

            test('should format images correctly', () => {
                const result = formatStringToHtml('![Alt Text](https://example.com/image.jpg)');
                expect(result.html).toEqual(
                    '<p><img src="https://example.com/image.jpg" alt="Alt Text"></p>',
                );
                expect(result.tables).toEqual([]);
            });

            test('should format lists correctly', () => {
                const expectedUnorderedListResult =
                    '<ul>\n<li>Item 1</li>\n<li>Item 2</li>\n<li>Item 3</li>\n</ul>';
                const expectedOrderedListResult =
                    '<ol>\n<li value="1">Item 1</li>\n<li value="2">Item 2</li>\n<li value="3">Item 3</li>\n</ol>';

                const unorderedListResult1 = formatStringToHtml('- Item 1\n- Item 2\n- Item 3');
                expect(unorderedListResult1.html).toEqual(expectedUnorderedListResult);
                expect(unorderedListResult1.tables).toEqual([]);

                const unorderedListResult2 = formatStringToHtml('* Item 1\n* Item 2\n* Item 3');
                expect(unorderedListResult2.html).toEqual(expectedUnorderedListResult);
                expect(unorderedListResult2.tables).toEqual([]);

                const orderedListResult = formatStringToHtml('1. Item 1\n2. Item 2\n3. Item 3');
                expect(orderedListResult.html).toEqual(expectedOrderedListResult);
                expect(orderedListResult.tables).toEqual([]);

                const orderedListResult2 = formatStringToHtml('1) Item 1\n2) Item 2\n3) Item 3');
                expect(orderedListResult2.html).toEqual(expectedOrderedListResult);
                expect(orderedListResult2.tables).toEqual([]);
            });

            test('should format thematic breaks correctly', () => {
                const expectedThematicBreakResult = '<hr>';

                const result1 = formatStringToHtml('---');
                expect(result1.html).toEqual(expectedThematicBreakResult);
                expect(result1.tables).toEqual([]);

                const result2 = formatStringToHtml('***');
                expect(result2.html).toEqual(expectedThematicBreakResult);
                expect(result2.tables).toEqual([]);
            });

            test('should format code blocks correctly', () => {
                const resultWithoutLanguage = formatStringToHtml('```\nconst a = 1;\n```');
                expect(resultWithoutLanguage.html).toEqual('<pre><code>const a = 1;</code></pre>');
                expect(resultWithoutLanguage.tables).toEqual([]);

                const resultWithLanguage = formatStringToHtml('```js\nconst a = 1;\n```');
                expect(resultWithLanguage.html).toEqual(
                    '<pre><code class="language-js">const a = 1;</code></pre>',
                );
                expect(resultWithLanguage.tables).toEqual([]);
            });

            test('should format tables correctly', () => {
                const inputString =
                    '| Header 1 | Header 2 |\n|----------|----------|\n| Cell 1   | Cell 2   |';
                const result = formatStringToHtml(inputString);
                expect(removeLinebreaks(result.html)).toEqual(
                    '<table id="formatted-table-0"><thead><tr><th>Header 1</th><th>Header 2</th></tr></thead><tbody><tr><td>Cell 1</td><td>Cell 2</td></tr></tbody></table>',
                );
                expect(result.tables).toEqual([
                    {
                        csv: 'Header 1,Header 2\nCell 1,Cell 2\n',
                        raw: inputString,
                        id: 'formatted-table-0',
                    },
                ]);
            });
        });

        describe('Inline Code', () => {
            describe('HTML In Code', () => {
                test('should escape < and > within inline code correctly', () => {
                    const result1 = formatStringToHtml('`<div>Test</div>`');
                    expect(result1.html).toEqual('<p><code>&lt;div&gt;Test&lt;/div&gt;</code></p>');
                    expect(result1.tables).toEqual([]);
                });

                test('should not escape & within inline code', () => {
                    const resultEscape1 = formatStringToHtml('`&lt;div&gt;Test&lt;/div&gt;`');
                    expect(resultEscape1.html).toEqual(
                        '<p><code>&lt;div&gt;Test&lt;/div&gt;</code></p>',
                    );
                    expect(resultEscape1.tables).toEqual([]);

                    const resultEscape2 = formatStringToHtml(
                        '`&amp;lt;div&amp;gt;Test&amp;lt;/div&amp;gt;`',
                    );
                    expect(resultEscape2.html).toEqual(
                        '<p><code>&amp;lt;div&amp;gt;Test&amp;lt;/div&amp;gt;</code></p>',
                    );
                    expect(resultEscape2.tables).toEqual([]);
                });
            });

            test('should not format markdown within inline code', () => {
                const result = formatStringToHtml('`**bold** *italic*`');
                expect(result.html).toEqual('<p><code>**bold** *italic*</code></p>');
                expect(result.tables).toEqual([]);
            });

            test('should not format bb-code within inline code', () => {
                const result = formatStringToHtml('`[b]bold[/b]`', { parseBBCode: true });
                expect(result.html).toEqual('<p><code>[b]bold[/b]</code></p>');
                expect(result.tables).toEqual([]);
            });
        });

        describe('Codeblock', () => {
            test('should format code blocks with multiple lines correctly', () => {
                const resultWithoutLanguage = formatStringToHtml(
                    '```\nconst a = 1;\nconst b = 2;\n```',
                );
                expect(resultWithoutLanguage.html).toEqual(
                    '<pre><code>const a = 1;\nconst b = 2;</code></pre>',
                );
                expect(resultWithoutLanguage.tables).toEqual([]);

                const resultWithLanguage = formatStringToHtml(
                    '```js\nconst a = 1;\nconst b = 2;\n```',
                );
                expect(resultWithLanguage.html).toEqual(
                    '<pre><code class="language-js">const a = 1;\nconst b = 2;</code></pre>',
                );
                expect(resultWithLanguage.tables).toEqual([]);
            });

            test('should not format 4 spaces as code block', () => {
                const result = formatStringToHtml('    const a = 1;');
                expect(result.html).toEqual('<p>    const a = 1;</p>');
                expect(result.tables).toEqual([]);
            });

            describe('HTML In Code', () => {
                test('should escape < and > within code block', () => {
                    const resultWithoutLanguage = formatStringToHtml('```\n<div>Test</div>\n```');
                    expect(resultWithoutLanguage.html).toEqual(
                        '<pre><code>&lt;div&gt;Test&lt;/div&gt;</code></pre>',
                    );
                    expect(resultWithoutLanguage.tables).toEqual([]);

                    const resultWithLanguage = formatStringToHtml('```html\n<div>Test</div>\n```');
                    expect(resultWithLanguage.html).toEqual(
                        '<pre><code class="language-html">&lt;div&gt;Test&lt;/div&gt;</code></pre>',
                    );
                    expect(resultWithLanguage.tables).toEqual([]);
                });

                test('should not escape & within code block', () => {
                    const resultEscape1 = formatStringToHtml(
                        '```\n&lt;div&gt;Test&lt;/div&gt;\n```',
                    );
                    expect(resultEscape1.html).toEqual(
                        '<pre><code>&lt;div&gt;Test&lt;/div&gt;</code></pre>',
                    );
                    expect(resultEscape1.tables).toEqual([]);

                    const resultEscape2 = formatStringToHtml(
                        '```\n&amp;lt;div&amp;gt;Test&amp;lt;/div&amp;gt;\n```',
                    );
                    expect(resultEscape2.html).toEqual(
                        '<pre><code>&amp;lt;div&amp;gt;Test&amp;lt;/div&amp;gt;</code></pre>',
                    );
                    expect(resultEscape2.tables).toEqual([]);
                });
            });

            test('should not format markdown within code block', () => {
                const resultWithoutLanguage = formatStringToHtml('```\n**Test**\n```');
                expect(resultWithoutLanguage.html).toEqual('<pre><code>**Test**</code></pre>');
                expect(resultWithoutLanguage.tables).toEqual([]);

                const resultWithLanguage = formatStringToHtml('```html\n**Test**\n```');
                expect(resultWithLanguage.html).toEqual(
                    '<pre><code class="language-html">**Test**</code></pre>',
                );
                expect(resultWithLanguage.tables).toEqual([]);
            });

            test('should not format bb-code within code block', () => {
                const resultWithoutLanguage = formatStringToHtml('```\n[b]Test[/b]\n```');
                expect(resultWithoutLanguage.html).toEqual('<pre><code>[b]Test[/b]</code></pre>');
                expect(resultWithoutLanguage.tables).toEqual([]);

                const resultWithLanguage = formatStringToHtml('```html\n[b]Test[/b]\n```');
                expect(resultWithLanguage.html).toEqual(
                    '<pre><code class="language-html">[b]Test[/b]</code></pre>',
                );
                expect(resultWithLanguage.tables).toEqual([]);
            });
        });

        describe('Table', () => {
            test('should format markdown within table correctly', () => {
                const inputString =
                    '| Header 1 | Header 2 |\n|----------|----------|\n| **Cell 1** | *Cell 2* |';
                const result = formatStringToHtml(inputString);
                expect(removeLinebreaks(result.html)).toEqual(
                    '<table id="formatted-table-0"><thead><tr><th>Header 1</th><th>Header 2</th></tr></thead><tbody><tr><td><strong>Cell 1</strong></td><td><em>Cell 2</em></td></tr></tbody></table>',
                );
                expect(result.tables).toEqual([
                    {
                        csv: 'Header 1,Header 2\n**Cell 1**,*Cell 2*\n',
                        raw: inputString,
                        id: 'formatted-table-0',
                    },
                ]);
            });

            test('should format bb-code within table correctly', () => {
                const inputString =
                    '| Header 1 | Header 2 |\n|----------|----------|\n| [b]Cell 1[/b] | [i]Cell 2[/i] |';
                const result = formatStringToHtml(inputString, {
                    parseBBCode: true,
                });
                expect(removeLinebreaks(result.html)).toEqual(
                    '<table id="formatted-table-0"><thead><tr><th>Header 1</th><th>Header 2</th></tr></thead><tbody><tr><td><b>Cell 1</b></td><td><i>Cell 2</i></td></tr></tbody></table>',
                );
                expect(result.tables).toEqual([
                    {
                        csv: 'Header 1,Header 2\n[b]Cell 1[/b],[i]Cell 2[/i]\n',
                        raw: inputString,
                        id: 'formatted-table-0',
                    },
                ]);
            });

            test('should format html within table correctly', () => {
                const inputString =
                    '| Header 1 | Header 2 | Header 3 |\n|----------|----------|----------|\n| <div>Cell 1</div> | &lt;div&gt;Cell 2&lt;/div&gt; | &amp;lt;div&amp;gt;Cell 3&amp;lt;/div&amp;gt; |';
                const result = formatStringToHtml(inputString, {
                    parseBBCode: true,
                });
                expect(removeLinebreaks(result.html)).toEqual(
                    '<table id="formatted-table-0"><thead><tr><th>Header 1</th><th>Header 2</th><th>Header 3</th></tr></thead><tbody><tr><td>&lt;div&gt;Cell 1&lt;/div&gt;</td><td>&lt;div&gt;Cell 2&lt;/div&gt;</td><td>&amp;lt;div&amp;gt;Cell 3&amp;lt;/div&amp;gt;</td></tr></tbody></table>',
                );
                expect(result.tables).toEqual([
                    {
                        csv: 'Header 1,Header 2,Header 3\n<div>Cell 1</div>,<div>Cell 2</div>,&lt;div&gt;Cell 3&lt;/div&gt;\n',
                        raw: '| Header 1 | Header 2 | Header 3 |\n|----------|----------|----------|\n| <div>Cell 1</div> | <div>Cell 2</div> | &lt;div&gt;Cell 3&lt;/div&gt; |',
                        id: 'formatted-table-0',
                    },
                ]);
            });

            test('should format multiple tables correctly', () => {
                const table1 =
                    '| Header 1 | Header 2 |\n|----------|----------|\n| Cell 1   | Cell 2   |';
                const getTable1Result = (index: number) =>
                    `<table id="formatted-table-${index}"><thead><tr><th>Header 1</th><th>Header 2</th></tr></thead><tbody><tr><td>Cell 1</td><td>Cell 2</td></tr></tbody></table>`;
                const table1Csv = 'Header 1,Header 2\nCell 1,Cell 2\n';
                const table2 =
                    '| Header 3 | Header 4 |\n|----------|----------|\n| Cell 3   | Cell 4   |';
                const getTable2TResult = (index: number) =>
                    `<table id="formatted-table-${index}"><thead><tr><th>Header 3</th><th>Header 4</th></tr></thead><tbody><tr><td>Cell 3</td><td>Cell 4</td></tr></tbody></table>`;
                const table2Csv = 'Header 3,Header 4\nCell 3,Cell 4\n';

                const result1 = formatStringToHtml(`${table1}\n\n${table2}`);
                expect(removeLinebreaks(result1.html)).toEqual(
                    `${getTable1Result(0)}${getTable2TResult(1)}`,
                );
                expect(result1.tables).toEqual([
                    {
                        csv: table1Csv,
                        raw: `${table1}\n\n`,
                        id: 'formatted-table-0',
                    },
                    {
                        csv: table2Csv,
                        raw: table2,
                        id: 'formatted-table-1',
                    },
                ]);

                // Tables in reverse order.
                const result2 = formatStringToHtml(`${table2}\n\n${table1}`);
                expect(removeLinebreaks(result2.html)).toEqual(
                    `${getTable2TResult(0)}${getTable1Result(1)}`,
                );
                expect(result2.tables).toEqual([
                    {
                        csv: table2Csv,
                        raw: `${table2}\n\n`,
                        id: 'formatted-table-0',
                    },
                    {
                        csv: table1Csv,
                        raw: table1,
                        id: 'formatted-table-1',
                    },
                ]);
            });
        });

        describe('List', () => {
            test('should format markdown within list correctly', () => {
                const result = formatStringToHtml('- **Item 1**\n- *Item 2*');
                expect(removeLinebreaks(result.html)).toEqual(
                    '<ul><li><strong>Item 1</strong></li><li><em>Item 2</em></li></ul>',
                );
                expect(result.tables).toEqual([]);
            });

            test('should format task lists correctly', () => {
                const result1 = formatStringToHtml('- [ ] 1\n- [x] 2\n- [X] 3');
                expect(removeLinebreaks(result1.html)).toEqual(
                    '<ul><li>[ ] 1</li><li>[x] 2</li><li>[x] 3</li></ul>',
                );
                expect(result1.tables).toEqual([]);
            });
        });

        describe('Combined Elements', () => {
            test('should format code block within list correctly', () => {
                const result = formatStringToHtml('* test\n  ```\n  test\n  ```');
                expect(removeLinebreaks(result.html)).toEqual(
                    '<ul><li>test<pre><code>test</code></pre></li></ul>',
                );
                expect(result.tables).toEqual([]);
            });
        });

        describe('Conflicts with BB-Code', () => {
            test('should not format bb code tag followed by paranthese to link', () => {
                const result = formatStringToHtml('[b]bold[/b](test)', { parseBBCode: true });
                expect(result.html).toEqual('<p><b>bold</b>(test)</p>');
                expect(result.tables).toEqual([]);
            });
        });
    });

    describe('Format BB-Code', () => {
        describe('All Elements', () => {
            describe('Inline Elements', () => {
                // b, strong, i, em, u, s, span, img
                test('should format b tag correctly', () => {
                    const result = formatStringToHtml('[b]bold[/b]', {
                        parseBBCode: true,
                    });
                    expect(result.html).toEqual('<p><b>bold</b></p>');
                    expect(result.tables).toEqual([]);
                });

                test('should format strong tag correctly', () => {
                    const result = formatStringToHtml('[strong]bold[/strong]', {
                        parseBBCode: true,
                    });
                    expect(result.html).toEqual('<p><strong>bold</strong></p>');
                    expect(result.tables).toEqual([]);
                });

                test('should format i tag correctly', () => {
                    const result = formatStringToHtml('[i]italic[/i]', {
                        parseBBCode: true,
                    });
                    expect(result.html).toEqual('<p><i>italic</i></p>');
                    expect(result.tables).toEqual([]);
                });

                test('should format em tag correctly', () => {
                    const result = formatStringToHtml('[em]italic[/em]', {
                        parseBBCode: true,
                    });
                    expect(result.html).toEqual('<p><em>italic</em></p>');
                    expect(result.tables).toEqual([]);
                });

                test('should format u tag correctly', () => {
                    const result = formatStringToHtml('[u]underline[/u]', {
                        parseBBCode: true,
                    });
                    expect(result.html).toEqual('<p><u>underline</u></p>');
                    expect(result.tables).toEqual([]);
                });

                test('should format s tag correctly', () => {
                    const result = formatStringToHtml('[s]strike[/s]', {
                        parseBBCode: true,
                    });
                    expect(result.html).toEqual('<p><s>strike</s></p>');
                    expect(result.tables).toEqual([]);
                });

                test('should format span tag correctly', () => {
                    const result = formatStringToHtml('[span]span[/span]', {
                        parseBBCode: true,
                    });
                    expect(result.html).toEqual('<p><span>span</span></p>');
                    expect(result.tables).toEqual([]);
                });

                test('should format img tag correctly', () => {
                    const result = formatStringToHtml(
                        '[img src="https://example.com/image.jpg"][/img]',
                        {
                            parseBBCode: true,
                        },
                    );
                    expect(result.html).toEqual('<p><img src="https://example.com/image.jpg"></p>');
                    expect(result.tables).toEqual([]);
                });
            });

            describe('Block Level Elements', () => {
                test('should format center tag correctly', () => {
                    const result = formatStringToHtml('[center]centered text[/center]', {
                        parseBBCode: true,
                    });
                    expect(result.html).toEqual('<p><center>centered text</center></p>');
                    expect(result.tables).toEqual([]);
                });

                test('should format ul tag correctly', () => {
                    const result = formatStringToHtml('[ul][li]Item 1[/li][li]Item 2[/li][/ul]', {
                        parseBBCode: true,
                    });
                    expect(result.html).toEqual('<p><ul><li>Item 1</li><li>Item 2</li></ul></p>');
                    expect(result.tables).toEqual([]);
                });

                test('should format ol tag correctly', () => {
                    const result = formatStringToHtml('[ol][li]Item 1[/li][li]Item 2[/li][/ol]', {
                        parseBBCode: true,
                    });
                    expect(result.html).toEqual('<p><ol><li>Item 1</li><li>Item 2</li></ol></p>');
                    expect(result.tables).toEqual([]);
                });

                test('should format li tag correctly', () => {
                    const result = formatStringToHtml('[li]Item[/li]', {
                        parseBBCode: true,
                    });
                    expect(result.html).toEqual('<p><li>Item</li></p>');
                    expect(result.tables).toEqual([]);
                });

                test('should format heading tags correctly', () => {
                    const getHeadingInput = (tag: string) => `[${tag}]${tag}[/${tag}]`;
                    const getHeadingOutput = (tag: string) => `<p><${tag}>${tag}</${tag}></p>`;
                    const headingTags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];

                    headingTags.forEach((tag) => {
                        const result = formatStringToHtml(getHeadingInput(tag), {
                            parseBBCode: true,
                        });
                        expect(result.html).toEqual(getHeadingOutput(tag));
                        expect(result.tables).toEqual([]);
                    });
                });

                test('should format p tag correctly', () => {
                    const result = formatStringToHtml('[p]paragraph[/p]', {
                        parseBBCode: true,
                    });
                    expect(result.html).toEqual('<p><p>paragraph</p></p>');
                    expect(result.tables).toEqual([]);
                });
            });

            describe('Custom Elements', () => {
                test('should format custom tags correctly', () => {
                    const input = '[custom attribute1="test1" attribute2="test2"]custom[/custom]';
                    const output =
                        '<p><bb-code-custom attribute1="test1" attribute2="test2">custom</bb-code-custom></p>';
                    const result1 = formatStringToHtml(input, {
                        parseBBCode: true,
                        customInlineLevelBBCodeTags: ['custom'],
                    });
                    expect(result1.html).toEqual(output);
                    expect(result1.tables).toEqual([]);

                    const result2 = formatStringToHtml(input, {
                        parseBBCode: true,
                        customBlockLevelBBCodeTags: ['custom'],
                    });
                    expect(result2.html).toEqual(output);
                    expect(result2.tables).toEqual([]);
                });

                test('should not format unknown custom tags', () => {
                    const result = formatStringToHtml('[unknown]unknown[/unknown]', {
                        parseBBCode: true,
                    });
                    expect(result.html).toEqual('<p>[unknown]unknown[/unknown]</p>');
                    expect(result.tables).toEqual([]);
                });
            });

            describe('Line breaks', () => {
                describe('Between Elements', () => {
                    test('should format line breaks between block level elements correctly', () => {
                        const result1 = formatStringToHtml('[h1]h1[/h1]\n[h2]h2[/h2]', {
                            parseBBCode: true,
                        });
                        expect(result1.html).toEqual('<p><h1>h1</h1><h2>h2</h2></p>');
                        expect(result1.tables).toEqual([]);

                        const result2 = formatStringToHtml('[h1]h1[/h1]\n\n[h2]h2[/h2]', {
                            parseBBCode: true,
                        });
                        expect(result2.html).toEqual('<p><h1>h1</h1></p>\n<p><h2>h2</h2></p>');
                        expect(result2.tables).toEqual([]);
                    });

                    test('should format line breaks between inline elements correctly', () => {
                        const result1 = formatStringToHtml('[b]bold[/b]\n[i]italic[/i]', {
                            parseBBCode: true,
                        });
                        expect(result1.html).toEqual('<p><b>bold</b>\n<i>italic</i></p>');
                        expect(result1.tables).toEqual([]);

                        const result2 = formatStringToHtml('[b]bold[/b]\n\n[i]italic[/i]', {
                            parseBBCode: true,
                        });
                        expect(result2.html).toEqual('<p><b>bold</b></p>\n<p><i>italic</i></p>');
                        expect(result2.tables).toEqual([]);
                    });
                });

                describe('Within Elements', () => {
                    test('should format line breaks within block level elements correctly', () => {
                        const result = formatStringToHtml('[h1]Line 1\nLine 2[/h1]', {
                            parseBBCode: true,
                        });
                        expect(result.html).toEqual('<p><h1>Line 1\nLine 2</h1></p>');
                        expect(result.tables).toEqual([]);
                    });

                    // This is a test that would fail!
                    // test('should format multiple line breaks within block level elements correctly', () => {
                    //     const result = formatStringToHtml('[h1]Line 1\n\nLine 2[/h1]', {
                    //         parseBBCode: true,
                    //     });
                    //     expect(result.html).toEqual('<p><h1>Line 1\nLine 2</h1></p>');
                    //     expect(result.tables).toEqual([]);
                    // });

                    test('should remove trailing and leading new lines within block level elements', () => {
                        const result = formatStringToHtml('[h1]\n\n\nLine 1\n\n\n[/h1]', {
                            parseBBCode: true,
                        });
                        expect(result.html).toEqual('<p><h1>Line 1</h1></p>');
                        expect(result.tables).toEqual([]);
                    });
                });
            });

            test('should not format url in tag attributes', () => {
                const result = formatStringToHtml(
                    '[link url="https://www.google.com"]Google[/link]',
                    {
                        parseBBCode: true,
                        customInlineLevelBBCodeTags: ['link'],
                    },
                );
                expect(result.html).toEqual(
                    '<p><bb-code-link url="https://www.google.com">Google</bb-code-link></p>',
                );
                expect(result.tables).toEqual([]);
            });

            test('should apply style attribute correctly', () => {
                const result = formatStringToHtml('[span style="color: red;"]red text[/span]', {
                    parseBBCode: true,
                });
                expect(result.html).toEqual('<p><span style="color: red;">red text</span></p>');
                expect(result.tables).toEqual([]);
            });

            test('should format nested elements correctly', () => {
                const result = formatStringToHtml('[b][i]bold italic[/i][/b]', {
                    parseBBCode: true,
                });
                expect(result.html).toEqual('<p><b><i>bold italic</i></b></p>');
                expect(result.tables).toEqual([]);
            });
        });
    });

    describe('Combined Formatting (Markdown + BB-Code)', () => {
        test('should format bb-code within markdown correctly', () => {
            const result = formatStringToHtml('*[b]bold[/b]*', {
                parseBBCode: true,
            });
            expect(result.html).toEqual('<p><em><b>bold</b></em></p>');
            expect(result.tables).toEqual([]);
        });

        test('should format markdown within bb-code correctly', () => {
            const result = formatStringToHtml('[b]*bold*[/b]', {
                parseBBCode: true,
            });
            expect(result.html).toEqual('<p><b><em>bold</em></b></p>');
            expect(result.tables).toEqual([]);
        });
    });
});
