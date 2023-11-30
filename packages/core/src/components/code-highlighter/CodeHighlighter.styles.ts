import styled from 'styled-components';
import { CodeHighlighterTheme } from '../../types/codeHighlighter';
import type { WithTheme } from '../color-scheme-provider/ColorSchemeProvider';

type StyledCodeHighlighterProps = WithTheme<{
    codeTheme: CodeHighlighterTheme;
}>;

export const StyledCodeHighlighter = styled.div<StyledCodeHighlighterProps>`
  background-color: ${({ codeTheme }) =>
      codeTheme === CodeHighlighterTheme.Dark ? '#282c34' : '#fafafa'};
  border-radius: 8px;
  padding-bottom: 6px;

  pre {
    margin: 0 !important;

    // Styles for custom scrollbar
    &::-webkit-scrollbar {
      height: 5px;
    }

    &::-webkit-scrollbar-track {
      background-color: transparent;
    }

    &::-webkit-scrollbar-button {
      background-color: transparent;
      height: 2px;
    }

    &::-webkit-scrollbar-thumb {

      background-color: rgba(${({ codeTheme }) =>
          codeTheme === CodeHighlighterTheme.Dark ? '229, 229, 229' : '153, 153, 153'},
      1);
      border-radius: 20px;
    }

    // Scrollbar styles for Firefox. The above styles are not supported in Firefox, these styles are
    // only supported in Firefox:
    * {
      scrollbar-color: rgba(${({ codeTheme }) =>
          codeTheme === CodeHighlighterTheme.Dark ? '229, 229, 229' : '153, 153, 153'},
      1);)transparent;
      scrollbar-width: thin;
    }
  }
`;

type StyledCodeHighlighterHeaderProps = WithTheme<{
    codeTheme: CodeHighlighterTheme;
}>;

export const StyledCodeHighlighterHeader = styled.div<StyledCodeHighlighterHeaderProps>`
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid
        ${({ codeTheme }) => (codeTheme === CodeHighlighterTheme.Dark ? '#e5e5e5' : '#999999')};
    padding: 4px 12px;
`;

type StyledCodeHighlighterFileNameProps = WithTheme<{
    codeTheme: CodeHighlighterTheme;
}>;

export const StyledCodeHighlighterFileName = styled.span<StyledCodeHighlighterFileNameProps>`
    color: ${({ codeTheme }) => (codeTheme === CodeHighlighterTheme.Dark ? '#e5e5e5' : '#999999')};
`;
