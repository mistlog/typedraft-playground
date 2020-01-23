(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{244:function(e,t,a){e.exports=a(563)},554:function(e,t){},563:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),o=a(41),i=a.n(o),c=a(2);function l(){return r.a.createElement("div",{className:s.container},"TypeDraft Playground")}var s=Object(c.t)({container:{backgroundColor:"#294E80",border:"0px",padding:"10px",boxShadow:"3px 3px 5px rgba(0, 0, 0, 0.25)",color:"white",font:'normal 24px -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell,\n        "Fira Sans", "Droid Sans", "Helvetica Neue", Arial, sans-serif'}}),u=a(240),d=a(42),m=a(56),p=a(583),g=a(27),f=a(580);function h(e){var t=e.SetExample,a=e.examples,o=function(e){var t=[];return e.forEach(function(e,a){var n={name:a,url:"",isExpanded:!0,links:e.map(function(e){return{name:e.display,url:"",key:e.name}})};t.push(n)}),[{links:t}]}(a),i=a.values().next().value[0].name,c=Object(n.useState)(i),l=Object(d.a)(c,2),s=l[0],u=l[1];return r.a.createElement(f.a,{selectedKey:s,groups:o,styles:{root:{width:200,marginTop:-20}},onLinkClick:function(e,a){var n=a.key;n&&(t(n),u(n))}})}var v=a(241),x=a(237);function b(e){var t=e.GetOutput,a=e.GetExampleUrl,o=e.examples,i=o.values().next().value[0].name,c=Object(n.useRef)(),l=Object(n.useState)(""),s=Object(d.a)(l,2),f=s[0],b=s[1],E=Object(n.useState)(i),w=Object(d.a)(E,2),O=w[0],j=w[1],S=a(O),k=Object(n.useRef)("code");Object(n.useEffect)(function(){k&&(k.current=S.endsWith(".md.tsx")?"markdown":"code")},[S]);var C=Object(v.a)(S),T=Object(d.a)(C,1)[0].data;Object(n.useEffect)(function(){var e=T||"";c.current&&c.current.setValue(e);var a=t(e,k.current);b(a)},[T]);var D={minimap:{enabled:!1},scrollbar:{useShadows:!1}};return r.a.createElement("div",{className:y.container},r.a.createElement(h,{examples:o,SetExample:function(e){return j(e)}}),r.a.createElement(m.ControlledEditor,{width:"50%",editorDidMount:function(e,t){c.current=t,c.current.setValue(T||"")},language:"typescript",options:D,onChange:x(function(e){var a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",n=t(a,k.current);b(n)},1e3),loading:r.a.createElement(p.a,{size:g.a.large})}),r.a.createElement(m.ControlledEditor,{width:"50%",language:"typescript",options:Object(u.a)({},D,{readOnly:!0}),value:f,loading:r.a.createElement(p.a,{size:g.a.large})}))}m.monaco.init().then(function(e){e.languages.typescript.typescriptDefaults.setDiagnosticsOptions({noSemanticValidation:!0,noSyntaxValidation:!0})}).catch(function(e){return console.error("An error occurred during initialization of Monaco: ",e)});var y=Object(c.t)({container:{height:"100%",display:"flex"},markdown:{width:"50%",height:"100%",overflow:"auto",paddingLeft:15,paddingRight:15,fontSize:16}}),E=a(238);function w(e,t){try{return"code"===t?new E.Transcriber(e).Transcribe().replace(new RegExp("\n[ ]*;\n?","g"),"\n").replace(new RegExp("\n;","g"),"\n"):""}catch(a){return"".concat(a)}}function O(e){return"https://raw.githubusercontent.com/mistlog/files/master/typedraft-snippet/".concat(e)}var j=new Map([["Local Context",[{display:"Function",name:"local-context-function.tsx"},{display:"Class",name:"local-context-class.tsx"}]],["DSL",[{display:"Match",name:"dsl-match.tsx"}]],["Examples",[{display:"Huffman Tree",name:"huffman-tree.tsx"},{display:"Topological Sort",name:"topological-sort.tsx"},{display:"Transcriber",name:"transcriber.tsx"},{display:"Jack VM",name:"vm.tsx"}]]]);var S=Object(c.t)({container:{height:"100vh",display:"flex",flexDirection:"column",overflow:"hidden"},header:{height:"10vh"},editor:{height:"90vh",marginTop:16}}),k=a(581),C=a(584);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var T=a(239);Object(T.a)(),Object(c.u)({selectors:{":global(body), :global(html), :global(#root)":{margin:0,padding:0,height:"100vh",overflow:"auto"}}}),i.a.render(r.a.createElement(C.a,k.a,r.a.createElement(function(){return r.a.createElement("div",{className:S.container},r.a.createElement("div",{className:S.header},r.a.createElement(l,null)),r.a.createElement("div",{className:S.editor},r.a.createElement(b,{examples:j,GetOutput:w,GetExampleUrl:O})))},null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[244,1,2]]]);
//# sourceMappingURL=main.cadec220.chunk.js.map