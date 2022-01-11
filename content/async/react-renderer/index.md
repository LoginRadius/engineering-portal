---
title: "React renderers, react everywhere?"
date: "2021-06-23"
coverImage: "react.png"
author: "Abhimanyu Singh Rathore"
description: "There is an advanced feature of React is that it can write renderers for multiple different env."
tags: ["JavaScript", "React", "Renderer"]
---


There is an advanced feature of React that it can write renderers for multiple different env. Let discuss a few of them.


## [React-Figma](https://github.com/react-figma/react-figma "React-Figma")

This is a Renderer for Figma. It can use React components as a design source.


Sample code with react-figma:

```JS
import * as React from 'react';
import { Page, View, Text } from 'react-figma';

export const App = () => {
    return (
        <Page name="My Resume" isCurrent>
            <View>
                <View style={{ width: 200, height: 100, backgroundColor: '#dd423a' }} />                <Text style={{ color: 'white' }}>Hi, There</Text>
            </View>
        </Page>
    );
};
```

Nowadays, Figma is the most popular design tool,  similar renderers available as well: `react-sketchapp` for Sketch, `react-x`d for Adobe XD.

## [React Hardware](https://github.com/iamdustan/react-hardware "React Hardware")

A device like Arduino can be operated by React components. 


Let's checkout demo code :

```JS
import React from 'react';
import ReactHardware, {Led} from 'react-hardware';

const App = () => {
  const [ledStage, setLedStage] = useState(false);

  useEffect(() => {
    setInterval(() => {
      setLedStage(prev => !prev);
    }, 2000);
  }, []);

  return <Led pin={13} value={ledStage ? 255 : 0} />
}
const PORT = 'dev/tty.usbmodem1411';
ReactHardware.render(<App />, PORT);
```

## [Ink](https://github.com/vadimdemedes/ink "Ink")

Another React solution for CLIs. It allows you to run, build and test your CLI output through components:


The code of the demo:

```JS
const Raiser = () => {
  const [i, setI] = useState(0);

  useEffect(() => {
    setInterval(() => {
      setI(prev => prev + 1);
    }, 200);
  }, []);

  return <Color>
    Increased by {i} 
	</Color>;
}
```

Ink is a popular one that is used by libraries such a Gatsby, Parcel, Yarn 2, etc.
`react-blessed` is one of the similar libraries.


##  [react-three-fiber](https://github.com/pmndrs/react-three-fiber "react-three-fiber")

This is a great  React renderer for threejs on the react-native and web.

Let's see a sample code:

```JS
import ReactDOM from 'react-dom'
import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from 'react-three-fiber'

function MyFrame(props) {
  const Ref = useRef()
  const [hover, setOnHover] = useState(false)
  const [enable, setEnable] = useState(false)

  useFrame(() => (Ref.current.rotation.x = Ref.current.rotation.y += 0.01))

  return (
    <Ref
      {...props}
      ref={Ref}
      scale={enable ? [1.5, 1.5, 1.5] : [1, 1, 1]}
      onClick={(e) => setEnable(!enable)}
      onPointerOver={(e) => setOnHover(true)}
      onPointerOut={(e) => setOnHover(false)}>
      <boxBufferGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hover ? 'hotpink' : 'orange'} />
    </Ref>
  )
}

ReactDOM.render(
  <Canvas>
    <pointLight position={[10, 10, 10]} />
    <MyFrame position={[-3.2, 0, 0]} />
    <MyFrame position={[2.2, 0, 0]} />
  </Canvas>,
  document.getElementById('root')
)
```

The library has a great ecosystem along with packages such as `react-three-flex` ,`react-xr`, `react-postprocessing` , etc.

## [react-nil](https://github.com/pmndrs/react-nil "react-nil")

A renderer for React that render nothing.

```JS
import React, { useState, useEffect } from "react"
import { render } from "react-nil"
function MyComponent() {
  const [active, set] = useState(false)
  useEffect(() => void setInterval(() => set((active) => !active), 1000), [])
  return null
}

render(<MyComponent />)
```

It provides you kind of high-level abstraction to Node.

##  [react-docx](https://github.com/Jeday/react-docx "react-docx")
Another reconciler for DOCX.js. 

Let's understand with a sample code:

```JS
renderAsyncDocument(
  <section>
    <paragraph heading={Docx.HeadingLevel.HEADING_1}>
      This is a sample paragraph with paragraph tag
    </paragraph>
    <p>      This is a sample paragraph with P tag</p>
    <p>
      <t>this is for textrun</t>
    </p>
    <p>
      <img
        src="base64...."
        width={200}
        height={200}
      />
      <href
        src="http://localhost:8080"
        label={"image n links label"}
      />
    </p>
    <Component text="can try componets in this way of course, like react!">
    </Component>
  </section>
).then((doc) => console.log(doc));
```
Also, you can checkout  `react-pdf` and `redocx` for a similar purpose.

Can visit this [Github Repo](https://github.com/chentsulin/awesome-react-renderer "Github Repo") for a curated list of react renderers.

 
