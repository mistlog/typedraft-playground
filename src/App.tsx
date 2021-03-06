import React from 'react';
import { Header } from "./component/Header";
import { Editor } from "./component/Editor";
import { mergeStyleSets } from 'office-ui-fabric-react';
import { MakeDefaultTranscriber } from "typedraft";
import { IExample } from "./component/ExampleNav";
import { PatternMatch } from "draft-dsl-match";

function GetOutput(input: string, mode: "markdown" | "code"): string
{
    try
    {
        if (mode === "code")
        {
            const transcriber = MakeDefaultTranscriber(input);
            transcriber.AddDSL("match", new PatternMatch());

            const code = transcriber.Transcribe();
            return code;
        }

        return "";
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
    ["Macro", [
        { display: "Basic", name: "macro-function.tsx" },
        { display: "Nested", name: "macro-nested.tsx" },
        { display: "Class", name: "macro-class.tsx" },
    ]],
    ["DSL", [
        { display: "Match", name: "dsl-match.tsx" }
    ]],
    // ["Examples", [
    //     { display: "Huffman Tree", name: "huffman-tree.tsx" },
    //     { display: "Topological Sort", name: "topological-sort.tsx" },
    //     { display: "Polynomial Addition", name: "polynomial-addition.tsx" },
    //     { display: "Transcriber", name: "transcriber.tsx" },
    //     { display: "Jack VM", name: "vm.tsx" }
    // ]]
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