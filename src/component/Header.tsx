import React from 'react';
import { mergeStyleSets } from 'office-ui-fabric-react';

export function Header()
{
    return (
        <div className={classNames.container}>
            TypeDraft Playground
        </div>
    )
}

const classNames = mergeStyleSets({
    container: {
        backgroundColor: "#294E80",
        border: "0px",
        padding: "10px",
        boxShadow: "3px 3px 5px rgba(0, 0, 0, 0.25)",
        color: "white",
        font: `normal 24px -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell,
        "Fira Sans", "Droid Sans", "Helvetica Neue", Arial, sans-serif`
    }
})