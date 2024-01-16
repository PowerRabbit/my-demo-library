import { LitElement, html } from 'lit';
import { customElement, property  } from 'lit/decorators.js';
import styles from './button.style.scss';

@customElement('my-button')
export class MyElement extends LitElement {
    static override styles = styles;

    @property()
        myType: 'button' | 'submit' | 'reset' | 'menu' = 'button';

    override render() {
        return html`
            <button type=${this.myType} @click=${() => {alert('Hey!');}}>Hej med jer!</button>
    `;
    }
}
