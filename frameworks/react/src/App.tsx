import React, { DOMAttributes, useEffect, useRef } from "react";
import 'my-lib-demo';
import { MyDemoButton } from 'my-lib-demo';

type CustomElement<T> = Partial<T & DOMAttributes<T> & { myType: string }>;


declare global {
    namespace JSX {
        interface IntrinsicElements {
            'my-button': CustomElement<MyDemoButton>;
        }
    }
}

const App: React.FC = () => {

    const demoButton = useRef<MyDemoButton>(null);

    useEffect(() => {

        const button = demoButton.current;

        if (button) {
            // add listener
        }

        return () => {
            if (button) {
                // remove listener
            }
        }
    });

    return <div>
        <h1>Hi!</h1>

        <my-button myType="submit"></my-button>
    </div>
};

export default App;
