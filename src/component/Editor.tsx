import React, { useState, useEffect, useRef } from 'react';
import { monaco, ControlledEditor as MonacoEditor } from '@monaco-editor/react';
import { mergeStyleSets, SpinnerSize, Spinner } from 'office-ui-fabric-react';
import { ExampleNav, Examples, IExample } from './ExampleNav';
import * as EditorAPI from 'monaco-editor/esm/vs/editor/editor.api';
import { default as useAxios } from "axios-hooks";
//@ts-ignore
import * as debounce from "lodash.debounce";

monaco.init()
    .then(monaco =>
    {
        monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
            noSemanticValidation: true,
            noSyntaxValidation: true
        });

        monaco.languages.registerDocumentFormattingEditProvider("typescript", {
            async provideDocumentFormattingEdits(model, options, token)
            {
                return [{
                    text: await FormatCode(model.getValue()),
                    range: model.getFullModelRange()
                }];
            }
        });

    })
    .catch(error => console.error('An error occurred during initialization of Monaco: ', error));

export interface IEditorProps
{
    GetOutput:(code: string, mode: "markdown" | "code") => Promise<string>;
    GetExampleUrl: (name: string) => string;
    examples: Examples;
}

export function Editor(props: IEditorProps)
{
    //
    const { GetOutput, GetExampleUrl, examples } = props;
    const default_example = (examples.values().next().value as Array<IExample>)[0].name;
    //
    const input_ref = useRef<EditorAPI.editor.IStandaloneCodeEditor>();
    const [output, setOutput] = useState("");
    const [example, setExample] = useState(default_example);

    //
    const url = GetExampleUrl(example);

    //
    const mode_ref = useRef<"markdown" | "code">("code");

    useEffect(() =>
    {
        if (mode_ref)
        {
            mode_ref.current = url.endsWith(".md.tsx") ? "markdown" : "code"
        }
    }, [url])

    //
    const [{ data }] = useAxios<string>(url)

    //
    useEffect(() =>
    {
        async function ResetInput()
        {
            // use set value instead of setInput to avoid "select all" state after setInput
            const default_input = data ? await FormatCode(data) : "";
            input_ref.current && input_ref.current.setValue(default_input);
            const output = await GetOutput(default_input, mode_ref.current);
            setOutput(output);
        }

        ResetInput();

    }, [data]);

    const options: EditorAPI.editor.IEditorOptions = {
        minimap: { enabled: false },
        scrollbar: { useShadows: false }
    };

    //
    return (
        <div className={classNames.container}>

            <ExampleNav examples={examples} SetExample={name => setExample(name)} />

            <MonacoEditor
                width="50%"
                editorDidMount={(_, editor) =>
                {
                    input_ref.current = editor;
                }}
                language="typescript"
                options={options}
                onChange={debounce(async (event: any, value: string = "") =>
                {
                    const output = await GetOutput(value, mode_ref.current);
                    setOutput(output);
                }, 1000)}
                loading={<Spinner size={SpinnerSize.large} />}
            />

            <MonacoEditor
                width="50%"
                language="typescript"
                options={{ ...options, readOnly: true }}
                value={output}
                loading={<Spinner size={SpinnerSize.large} />}
            />

        </div>
    )
}

export async function FormatCode(output: string)
{
    const prettier = await import("prettier/standalone");
    const ts_parser = await import("prettier/parser-typescript");

    const formatted = prettier.format(output, {
        parser: "typescript",
        plugins: [ts_parser]
    })

    return formatted;
}
/**
 * 
 */
const classNames = mergeStyleSets({
    container: {
        height: "100%",
        display: "flex"
    },
    markdown: {
        width: "50%",
        height: "100%",
        overflow: "auto",
        paddingLeft: 15,
        paddingRight: 15,
        fontSize: 16
    }
})