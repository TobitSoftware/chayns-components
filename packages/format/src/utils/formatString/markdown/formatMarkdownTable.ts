import { stringify } from 'csv-stringify/browser/esm/sync';
import { marked, Tokens } from 'marked';

export type TableObject = {
    id: string;
    raw: string;
    csv: string;
};

// TODO Implement all markdown parsing this way.
// This parses tables, that follow the Github-Flavored-Markdown specification.
export const parseMarkdownTables = (text: string) => {
    let newText = text;
    const tableTokens: Tokens.Table[] = [];

    // marked.parse parses all markdown in the provided text and returns the result.
    // The parsed result isn't needed. Instead, the parsed table tokens are collected.
    marked.parse(newText, {
        walkTokens: (token) => {
            if (token.type === 'table') {
                tableTokens.push(token as Tokens.Table);
            }
        },
    }) as string;

    const tables: TableObject[] = [];

    // The collected table tokens are used to replace the raw Markdown table with the corresponding bb-code table.
    // If the table was directly parsed to html, other markdown replacements within the table wouldn't work.
    tableTokens.forEach((tableToken, index) => {
        let tableHtml = '';
        const tableArray: string[][] = [];

        const id = `message-table-${index}`;

        tableHtml += `<table id="${id}">`;
        if (tableToken.header?.length > 0) {
            const rowArray: string[] = [];

            tableHtml += '<thead>';
            tableToken.header.forEach((header) => {
                rowArray.push(header.text);

                tableHtml += '<th>';
                tableHtml += header.text;
                tableHtml += '</th>';
            });
            tableHtml += '</thead>';

            tableArray.push(rowArray);
        }
        if (tableToken.rows?.length > 0) {
            tableHtml += '<tbody>';
            tableToken.rows.forEach((row) => {
                const rowArray: string[] = [];

                tableHtml += '<tr>';
                row.forEach((cell) => {
                    rowArray.push(cell.text);

                    tableHtml += '<td>';
                    tableHtml += cell.text;
                    tableHtml += '</td>';
                });
                tableHtml += '</tr>';

                tableArray.push(rowArray);
            });
            tableHtml += '</tbody>';
        }
        tableHtml += '</table>';

        const csv = stringify(tableArray || []);

        tables.push({
            id,
            raw: tableToken.raw,
            csv,
        });

        // This removes all trailing line breaks from the raw table Markdown, except for one.
        // This is done to ensure that the table HTML is followed by the correct number of line breaks.
        const trailingLineBreaksIndex = tableToken.raw.search(/\n+$/);
        const rawTableMarkdown =
            trailingLineBreaksIndex === -1
                ? tableToken.raw
                : tableToken.raw.slice(0, trailingLineBreaksIndex + 1);

        // Replaces the raw table + a leading line break with the table HTML.
        // The line break is removed to ensure, that the table context menu is displayed in the same line as the text before the table.
        const hasLeadingLineBreak = newText.includes(`\n${rawTableMarkdown}`);
        newText = newText.replace(
            `${hasLeadingLineBreak ? '\n' : ''}${rawTableMarkdown}`,
            tableHtml,
        );
    });

    return {
        html: newText,
        tables,
    };
};
