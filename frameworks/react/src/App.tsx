import React, { DOMAttributes } from "react";
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
    return <div>
        <h1>Hi!</h1>

        <my-button myType="submit"></my-button>
    </div>
};

export default App;
