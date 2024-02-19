import { LitElement, html } from 'lit';
import { customElement, property  } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import styles from './toggle.style.scss';

export const simpleChange = 'simpleChange';

@customElement('simple-toggle')
export class SimpleToggle extends LitElement {
    static override styles = styles;

    @property({ type: String, attribute: 'simple-external-label-id' })
        simpleExternalLabelId?: string;

    @property({ type: String, attribute: 'simple-title' })
        simpleTitle?: string;

    @property({ type: String, attribute: 'simple-aria-label' })
        simpleAriaLabel?: string = 'Toggle';

    @property({ type: String, attribute: 'simple-aria-describedby' })
        simpleAriaDescribedBy?: string;

    @property({ type: String, attribute: 'simple-aria-labelledby' })
        simpleAriaLabelledBy?: string;

    @property({ type: Boolean, attribute: 'simple-checked' })
        simpleChecked = false;

    @property({ type: Boolean, attribute: 'simple-disabled' })
        simpleDisabled = false;

    private outerLabel: HTMLLabelElement | null = null;
    private uniqueId = `my${(Math.random() + 1).toString(36).substring(7)}`;

    private handleLabelClick = (e: Event) => {
        if (e.target !== this) {
            this.click();
        }
    };

    private onValueChanged(e: Event) {
        this.dispatchEvent(new CustomEvent(simpleChange, {
            detail: (e.target as HTMLInputElement).checked,
        }));
    }

    private setAuxiliaryDescription() {
        const toggleAuxiliary = this.shadowRoot?.querySelector(`#${this.uniqueId}`);
        let outerIds: string[] = [];

        if (toggleAuxiliary) {
            if (this.simpleAriaDescribedBy) {
                outerIds = outerIds.concat(this.simpleAriaDescribedBy.split(' '));
            }
            if (this.simpleAriaLabelledBy) {
                outerIds = outerIds.concat(this.simpleAriaLabelledBy.split(' '));
            }
            outerIds.forEach(id => {
                const idElement = this.getExternalElementById(id);
                if (idElement) {
                    const clone = idElement.cloneNode(true) as HTMLElement;
                    clone.setAttribute('id', `${id}_${this.uniqueId}`);
                    toggleAuxiliary.appendChild(clone);
                }
            });
        }
    }

    private makeIdsUnique(ids?: string): string | undefined {
        if (ids) {
            return ids.split(' ').map(id => `${id}_${this.uniqueId}`).join(' ');
        }
        return undefined;
    }

    private getExternalElementById<T = HTMLElement>(id: string): T | null {
        if (this.parentNode?.nodeType === 11) {
            return (this.parentNode as DocumentFragment).getElementById(id) as T;
        }
        return  document.getElementById(id) as T;
    }

    override connectedCallback(): void {
        super.connectedCallback();
        this.addEventListener('click', () => {
            const input = this.shadowRoot!.querySelector('input') as HTMLInputElement;
            input.classList.add('no-focus-visible');
            input.focus();
            input.click();
        });

        if (this.simpleExternalLabelId) {
            this.outerLabel = this.getExternalElementById(this.simpleExternalLabelId);
            const labelIds = (this.simpleAriaLabelledBy || '').split('');
            labelIds.unshift(this.simpleExternalLabelId);
            this.simpleAriaLabelledBy = labelIds.join(' ');
        } else {
            this.outerLabel = this.closest('label') as HTMLLabelElement;
            if (this.outerLabel && !this.simpleAriaLabel) {
                const labelText = this.outerLabel.innerText;
                if (labelText) {
                    this.simpleAriaLabel = labelText;
                }
            }
        }
        if (this.outerLabel) {
            this.outerLabel.addEventListener('click', this.handleLabelClick);
        }
    }

    override disconnectedCallback(): void {
        if (this.outerLabel) {
            this.outerLabel.removeEventListener('click', this.handleLabelClick);
        }
    }

    protected override firstUpdated(): void {
        const input = this.shadowRoot!.querySelector('input') as HTMLInputElement;
        input.addEventListener('click', (e: Event) => {
            e.stopImmediatePropagation();
        });
        input.addEventListener('blur', () => {
            input.classList.remove('no-focus-visible');
        });
        this.setAuxiliaryDescription();
    }

    protected override render() {
        return html`
            <div class="switch">
                <input type="checkbox"
                       title=${ifDefined(this.simpleTitle)}
                       aria-label=${ifDefined(this.simpleAriaLabel)}
                       aria-labelledby=${ifDefined(this.makeIdsUnique(this.simpleAriaLabelledBy))}
                       .checked=${this.simpleChecked}
                       .disabled=${this.simpleDisabled}
                       @change=${this.onValueChanged}
                       role="switch">
                <span class="slider round"></span>
            </div>
            <div id=${this.uniqueId} hidden></div>
        `;
    }
}
