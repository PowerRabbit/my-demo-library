import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import styles from './simple-accordion-item.style.scss';

@customElement('simple-accordion-item')
export class SimpleAccordionItem extends LitElement {
    static override styles = styles;

    @property({ type: Boolean, attribute: 'sa-open' })
        saOpen = false;

    protected override render() {
        return html`
            <details .open=${this.saOpen}>
                <summary>
                    <span><slot name="summary"></slot></span>
                </summary>
                <div class="content-wrapper">
                    <slot></slot>
                </div>
            </details>
        `;
    }
}
