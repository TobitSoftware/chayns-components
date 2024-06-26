import { builders } from 'prettier/doc';
import { describe, expect, test } from 'vitest';
import { formatStringToHtml } from './formatString';
import line = builders.line;

describe('HTML Formatter Function', () => {
    describe('Format Plain Text', () => {
        describe('Line breaks', () => {
            test('should format line breaks correctly', () => {
                const result = formatStringToHtml('Line 1\nLine 2');
                expect(result.html).toEqual('Line 1\nLine 2');
            });

            test('should format multiple line breaks correctly', () => {
                const result = formatStringToHtml('Line 1\n\nLine 2');
                expect(result.html).toEqual('Line 1\n\nLine 2');
            });

            // TODO Remove trailing and leading new lines.
        });
    });

    describe('Format Markdown', () => {
        describe('Formatting Elements', () => {
            test('should format text styling correctly', () => {
                const boldResult = formatStringToHtml('**bold**');
                expect(boldResult.html).toEqual('<strong>bold</strong>');

                const italicResult = formatStringToHtml('*italic*');
                expect(italicResult.html).toEqual('<em>italic</em>');

                const inlineCodeResult = formatStringToHtml('`inline code`');
                expect(inlineCodeResult.html).toEqual(
                    '<code class="inline-code">inline code</code>',
                );

                // TODO Move combination to its own test
                const combinedResult = formatStringToHtml('**bold** *italic* `inline code`');
                expect(combinedResult.html).toEqual(
                    '<strong>bold</strong> <em>italic</em> <code class="inline-code">inline code</code>',
                );

                // TODO Move combination to its own test
                const combinedResult2 = formatStringToHtml('**bold *italic* `inline code`**');
                expect(combinedResult2.html).toEqual(
                    '<strong>bold <em>italic</em> <code class="inline-code">inline code</code></strong>',
                );
            });

            test('should format headings correctly', () => {
                const h1Result = formatStringToHtml('# h1');
                expect(h1Result.html).toEqual('<h1>h1</h1>');

                const h2Result = formatStringToHtml('## h2');
                expect(h2Result.html).toEqual('<h2>h2</h2>');

                const h3Result = formatStringToHtml('### h3');
                expect(h3Result.html).toEqual('<h3>h3</h3>');

                const h4Result = formatStringToHtml('#### h4');
                expect(h4Result.html).toEqual('<h4>h4</h4>');

                const h5Result = formatStringToHtml('##### h5');
                expect(h5Result.html).toEqual('<h5>h5</h5>');

                const h6Result = formatStringToHtml('###### h6');
                expect(h6Result.html).toEqual('<h6>h6</h6>');
            });

            test('should format links correctly', () => {
                const result = formatStringToHtml('[Link](https://example.com)');
                expect(result.html).toEqual('<a href="https://example.com">Link</a>');
            });

            test('should format images correctly', () => {
                const result = formatStringToHtml('![Alt Text](https://example.com/image.jpg)');
                expect(result.html).toEqual(
                    '<img src="https://example.com/image.jpg"Alt Text/>',
                    // TODO This should be the result: '<img src="https://example.com/image.jpg" alt="Alt Text">'
                );
            });

            test('should format lists correctly', () => {
                // TODO List items should not have trailing \n!
                const expectedUnorderedListResult =
                    '<ul><li>Item 1\n</li><li>Item 2\n</li><li>Item 3</li></ul>';
                const expectedOrderedListResult =
                    '<ol><li>Item 1\n</li><li>Item 2\n</li><li>Item 3</li></ol>';

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
                const expectedThematicBreakResult = '<hr />';

                const result1 = formatStringToHtml('---');
                expect(result1.html).toEqual(expectedThematicBreakResult);
                const result2 = formatStringToHtml('***');
                expect(result2.html).toEqual(expectedThematicBreakResult);
            });

            test('should format code blocks correctly', () => {
                const resultWithoutLanguage = formatStringToHtml('```\nconst a = 1;\n```');
                expect(resultWithoutLanguage.html).toEqual(
                    '<pre language=""><code>const a = 1;</code></pre>',
                );
                const resultWithLanguage = formatStringToHtml('```js\nconst a = 1;\n```');
                expect(resultWithLanguage.html).toEqual(
                    '<pre language="js"><code>const a = 1;</code></pre>',
                );
            });

            test('should format tables correctly', () => {
                const result = formatStringToHtml(
                    '| Header 1 | Header 2 |\n|----------|----------|\n| Cell 1   | Cell 2   |',
                    { parseMarkdownTables: true },
                );
                expect(result.html).toEqual(
                    '<table id="message-table-0"><thead><th>Header 1</th><th>Header 2</th></thead><tbody><tr><td>Cell 1</td><td>Cell 2</td></tr></tbody></table>',
                );
            });
        });

        describe('Codeblock Formatting', () => {
            test('should format code blocks with multiple lines correctly', () => {
                const resultWithoutLanguage = formatStringToHtml(
                    '```\nconst a = 1;\nconst b = 2;\nconst c = 3;\n```',
                );
                expect(resultWithoutLanguage.html).toEqual(
                    '<pre language=""><code>const a = 1;\nconst b = 2;\nconst c = 3;</code></pre>',
                );

                const resultWithLanguage = formatStringToHtml(
                    '```js\nconst a = 1;\nconst b = 2;\nconst c = 3;\n```',
                );
                expect(resultWithLanguage.html).toEqual(
                    '<pre language="js"><code>const a = 1;\nconst b = 2;\nconst c = 3;</code></pre>',
                );
            });

            test('should escape HTML within code block', () => {
                const resultWithoutLanguage = formatStringToHtml('```\n<div>Test</div>\n```');
                expect(resultWithoutLanguage.html).toEqual(
                    '<pre language=""><code>&lt;div&gt;Test&lt;/div&gt;</code></pre>',
                );
                const resultWithLanguage = formatStringToHtml('```html\n<div>Test</div>\n```');
                expect(resultWithLanguage.html).toEqual(
                    '<pre language="html"><code>&lt;div&gt;Test&lt;/div&gt;</code></pre>',
                );
            });

            test('should not format bb-code within code block', () => {
                const resultWithoutLanguage = formatStringToHtml('```\n[b]Test[/b]\n```');
                expect(resultWithoutLanguage.html).toEqual(
                    '<pre language=""><code>[b]Test[/b]</code></pre>',
                );
                const resultWithLanguage = formatStringToHtml('```html\n[b]Test[/b]\n```');
                expect(resultWithLanguage.html).toEqual(
                    '<pre language="html"><code>[b]Test[/b]</code></pre>',
                );
            });
        });

        describe('Table Formatting', () => {
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

        describe('List Formatting', () => {
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
                            result += lineBreaks === 0 ? ' ' : '\n'.repeat(lineBreaks);
                        } else {
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
                            '<code class="inline-code">inline code</code>',
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
                            '<code class="inline-code">inline code</code>',
                            'text',
                        ].map(textToInlineToken);

                        for (let i = 0; i <= 4; i++) {
                            const result = formatStringToHtml(getTestCase(inputTokens, i));
                            expect(result.html).toEqual(getTestCase(outputTokens, i));
                        }
                    });
                });

                // TODO Add Links and Images
            });

            describe('Block Level Elements (headings, lists, thematic breaks, code blocks, tables)', () => {
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
                        const inputTokens = [
                            'text',
                            '# h1',
                            'text',
                            '## h2',
                            'text',
                            '### h3',
                            'text',
                        ].map(textToInlineToken);
                        const outputTokens = [
                            'text',
                            '<h1>h1</h1>',
                            'text',
                            '<h2>h2</h2>',
                            'text',
                            '<h3>h3</h3>',
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

                // describe('Lists', () => {
                //
                // });

                // describe('Thematic Breaks', () => {
                //     test('Should format line breaks between thematic breaks correctly', () => {
                //         const inputTokens = ['---', '---', '---']
                //             .map(textToInlineToken);
                //         const outputTokens = ['<h1>h1</h1>', '<h2>h2</h2>', '<h3>h3</h3>']
                //             .map(textToBlockToken);
                //
                //         for (let i = 0; i <= 4; i++) {
                //             const result = formatStringToHtml(getTestCase(inputTokens, i + 1));
                //             expect(result.html).toEqual(getTestCase(outputTokens, i));
                //         }
                //     });
                //
                //     test('Should format line breaks between thematic breaks and plain text correctly', () => {
                //         const inputTokens = ['text', '# h1', 'text', '## h2', 'text', '### h3', 'text']
                //             .map(textToInlineToken);
                //         const outputTokens = ['text', '<h1>h1</h1>', 'text', '<h2>h2</h2>', 'text', '<h3>h3</h3>', 'text']
                //             .map((text) => text === 'text' ? textToInlineToken(text) : textToBlockToken(text));
                //
                //         for (let i = 1; i <= 4; i++) {
                //             const result = formatStringToHtml(getTestCase(inputTokens, i));
                //             expect(result.html).toEqual(getTestCase(outputTokens, i));
                //         }
                //     });
                // });

                // describe('Code Blocks', () => {
                //
                // });
                //
                // describe('Tables', () => {
                //
                // });
            });
        });
    });

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
