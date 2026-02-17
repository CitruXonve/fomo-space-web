import Markdown from "react-markdown";
import { InlineDots } from "../Spinner";

const blockAsSpan =
  (className: string) => (props: { children?: React.ReactNode }) => (
    <span className={className}>{props.children}</span>
  );

/** Normalize markdown so headings after <br/> parse correctly (need newlines) */
function normalizeMarkdownForHeadings(text: string): string {
  return text.replace(/(<br\s*\/?>)\s*(#{1,6}\s)/gi, "\n\n$2");
}

export const MarkdownRenderer = ({
  markdownText,
  showDots = false,
  inline = false,
}: {
  markdownText: string;
  showDots: boolean;
  inline?: boolean;
}) => {
  const flashingDots = InlineDots();
  return (
    <Markdown
      components={{
        p: inline
          ? blockAsSpan("mb-2")
          : ({ children }) => <p className="mb-2">{children}</p>,
        h1: inline
          ? blockAsSpan("block text-xl font-bold my-2")
          : ({ children }) => (
              <h1 className="text-xl font-bold my-2">{children}</h1>
            ),
        h2: inline
          ? blockAsSpan("block text-lg font-semibold my-2")
          : ({ children }) => (
              <h2 className="text-lg font-semibold my-2">{children}</h2>
            ),
        h3: inline
          ? blockAsSpan("block text-base font-semibold my-2")
          : ({ children }) => (
              <h3 className="text-base font-semibold my-2">{children}</h3>
            ),
        strong: ({ children }) => (
          <strong className="font-bold text-gray-900 dark:text-white">
            {children}
          </strong>
        ),
        em: ({ children }) => (
          <em className="italic text-gray-700 dark:text-white">{children}</em>
        ),
        ul: inline
          ? blockAsSpan("list-disc list-inside mb-2")
          : ({ children }) => (
              <ul className="list-disc list-inside mb-2">{children}</ul>
            ),
        ol: inline
          ? blockAsSpan("list-decimal list-inside mb-2")
          : ({ children }) => (
              <ol className="list-decimal list-inside mb-2">{children}</ol>
            ),
        li: ({ children }) => <li className="mb-1">{children}</li>,
        code: ({ inline, children, ...props }: any) =>
          inline ? (
            <code className="bg-gray-200 px-1 rounded text-xs" {...props}>
              {children}
            </code>
          ) : (
            <code
              className="inline bg-gray-800 text-white p-1 rounded my-1 overflow-x-auto text-xs"
              {...props}
            >
              {children}
            </code>
          ),
        a: ({ children, href }) => (
          <a
            href={href}
            className="text-blue-600 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {children}
          </a>
        ),
        /* blockAsSpan won't work for <blockquote> */
        blockquote: ({ children }) => (
          <blockquote className="border-l-4 border-gray-400 pl-4 italic my-2">
            {children}
          </blockquote>
        ),
        /* blockAsSpan won't work for <pre> */
        pre: ({ children }) => (
          <pre className="bg-gray-800 text-white p-2 rounded my-2 overflow-x-auto text-xs">
            {children}
          </pre>
        ),
        br: () => <br className="block my-2" />,
      }}
    >
      {/* avoid conditional hook usage inside JSX at the risk of internal React warnings */}
      {showDots
        ? normalizeMarkdownForHeadings(markdownText) + "&nbsp;" + flashingDots
        : normalizeMarkdownForHeadings(markdownText)}
    </Markdown>
  );
};
