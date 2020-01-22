import React from 'react';
//@ts-ignore
import MathJax from "@matejmazur/react-mathjax";
//@ts-ignore
import RemarkMathPlugin from "remark-math";
import { Graphviz } from 'graphviz-react';
import { default as ReactMarkdown } from "react-markdown";
import { Prism as SyntaxHighlighter, } from "react-syntax-highlighter";
import { default as vs } from "react-syntax-highlighter/dist/esm/styles/prism/vs";
import { mergeStyleSets } from 'office-ui-fabric-react';

export function Markdown(props: { text: string })
{
    return (
        <MarkdownWithMath source={props.text} renderers={{
            code: CodeRenderer,
            heading: HeadingRenderer,
            text: TextRenderer
        }} />
    )
}
/**
 * @link {https://github.com/rexxars/react-markdown/issues/10#issuecomment-347763068}
 */
const MarkdownWithMath = (props: ReactMarkdown.ReactMarkdownProps) =>
{
    const newProps = {
        ...props,
        plugins: [
            RemarkMathPlugin,
        ],
        renderers: {
            ...props.renderers,
            math: (props: { value: string }) =>
                <MathJax.Node>{props.value}</MathJax.Node>,
            inlineMath: (props: { value: string }) =>
                <MathJax.Node inline>{props.value}</MathJax.Node>,
        }
    };
    return (
        <MathJax.Context input="tex">
            <ReactMarkdown {...newProps} />
        </MathJax.Context>
    );
};

/**
 * 
 */

export interface IText
{
    value: string
}

function TextRenderer(props: IText)
{
    const { value } = props;
    return <span className={classNames.text}>{value}</span>
}

/**
 * 
 */
export interface IHeading
{
    level: number;
    children: [{ props: { value: string } }];
}

function HeadingRenderer(props: IHeading)
{
    const text = props.children[0].props.value;
    const level = props.level;

    if (level === 1)
    {
        return <h1 className={classNames.h1}>{text}</h1>
    }
    else if (level === 2)
    {
        return <h2 className={classNames.h2}>{text}</h2>
    }
    return <h3 className={classNames.h3}>{text}</h3>
}

/**
 * 
 */
export interface ICode
{
    value: string;
    language: string;
}

class ErrorBoundary extends React.Component<{ value: string }, { hasError: boolean }>
{
    constructor(props: any)
    {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: any)
    {
        console.log(error);
        return { hasError: true };
    }

    componentDidCatch(error: any, errorInfo: any)
    {
        console.error(error, errorInfo)
    }

    render()
    {
        if (this.state.hasError)
        {
            return <h1>Something went wrong.</h1>;
        }

        return this.props.children;
    }
}

function CodeRenderer(props: ICode)
{
    const { value, language } = props;
    if (language === "dot")
    {
        return (
            <ErrorBoundary value={value}>
                <Graphviz
                    dot={value}
                    options={{
                        fit: false,
                        width: null,
                        height: null
                    }}
                />
            </ErrorBoundary>
        )
    }
    return WithSyntaxHighlight(props);
}

const theme = {
    ...vs,
    ...{
        comment: {
            color: "#008000",
            fontStyle: "normal"
        }
    }
}

function WithSyntaxHighlight(props: ICode)
{
    const { value, language } = props;
    return (
        <SyntaxHighlighter language={language} style={theme}>
            {value}
        </SyntaxHighlighter>
    )
}

/**
 * 
 */
const fontFamily = `-apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell,
"Fira Sans", "Droid Sans", "Helvetica Neue", Arial, sans-serif`;

const classNames = mergeStyleSets({
    h1: {
        fontFamily,
        fontSize: "1.4em",
        fontWeight: "500",
        color: "#000c"
    },
    h2: {
        fontFamily,
        fontSize: "1.3em",
        fontWeight: "400"
    },
    h3: {
        fontFamily,
        fontSize: "1.2em",
        fontWeight: "400",
        color: "#000c"
    },
    text: {
        fontFamily,
        fontSize: "1em"
    }
})