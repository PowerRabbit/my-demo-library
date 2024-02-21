import React, { DOMAttributes, useEffect, useRef, useState } from "react";
import 'my-lib-demo';
import { MyDemoButton, SimpleDialog } from "my-lib-demo";
import { createComponent } from '@lit/react';

type CustomEvents<K extends string> = { [key in K] : (event: CustomEvent) => void };
type CustomElement<T, K extends string = ''> = Partial<T & DOMAttributes<T> & { children: any } & CustomEvents<`on${K}`>>;


interface MyElement extends HTMLElement {
    ref: React.MutableRefObject<HTMLElement>;
}

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'my-button': CustomElement<MyElement, 'closeChange' | 'openChange'>;
            'simple-toggle': CustomElement<HTMLElement>;
            'simple-dialog': CustomElement<MyElement>;
            'simple-calendar': CustomElement<HTMLElement>;
            'simple-accordion': CustomElement<HTMLElement>;
            'simple-accordion-item': CustomElement<HTMLElement>;
        }
    }
}

const MyButtonComponent = createComponent({
    tagName: 'my-button',
    elementClass: MyDemoButton,
    react: React,
    events: {
      'onmyclick': 'myclick',
    },
});
const SimpleDialogComponent = createComponent({
    tagName: 'simple-dialog',
    elementClass: SimpleDialog,
    react: React,
    events: {
        'onSimpleDialogClosed': 'simpleDialogClosed',
    },
});

const App: React.FC = () => {

    const demoButtonRef = useRef<MyDemoButton>(null);
    const atomicDesignDialogRef = useRef<SimpleDialog>(null);

    const [calendarVisible, setCalendarVisible] = useState(false);
    const [locale, setLocale] = useState('en-US');

    const darkTheme = useRef(false);

    const toggleTheme = () => {
        darkTheme.current = !darkTheme.current;
        if (darkTheme.current) {
            document.documentElement.setAttribute('data-theme-dark', '');
        } else {
            document.documentElement.removeAttribute('data-theme-dark');
        }
    }

    useEffect(() => {
        const demoButton = demoButtonRef.current;
        const listener = () => {
            if (atomicDesignDialogRef.current) {
                atomicDesignDialogRef.current.isOpen = !atomicDesignDialogRef.current.isOpen;
            }
        }

        if (demoButton) {
            demoButton.addEventListener('myclick', listener);
        }

        return () => {
            if (demoButton) {
                demoButton.removeEventListener('myclick', listener);
            }
        }
    });

    return <>
    <header>
    <h1>Custom Elements in an React application</h1>
    <img src="./logo512.png" alt="React logo" className="logo" />
    <p><label id="themeSwitch"><sup>Theme</sup>Switch</label> between <mark>light</mark> <simple-toggle simple-external-label-id="themeSwitch"></simple-toggle> <mark>dark</mark>.</p>
</header>
<main>
    <section>
        <header>
            <h2>The near future of application development</h2>
            <p>Custom Elements. Internationalisation. Accessibility.</p>
        </header>
        <aside>
            <h3>Custom elements</h3>
            <p>HTML elements whose behavior is defined by the web developer, that extend the set of elements available in the browser.</p>
            {/* Works with React ref */}
            <my-button ref={demoButtonRef}>Atomic design</my-button>
            <simple-dialog ref={atomicDesignDialogRef}>
                <div slot="dialog-header">
                    <h2>What is Atomic Design</h2>
                </div>
                <p>Atomic design is methodology for creating design systems.<br />
                There are five distinct levels in atomic design:</p>
                <simple-accordion>
                    <simple-accordion-item>
                        <div slot="summary">Atoms</div>
                        <p>Atoms are the basic building blocks of matter. Applied to web interfaces, atoms are our HTML tags, such as a form label, an input or a button.</p>
                        <p>Atoms can also include more abstract elements like color palettes, fonts and even more invisible aspects of an interface like animations.</p>
                        <p>Like atoms in nature they’re fairly abstract and often not terribly useful on their own. However, they’re good as a reference in the context of a pattern library as you can see all your global styles laid out at a glance.</p>
                    </simple-accordion-item>
                    <simple-accordion-item>
                        <div slot="summary">Molecules</div>
                        <p>Things start getting more interesting and tangible when we start combining atoms together. Molecules are groups of atoms bonded together and are the smallest fundamental units of a compound. These molecules take on their own properties and serve as the backbone of our design systems.</p>
                        <p>For example, a form label, input or button aren’t too useful by themselves, but combine them together as a form and now they can actually do something together.</p>
                        <p>Building up to molecules from atoms encourages a “do one thing and do it well” mentality. While molecules can be complex, as a rule of thumb they are relatively simple combinations of atoms built for reuse.</p>
                    </simple-accordion-item>
                    <simple-accordion-item>
                        <div slot="summary">Organisms</div>
                        <p>Organisms are groups of molecules joined together to form a relatively complex, distinct section of an interface.</p>
                        <p>Organisms can consist of similar and/or different molecule types. For example, a masthead organism might consist of diverse components like a logo, primary navigation, search form, and list of social media channels. But a “product grid” organism might consist of the same molecule (possibly containing a product image, product title and price) repeated over and over again.</p>
                        <p>Building up from molecules to organisms encourages creating standalone, portable, reusable components.</p>
                    </simple-accordion-item>
                    <simple-accordion-item>
                        <div slot="summary">Templates</div>
                        <p>At the template stage, we break our chemistry analogy to get into language that makes more sense to our clients and our final output. Templates consist mostly of groups of organisms stitched together to form pages. It’s here where we start to see the design coming together and start seeing things like layout in action.</p>
                    </simple-accordion-item>
                    <simple-accordion-item>
                        <div slot="summary">Pages</div>
                        <p>Pages are specific instances of templates. Here, placeholder content is replaced with real representative content to give an accurate depiction of what a user will ultimately see.</p>
                    </simple-accordion-item>
                </simple-accordion>
            </simple-dialog>
        </aside>
        <aside>
            <h3>Internationalisation</h3>
            <p>The ECMAScript 2024 Internationalization API Specification, provides key language sensitive functionality, which has been selected from that of well-established internationalization APIs.</p>

            {/* Works with CreateComponent from lit/react */}
            <MyButtonComponent onmyclick={() => setCalendarVisible(true)}>Calendar</MyButtonComponent>
            <SimpleDialogComponent
                isOpen={calendarVisible}
                onSimpleDialogClosed={() => setCalendarVisible(false)}
                sd-aria-label="Internationalised calendar"
               >
                <div slot="dialog-header">
                    <select onChange={(e) => setLocale(e.target.value)}>
                        <option value="en-US">USA</option>
                        <option value="en-GB">Great Britain</option>
                        <option value="fr-FR">France</option>
                        <option value="da-DK">Denmark</option>
                        <option value="ja-JP">Japan</option>
                        <option value="ar-SA">Saudi Arabia</option>
                        <option value="bg-BG">Bulgaria</option>
                        <option value="sw-KE">Kenia (Swahili)</option>
                    </select>
                </div>
                <div>
                    <simple-calendar sc-locale={locale}></simple-calendar>
                </div>
            </SimpleDialogComponent>
        </aside>
        <aside>
            <h3>Accessibility</h3>
            <p>The Web is fundamentally designed to work for all people, whatever their hardware, software, language, location, or ability. When the Web meets this goal, it is accessible to people with a diverse range of hearing, movement, sight, and cognitive ability.</p>
            <p>
                <a href="https://www.w3.org/TR/WCAG22/" target="_blank" aria-describedby="outerLinkDescription" rel="noreferrer">WCAG 2.2 ↗</a>
            </p>
        </aside>
    </section>
    <hr />
    <section>
        <blockquote>
            "Custom elements are the building blocks of innovation, allowing creativity to take shape in the digital world."
            <footer><i>- YourChat</i></footer>
        </blockquote>
    </section>
</main>
<footer>
    <hr />
    <p>
        TypeScript Live: CPH, 6 March 2024.
    </p>
    <div hidden id="outerLinkDescription">Link opens in a new tab.</div>
</footer>

</>
};

export default App;
