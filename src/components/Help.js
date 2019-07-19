import React from "react";
import Markdown from "./Markdown";

const help = `
<img src="icons/192.png" style="width: 50%;margin:0 auto 20px;display:block;max-width:256px"/>

__MAPP__ is a simple starter app for creating leaflet based PWAs.

Built by Daniel Schep ([dschep@gmail.com](mailto:dschep@gmail.com), [@schep_](https://twitter.com/schep_))
`;

const Help = () => <Markdown>{help}</Markdown>;

export default Help;
