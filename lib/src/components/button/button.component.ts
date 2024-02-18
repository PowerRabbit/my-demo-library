import { LitElement, html } from 'lit';
import { customElement, property  } from 'lit/decorators.js';
import styles from './button.style.scss';

@customElement('my-button')
export class MyDemoButton extends LitElement {
    static override styles = styles;

    @property()
        myType: 'button' | 'submit' | 'reset' | 'menu' = 'button';

    private onClick() {
        this.dispatchEvent(new CustomEvent('myclick'));
    }

    override render() {
        return html`
            <button type=${this.myType} @click=${this.onClick}><slot></slot></button>
    `;
    }
}
