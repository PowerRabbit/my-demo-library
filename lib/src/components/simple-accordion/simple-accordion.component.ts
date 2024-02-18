import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import styles from './simple-accordion.style.scss';

@customElement('simple-accordion')
export class SimpleAccordion extends LitElement {
    static override styles = styles;

    protected override render() {
        return html`
            <div>
                <slot></slot>
            </div>
        `;
    }
}
