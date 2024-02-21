<script setup lang="ts">
import { ref } from 'vue';
import 'my-lib-demo';

    const darkTheme = ref(false);
    const atomicDesignDialogOpen = ref(false);
    const calendarDialogOpen = ref(false);
    const locale = ref('en-US');

    function toggleTheme() {
        darkTheme.value = !darkTheme.value;
        if (darkTheme.value) {
            document.documentElement.setAttribute('data-theme-dark', '');
        } else {
            document.documentElement.removeAttribute('data-theme-dark');
        }
    }

    function openAtomicDesign() {
        atomicDesignDialogOpen.value = !atomicDesignDialogOpen.value;
    }

    function openCalendar() {
        calendarDialogOpen.value = !calendarDialogOpen.value;
    }

    function changeLocale(e: Event) {
        locale.value = (e.target as HTMLInputElement).value;
    }

</script>

<template>
    <header>
    <h1>Custom Elements in Vue application</h1>
    <svg class="logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 261.76 226.69"><path d="M161.096.001l-30.225 52.351L100.647.001H-.005l130.877 226.688L261.749.001z" fill="#41b883"/><path d="M161.096.001l-30.225 52.351L100.647.001H52.346l78.526 136.01L209.398.001z" fill="#34495e"/></svg>

    <p><label id="themeSwitch"><sup>Theme</sup>Switch</label> between <mark>light</mark> <simple-toggle :simple-checked="darkTheme ? '' : null" @simpleChange="toggleTheme()" simple-external-label-id="themeSwitch"></simple-toggle> <mark>dark</mark>.</p>
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
            <my-button @myclick="openAtomicDesign()">Atomic design</my-button>
            <simple-dialog
                @simpleDialogClosed="atomicDesignDialogOpen = false"
                :sd-is-open="atomicDesignDialogOpen ? '' : null">
                <div slot="dialog-header">
                    <h2>What is Atomic Design</h2>
                </div>
                <p>Atomic design is methodology for creating design systems.<br>
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
            <my-button @myclick="openCalendar()">Calendar</my-button>
            <simple-dialog
                @simpleDialogClosed="calendarDialogOpen = false"
                sd-aria-label="Internationalised calendar"
                :sd-is-open="calendarDialogOpen ? '' : null">
                <div slot="dialog-header">
                    <select @change="changeLocale($event)">
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
                    <simple-calendar :sc-locale="locale"></simple-calendar>
                </div>
            </simple-dialog>
        </aside>
        <aside>
            <h3>Accessibility</h3>
            <p>The Web is fundamentally designed to work for all people, whatever their hardware, software, language, location, or ability. When the Web meets this goal, it is accessible to people with a diverse range of hearing, movement, sight, and cognitive ability.</p>
            <p>
                <a href="https://www.w3.org/TR/WCAG22/" target="_blank" aria-describedby="outerLinkDescription">WCAG 2.2 ↗</a>
            </p>
        </aside>
    </section>
    <hr>
    <section>
        <blockquote>
            "Custom elements are the building blocks of innovation, allowing creativity to take shape in the digital world."
            <footer><i>- YourChat</i></footer>
        </blockquote>
    </section>
</main>
<footer>
    <hr>
    <p>
        TypeScript Live: CPH, 6 March 2024.
    </p>
    <div hidden id="outerLinkDescription">Link opens in a new tab.</div>
</footer>

</template>

<style scoped>

body>div header {
    padding-top: 3rem;
}

.logo {
    height: 200px;
}

#themeSwitch {
    display: inline-block;
}

simple-toggle {
    margin: 0 0.5rem;
}

</style>
