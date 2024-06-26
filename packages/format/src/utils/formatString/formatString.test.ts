import { describe, expect, test } from 'vitest';
import { formatStringToHtml } from './formatString';

// TODO Test the table array.
describe('HTML Formatter Function', () => {
    describe('Format Plain Text', () => {
        describe('Line breaks', () => {
            test('should format line breaks correctly', () => {
                const result = formatStringToHtml('Line 1\nLine 2');
                expect(result.html).toEqual('<p>Line 1\nLine 2</p>\n');
            });

            test('should format multiple line breaks correctly', () => {
                const result = formatStringToHtml('Line 1\n\nLine 2');
                expect(result.html).toEqual('<p>Line 1</p>\n<p>Line 2</p>\n');
            });

            // TODO Remove trailing and leading new lines.
        });

        describe('Whitespaces', () => {
            test('should not remove repeated whitespaces', () => {
                const result = formatStringToHtml('Text    with    spaces');
                expect(result.html).toEqual('<p>Text    with    spaces</p>\n');
            });

            // TODO Decide if leading white spaces should be removed.
        });

        describe('HTML', () => {
            test('should escape HTML, when escapeHtml is true', () => {
                const resultEscape = formatStringToHtml('<div>Test</div>', { escapeHtml: true });
                expect(resultEscape.html).toEqual('<p>&lt;div&gt;Test&lt;/div&gt;</p>\n');
            });

            test('should not escape HTML, when escapeHtml is false', () => {
                const resultNoEscape = formatStringToHtml('<div>Test</div>');
                expect(resultNoEscape.html).toEqual('<div>Test</div>');
            });
        });
    });

    describe('Format Markdown', () => {
        describe('All Elements', () => {
            test('should format text styling correctly', () => {
                const boldResult = formatStringToHtml('**bold**');
                expect(boldResult.html).toEqual('<p><strong>bold</strong></p>\n');

                const italicResult = formatStringToHtml('*italic*');
                expect(italicResult.html).toEqual('<p><em>italic</em></p>\n');

                const inlineCodeResult = formatStringToHtml('`inline code`');
                expect(inlineCodeResult.html).toEqual(
                    // TODO code shouldn't have inline code class.
                    '<p><code>inline code</code></p>\n',
                );
            });

            test('should format headings correctly', () => {
                const h1Result = formatStringToHtml('# h1');
                expect(h1Result.html).toEqual('<h1>h1</h1>\n');

                const h2Result = formatStringToHtml('## h2');
                expect(h2Result.html).toEqual('<h2>h2</h2>\n');

                const h3Result = formatStringToHtml('### h3');
                expect(h3Result.html).toEqual('<h3>h3</h3>\n');

                const h4Result = formatStringToHtml('#### h4');
                expect(h4Result.html).toEqual('<h4>h4</h4>\n');

                const h5Result = formatStringToHtml('##### h5');
                expect(h5Result.html).toEqual('<h5>h5</h5>\n');

                const h6Result = formatStringToHtml('###### h6');
                expect(h6Result.html).toEqual('<h6>h6</h6>\n');
            });

            test('should format links correctly', () => {
                const result = formatStringToHtml('[Link](https://example.com)');
                expect(result.html).toEqual('<p><a href="https://example.com">Link</a></p>\n');
            });

            test('should format images correctly', () => {
                const result = formatStringToHtml('![Alt Text](https://example.com/image.jpg)');
                expect(result.html).toEqual(
                    '<p><img src="https://example.com/image.jpg" alt="Alt Text"></p>\n',
                );
            });

            test('should format lists correctly', () => {
                // TODO List items should not have trailing \n!
                const expectedUnorderedListResult =
                    '<ul>\n<li>Item 1</li>\n<li>Item 2</li>\n<li>Item 3</li>\n</ul>\n';
                const expectedOrderedListResult =
                    '<ol>\n<li>Item 1</li>\n<li>Item 2</li>\n<li>Item 3</li>\n</ol>\n';

                const unorderedListResult1 = formatStringToHtml('- Item 1\n- Item 2\n- Item 3');
                expect(unorderedListResult1.html).toEqual(expectedUnorderedListResult);
                const unorderedListResult2 = formatStringToHtml('* Item 1\n* Item 2\n* Item 3');
                expect(unorderedListResult2.html).toEqual(expectedUnorderedListResult);

                const orderedListResult = formatStringToHtml('1. Item 1\n2. Item 2\n3. Item 3');
                expect(orderedListResult.html).toEqual(expectedOrderedListResult);
                const orderedListResult2 = formatStringToHtml('1) Item 1\n2) Item 2\n3) Item 3');
                expect(orderedListResult2.html).toEqual(expectedOrderedListResult);
            });

            test('should format thematic breaks correctly', () => {
                const expectedThematicBreakResult = '<hr>\n';

                const result1 = formatStringToHtml('---');
                expect(result1.html).toEqual(expectedThematicBreakResult);
                const result2 = formatStringToHtml('***');
                expect(result2.html).toEqual(expectedThematicBreakResult);
            });

            test('should format code blocks correctly', () => {
                const resultWithoutLanguage = formatStringToHtml('```\nconst a = 1;\n```');
                expect(resultWithoutLanguage.html).toEqual(
                    '<pre><code>const a = 1;\n</code></pre>\n',
                );
                const resultWithLanguage = formatStringToHtml('```js\nconst a = 1;\n```');
                expect(resultWithLanguage.html).toEqual(
                    '<pre><code class="language-js">const a = 1;\n</code></pre>\n',
                );
            });

            test('should format tables correctly', () => {
                const result = formatStringToHtml(
                    '| Header 1 | Header 2 |\n|----------|----------|\n| Cell 1   | Cell 2   |',
                    { parseMarkdownTables: true },
                );
                expect(result.html).toEqual(
                    `<table>
<thead>
<tr>
<th>Header 1</th>
<th>Header 2</th>
</tr>
</thead>
<tbody><tr>
<td>Cell 1</td>
<td>Cell 2</td>
</tr>
</tbody></table>
`,
                );
            });
        });

        describe('Inline Code', () => {
            test('should escape HTML within inline code', () => {
                const result1 = formatStringToHtml('`<div>Test</div>`', { escapeHtml: false });
                expect(result1.html).toEqual('<p><code>&lt;div&gt;Test&lt;/div&gt;</code></p>\n');

                const result2 = formatStringToHtml('`<div>Test</div>`', { escapeHtml: true });
                expect(result2.html).toEqual('<p><code>&lt;div&gt;Test&lt;/div&gt;</code></p>\n');
            });

            test('should not format markdown within inline code', () => {
                const result = formatStringToHtml('`**bold** *italic*`');
                expect(result.html).toEqual('<p><code>**bold** *italic*</code></p>\n');
            });

            test('should not format bb-code within inline code', () => {
                const result = formatStringToHtml('`[b]bold[/b]`', { parseBBCode: true });
                expect(result.html).toEqual('<p><code>[b]bold[/b]</code></p>\n');
            });
        });

        describe('Codeblock', () => {
            test('should format code blocks with multiple lines correctly', () => {
                const resultWithoutLanguage = formatStringToHtml(
                    '```\nconst a = 1;\nconst b = 2;\n```',
                );
                expect(resultWithoutLanguage.html).toEqual(
                    '<pre><code>const a = 1;\nconst b = 2;\n</code></pre>\n',
                );

                const resultWithLanguage = formatStringToHtml(
                    '```js\nconst a = 1;\nconst b = 2;\n```',
                );
                expect(resultWithLanguage.html).toEqual(
                    '<pre><code class="language-js">const a = 1;\nconst b = 2;\n</code></pre>\n',
                );
            });

            test('should escape HTML within code block', () => {
                const resultWithoutLanguage = formatStringToHtml('```\n<div>Test</div>\n```');
                expect(resultWithoutLanguage.html).toEqual(
                    '<pre><code>&lt;div&gt;Test&lt;/div&gt;\n</code></pre>\n',
                );
                const resultWithLanguage = formatStringToHtml('```html\n<div>Test</div>\n```');
                expect(resultWithLanguage.html).toEqual(
                    '<pre><code class="language-html">&lt;div&gt;Test&lt;/div&gt;\n</code></pre>\n',
                );
            });

            test('should not format markdown within code block', () => {
                const resultWithoutLanguage = formatStringToHtml('```\n**Test**\n```');
                expect(resultWithoutLanguage.html).toEqual('<pre><code>**Test**\n</code></pre>\n');
                const resultWithLanguage = formatStringToHtml('```html\n**Test**\n```');
                expect(resultWithLanguage.html).toEqual(
                    '<pre><code class="language-html">**Test**\n</code></pre>\n',
                );
            });

            test('should not format bb-code within code block', () => {
                const resultWithoutLanguage = formatStringToHtml('```\n[b]Test[/b]\n```');
                expect(resultWithoutLanguage.html).toEqual(
                    '<pre><code>[b]Test[/b]\n</code></pre>\n',
                );
                const resultWithLanguage = formatStringToHtml('```html\n[b]Test[/b]\n```');
                expect(resultWithLanguage.html).toEqual(
                    '<pre><code class="language-html">[b]Test[/b]\n</code></pre>\n',
                );
            });
        });

        describe('Table', () => {
            test('should format markdown within table correctly', () => {
                const result = formatStringToHtml(
                    '| Header 1 | Header 2 |\n|----------|----------|\n| **Cell 1** | *Cell 2* |',
                    { parseMarkdownTables: true },
                );
                expect(result.html).toEqual(
                    '<table id="message-table-0"><thead><th>Header 1</th><th>Header 2</th></thead><tbody><tr><td><strong>Cell 1</strong></td><td><em>Cell 2</em></td></tr></tbody></table>',
                );
            });

            test('should format bb-code within table correctly', () => {
                const result = formatStringToHtml(
                    '| Header 1 | Header 2 |\n|----------|----------|\n| [b]Cell 1[/b] | [i]Cell 2[/i] |',
                    {
                        parseMarkdownTables: true,
                        parseBBCode: true,
                    },
                );
                expect(result.html).toEqual(
                    '<table id="message-table-0"><thead><th>Header 1</th><th>Header 2</th></thead><tbody><tr><td><b>Cell 1</b></td><td><i>Cell 2</i></td></tr></tbody></table>',
                );
            });
        });

        describe('List', () => {
            test('should format markdown within list correctly', () => {
                const result = formatStringToHtml('- **Item 1**\n- *Item 2*');
                expect(result.html).toEqual(
                    '<ul><li><strong>Item 1</strong>\n</li><li><em>Item 2</em></li></ul>',
                );
            });

            // TODO Fix code blocks within lists
            // test('should format codeblock within list correctly', () => {
            //     const result = formatStringToHtml(
            //         '- ```\nconst a = 1;\n```\n- ```js\nconst b = 2;\n```',
            //     );
            //     expect(result.html).toEqual(
            //         '<ul><li><pre language=""><code>const a = 1;</code></pre>\n</li><li><pre language="js"><code>const b = 2;</code></pre></li></ul>'
            //     );
            // });
        });

        describe('Line breaks', () => {
            enum ElementType {
                InlineLevel,
                BlockLevel,
            }
            type Token = {
                text: string;
                type: ElementType;
            };
            const getTestCase = (tokens: Token[], lineBreaks: number) => {
                let result = '';
                tokens.forEach((token, index, array) => {
                    result += token.text;
                    if (index < array.length - 1) {
                        if (token.type === ElementType.InlineLevel) {
                            result += lineBreaks === 0 ? '' : '\n'.repeat(lineBreaks);
                        } else if (token.type === ElementType.BlockLevel) {
                            // Remove one line break, behind block level elements.
                            result += lineBreaks === 0 ? '' : '\n'.repeat(lineBreaks - 1);
                        }
                    }
                });

                return result;
            };
            const textToInlineToken = (text: string) => ({ text, type: ElementType.InlineLevel });
            const textToBlockToken = (text: string) => ({ text, type: ElementType.BlockLevel });

            describe('Inline Level Elements', () => {
                describe('Text Styling', () => {
                    test('Should format line breaks between text styling correctly', () => {
                        const inputTokens = ['**bold**', '*italic*', '`inline code`'].map(
                            textToInlineToken,
                        );
                        const outputTokens = [
                            '<strong>bold</strong>',
                            '<em>italic</em>',
                            '<code>inline code</code>',
                        ].map(textToInlineToken);

                        for (let i = 0; i <= 4; i++) {
                            const result = formatStringToHtml(getTestCase(inputTokens, i));
                            expect(result.html).toEqual(getTestCase(outputTokens, i));
                        }
                    });

                    test('Should format line breaks between text styling and plain text correctly', () => {
                        const inputTokens = [
                            'text',
                            '**bold**',
                            'text',
                            '*italic*',
                            'text',
                            '`inline code`',
                            'text',
                        ].map(textToInlineToken);
                        const outputTokens = [
                            'text',
                            '<strong>bold</strong>',
                            'text',
                            '<em>italic</em>',
                            'text',
                            '<code>inline code</code>',
                            'text',
                        ].map(textToInlineToken);

                        for (let i = 0; i <= 4; i++) {
                            const result = formatStringToHtml(getTestCase(inputTokens, i));
                            expect(result.html).toEqual(getTestCase(outputTokens, i));
                        }
                    });
                });

                describe('Links', () => {
                    test('Should format line breaks between links correctly', () => {
                        const inputTokens = [
                            '[Link](https://example.com)',
                            '[Link](https://example.com)',
                        ].map(textToInlineToken);
                        const outputTokens = [
                            '<a href="https://example.com">Link</a>',
                            '<a href="https://example.com">Link</a>',
                        ].map(textToInlineToken);

                        for (let i = 0; i <= 4; i++) {
                            const result = formatStringToHtml(getTestCase(inputTokens, i));
                            expect(result.html).toEqual(getTestCase(outputTokens, i));
                        }
                    });

                    test('Should format line breaks between links and plain text correctly', () => {
                        const inputTokens = ['text', '[Link](https://example.com)', 'text'].map(
                            textToInlineToken,
                        );
                        const outputTokens = [
                            'text',
                            '<a href="https://example.com">Link</a>',
                            'text',
                        ].map(textToInlineToken);

                        for (let i = 0; i <= 4; i++) {
                            const result = formatStringToHtml(getTestCase(inputTokens, i));
                            expect(result.html).toEqual(getTestCase(outputTokens, i));
                        }
                    });
                });

                describe('Images', () => {
                    test('Should format line breaks between images correctly', () => {
                        const inputTokens = [
                            '![Alt Text](https://example.com/image.jpg)',
                            '![Alt Text](https://example.com/image.jpg)',
                        ].map(textToInlineToken);
                        const outputTokens = [
                            '<img src="https://example.com/image.jpg" alt="Alt Text"/>',
                            '<img src="https://example.com/image.jpg" alt="Alt Text"/>',
                            // TODO This should be the result: '<img src="https://example.com/image.jpg" alt="Alt Text">'
                        ].map(textToInlineToken);

                        for (let i = 0; i <= 4; i++) {
                            const result = formatStringToHtml(getTestCase(inputTokens, i));
                            expect(result.html).toEqual(getTestCase(outputTokens, i));
                        }
                    });

                    test('Should format line breaks between images and plain text correctly', () => {
                        const inputTokens = [
                            'text',
                            '![Alt Text](https://example.com/image.jpg)',
                            'text',
                        ].map(textToInlineToken);
                        const outputTokens = [
                            'text',
                            '<img src="https://example.com/image.jpg" alt="Alt Text"/>',
                            // TODO This should be the result: '<img src="https://example.com/image.jpg" alt="Alt Text">'
                            'text',
                        ].map(textToInlineToken);

                        for (let i = 0; i <= 4; i++) {
                            const result = formatStringToHtml(getTestCase(inputTokens, i));
                            expect(result.html).toEqual(getTestCase(outputTokens, i));
                        }
                    });
                });
            });

            describe('Block Level Elements', () => {
                describe('Headings', () => {
                    test('Should format line breaks between headings correctly', () => {
                        const inputTokens = ['# h1', '## h2', '### h3'].map(textToInlineToken);
                        const outputTokens = ['<h1>h1</h1>', '<h2>h2</h2>', '<h3>h3</h3>'].map(
                            textToBlockToken,
                        );

                        for (let i = 1; i <= 4; i++) {
                            const result = formatStringToHtml(getTestCase(inputTokens, i));
                            expect(result.html).toEqual(getTestCase(outputTokens, i));
                        }
                    });

                    test('Should format line breaks between headings and plain text correctly', () => {
                        const inputTokens = ['text', '# h1', 'text'].map(textToInlineToken);
                        const outputTokens = ['text', '<h1>h1</h1>', 'text'].map((text) =>
                            text === 'text' ? textToInlineToken(text) : textToBlockToken(text),
                        );

                        for (let i = 1; i <= 4; i++) {
                            const result = formatStringToHtml(getTestCase(inputTokens, i));
                            expect(result.html).toEqual(getTestCase(outputTokens, i));
                        }
                    });
                });

                // describe('Lists', () => {
                // TODO Fix list formatting by removing trailing new lines in list items.
                // test('Should format line breaks between lists correctly', () => {
                //     const inputTokens = [
                //         '* Item 1',
                //         '* Item 2',
                //         '1. Item 1',
                //         '2. Item 2',
                //     ].map(textToInlineToken);
                //     const outputTokens = [
                //         '<ul><li>Item 1</li><li>Item 2</li></ul>',
                //         '<ol><li>Item 1</li><li>Item 2</li></ol>',
                //     ].map(textToBlockToken);
                //
                //     for (let i = 1; i <= 4; i++) {
                //         const result = formatStringToHtml(getTestCase(inputTokens, i));
                //         console.log('expected', getTestCase(outputTokens, i));
                //         console.log('result', result.html);
                //
                //         expect(result.html).toEqual(getTestCase(outputTokens, i));
                //     }
                // });
                // TODO Add test for line breaks between lists and plain text.
                // });

                describe('Thematic Breaks', () => {
                    test('Should format line breaks between thematic breaks correctly', () => {
                        const inputTokens = ['---', '---', '---'].map(textToInlineToken);
                        const outputTokens = ['<hr />', '<hr />', '<hr />'].map(textToInlineToken);

                        for (let i = 0; i <= 4; i++) {
                            const result = formatStringToHtml(getTestCase(inputTokens, i + 1));
                            expect(result.html).toEqual(getTestCase(outputTokens, i));
                        }
                    });

                    test('Should format line breaks between thematic breaks and plain text correctly', () => {
                        const inputTokens = ['text', '---', 'text'].map(textToInlineToken);
                        const outputTokens = ['text', '<hr />', 'text'].map((text) =>
                            text === 'text' ? textToInlineToken(text) : textToBlockToken(text),
                        );

                        for (let i = 1; i <= 4; i++) {
                            const result = formatStringToHtml(getTestCase(inputTokens, i));
                            expect(result.html).toEqual(getTestCase(outputTokens, i));
                        }
                    });
                });

                describe('Code Blocks', () => {
                    test('Should format line breaks between code blocks correctly', () => {
                        const inputTokens = [
                            '```js\nconst test = 0;\n```',
                            '```js\nconst test = 0;\n```',
                        ].map(textToInlineToken);
                        const outputTokens = [
                            '<pre language="js"><code>const test = 0;</code></pre>',
                            '<pre language="js"><code>const test = 0;</code></pre>',
                        ].map(textToBlockToken);

                        for (let i = 1; i <= 4; i++) {
                            const result = formatStringToHtml(getTestCase(inputTokens, i));
                            expect(result.html).toEqual(getTestCase(outputTokens, i));
                        }
                    });

                    test('Should format line breaks between code blocks and plain text correctly', () => {
                        const inputTokens = ['text', '```js\nconst test = 0;\n```', 'text'].map(
                            textToInlineToken,
                        );
                        const outputTokens = [
                            'text',
                            '<pre language="js"><code>const test = 0;</code></pre>',
                            'text',
                        ].map((text) =>
                            text === 'text' ? textToInlineToken(text) : textToBlockToken(text),
                        );

                        for (let i = 1; i <= 4; i++) {
                            const result = formatStringToHtml(getTestCase(inputTokens, i));
                            expect(result.html).toEqual(getTestCase(outputTokens, i));
                        }
                    });
                });

                describe('Tables', () => {
                    test('Should format line breaks between code blocks correctly', () => {
                        const inputTokens = [
                            '| Header 1 | Header 2 |\n|----------|----------|\n| Cell 1   | Cell 2   |\n',
                            '| Header 1 | Header 2 |\n|----------|----------|\n| Cell 1   | Cell 2   |',
                        ].map(textToInlineToken);
                        const outputTokens = [
                            '<table id="message-table-0"><thead><th>Header 1</th><th>Header 2</th></thead><tbody><tr><td>Cell 1</td><td>Cell 2</td></tr></tbody></table>',
                            '<table id="message-table-1"><thead><th>Header 1</th><th>Header 2</th></thead><tbody><tr><td>Cell 1</td><td>Cell 2</td></tr></tbody></table>',
                        ].map(textToBlockToken);

                        for (let i = 1; i <= 4; i++) {
                            const result = formatStringToHtml(getTestCase(inputTokens, i), {
                                parseMarkdownTables: true,
                            });
                            expect(result.html).toEqual(getTestCase(outputTokens, i));
                        }
                    });

                    test('Should format line breaks between code blocks and plain text correctly', () => {
                        const inputTokens = [
                            'text',
                            '| Header 1 | Header 2 |\n|----------|----------|\n| Cell 1   | Cell 2   |',
                            'text',
                        ].map(textToInlineToken);
                        const outputTokens = [
                            'text',
                            '<table id="message-table-0"><thead><th>Header 1</th><th>Header 2</th></thead><tbody><tr><td>Cell 1</td><td>Cell 2</td></tr></tbody></table>',
                            'text',
                        ].map(textToBlockToken);

                        // Tests for text with one new line before table.
                        // It's not possible to have text with one new line behind the table, because that text would be added to the table.
                        const resultOneLineBreak = formatStringToHtml(
                            getTestCase(inputTokens.slice(0, 2), 1),
                            { parseMarkdownTables: true },
                        );
                        expect(resultOneLineBreak.html).toEqual(
                            getTestCase(outputTokens.slice(0, 2), 1),
                        );

                        for (let i = 2; i <= 4; i++) {
                            const result = formatStringToHtml(getTestCase(inputTokens, i), {
                                parseMarkdownTables: true,
                            });
                            expect(result.html).toEqual(getTestCase(outputTokens, i));
                        }
                    });
                });

                // TODO Add tests for line breaks between different block level elements.
            });
        });

        // describe('Combined Elements', () => {
        // TODO Fix issue, that causes this test to fail.
        // test('should format code block within list correctly', () => {
        //     const result = formatStringToHtml('* test\n  ```\n  test\n  ```');
        //     expect(result.html).toEqual('<ul><li>test\n<pre language=""><code>test</code></pre></li></ul>');
        // });
        // });

        describe('Conflicts with BB-Code', () => {
            test('should not format bb code tag followed by paranthese to link', () => {
                const result = formatStringToHtml('[b]bold[/b](test)', { parseBBCode: true });
                expect(result.html).toEqual('<b>bold</b>(test)');
            });
        });
    });

    // TODO Should format bb-code within markdown correctly.
    // TODO Should format markdown within bb-code correctly.

    // describe('BB-Code Formatting', () => {
    //
    //     it('should format bold text correctly', () => {
    //         // Test for "[b]bold[/b]" to "<strong>bold</strong>"
    //     });
    //
    //     it('should format italic text correctly', () => {
    //         // Test for "[i]italic[/i]" to "<em>italic</em>"
    //     });
    //
    //     // ... Weitere Tests für alle BB-Code-Elemente
    //
    // });
    //
    // describe('Combined Formatting (Markdown + BB-Code)', () => {
    //
    //     it('should format combined bold and italic text correctly', () => {
    //         // Test a combination of Markdown and BB-Code
    //     });
    //
    //     it('should handle nested formatting correctly', () => {
    //         // Test for nested elements like "**[b]text[/b]**"
    //     });
    //
    //     // ... Weitere kombinierte Tests
    //
    // });
});
