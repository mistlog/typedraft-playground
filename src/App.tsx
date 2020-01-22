import React from 'react';
import { Header } from "./component/Header";
import { Editor } from "./component/Editor";
import { mergeStyleSets } from 'office-ui-fabric-react';
import { Transcriber } from "typedraft";
import * as prettier from "prettier/standalone";
import * as TypescriptParser from "prettier/parser-typescript";
import { IExample } from "./component/ExampleNav";
import { CodeToMarkdown } from "source-view";

function GetOutput(input: string, mode: "markdown" | "code"): string
{
    try
    {
        if (mode === "code")
        {
            const code = new Transcriber(input).Transcribe();
            const output = prettier.format(code, {
                parser: "typescript",
                semi: false,
                plugins: [TypescriptParser]
            });
            return output;
        }
        else
        {
            const markdown = CodeToMarkdown(input);
            return markdown;
        }
    }
    catch (error)
    {
        return `${error}`;
    }
}

function GetExampleUrl(example: string)
{
    return `https://raw.githubusercontent.com/mistlog/files/master/typedraft-snippet/${example}`;
}

const examples = new Map<string, Array<IExample>>([
    ["Local Context", [
        { display: "Function", name: "local-context-function.tsx" },
        { display: "Class", name: "local-context-class.tsx" }
    ]],
    ["DSL", [
        { display: "Match", name: "dsl-match.tsx" }
    ]],
    ["Examples", [
        { display: "Huffman Tree", name: "huffman-tree.tsx" },
        { display: "Topological Sort", name: "topological-sort.tsx" },
        { display: "Transcriber", name: "transcriber.tsx" },
        { display: "Jack VM", name: "vm.tsx" }
    ]]
]);

export function App()
{
    return (
        <div className={classNames.container}>
            <div className={classNames.header}>
                <Header />
            </div>
            <div className={classNames.editor}>
                <Editor examples={examples} GetOutput={GetOutput} GetExampleUrl={GetExampleUrl} />
            </div>
        </div>
    );
};

const classNames = mergeStyleSets({
    container: {
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden"
    },
    header: {
        height: "10vh"
    },
    editor: {
        height: "90vh",
        marginTop: 16
    }
})