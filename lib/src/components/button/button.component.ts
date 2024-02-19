import { LitElement, html } from 'lit';
import { customElement, property  } from 'lit/decorators.js';
import styles from './button.style.scss';
import { ifDefined } from 'lit/directives/if-defined.js';

@customElement('my-button')
export class MyDemoButton extends LitElement {
    static override styles = styles;

    @property()
        myType: 'button' | 'submit' | 'reset' | 'menu' = 'button';

    @property({ type: String, attribute: 'my-aria-label' })
        myAriaLabel?: string;

    private onClick() {
        this.dispatchEvent(new CustomEvent('myclick'));
    }

    override render() {
        return html`
            <button type=${this.myType} @click=${this.onClick} aria-label=${ifDefined(this.myAriaLabel)}><slot></slot></button>
    `;
    }
}
