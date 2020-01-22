import React, { useState } from 'react';
import { Nav, INavLinkGroup, INavLink } from 'office-ui-fabric-react';

export type Examples = Map<string, Array<IExample>>;

export interface IExample
{
    name: string;
    display: string;
}

export interface IExampleNav
{
    SetExample: (name: string) => void;
    examples: Examples;
}

export function ExampleNav(props: IExampleNav)
{
    const { SetExample, examples } = props;
    const groups = CreateGroupsFromExamples(examples);
    const default_key = (examples.values().next().value as Array<IExample>)[0].name;
    const [selected, setSelected] = useState(default_key);
    return (
        <Nav
            selectedKey={selected}
            groups={groups}
            styles={{ root: { width: 200, marginTop: -20 } }}
            onLinkClick={(_, item) =>
            {
                const name = item!.key!;
                SetExample(name);
                setSelected(name);
            }}
        />
    )
}

/**
 * 
 */
function CreateGroupsFromExamples(examples: Examples): Array<INavLinkGroup>
{
    //
    const links: Array<INavLink> = [];
    examples.forEach((examples, group_name) =>
    {
        const link: INavLink = {
            name: group_name,
            url: "",
            isExpanded: true,
            links: examples.map(example => ({ name: example.display, url: "", key: example.name }))
        }

        links.push(link);
    })

    //
    const groups: Array<INavLinkGroup> = [{ links }];
    return groups;
}
