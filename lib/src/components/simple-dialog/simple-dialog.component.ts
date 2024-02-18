import '@a11y/focus-trap';
import { LitElement, html } from 'lit';
import { customElement, property, state  } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import styles from './simple-dialog.style.scss';

type FocusableElementType = {
    focus: () => void;
}

export const simpleDialogCloseDialogEvent = 'SimpleDialogCloseDialogEvent';

export type SimpleDialogOpenOptionsType = {
    returnFocusTo?: unknown;
}

@customElement('simple-dialog')
export class SimpleDialog extends LitElement {
    static override styles = styles;

    @property({ type: Boolean, attribute: 'sd-no-backdrop' })
        sdNoBackdrop = false;

    @property({ type: Boolean, attribute: 'sd-nomodal' })
        sdNomodal = false;

    @property({ type: Boolean, attribute: 'sd-prevent-close-by-esc' })
        sdPreventCloseByEsc = false;

    @property({ type: String, attribute: 'sd-title' })
        sdTitle?: string;

    @property({ type: String, attribute: 'sd-aria-label' })
        sdAriaLabel?: string;

    @property({ type: String })
        closeDialogLabel = 'Close dialog';

    @state()
        isOpen = false;

    private returnFocusTo?: FocusableElementType;
    private kewdownListener = (e: KeyboardEvent): void => {
        if (e.key != null) {
            if (e.key === 'Escape') {
                if (this.sdPreventCloseByEsc) {
                    e.preventDefault();
                    return;
                }
                this.close();
            }
        }
    };

    constructor() {
        super();
        this.addEventListener(simpleDialogCloseDialogEvent, this.closeByEventListener);
    }

    async open(options?: SimpleDialogOpenOptionsType): Promise<void> {
        if (this.isOpen) {
            return;
        }
        const { returnFocusTo } = options || {};

        if (returnFocusTo && typeof (returnFocusTo as FocusableElementType).focus === 'function') {
            this.returnFocusTo = returnFocusTo as FocusableElementType;
        }

        document.body.addEventListener('keydown', this.kewdownListener);

        this.isOpen = true;

        setTimeout(() => {
            const dialog = this.shadowRoot?.querySelector('dialog');
            if (!dialog) {
                return;
            }

            dialog.addEventListener('keydown', this.kewdownListener);

            if (this.sdNomodal) {
                dialog.show();
            } else {
                dialog.showModal();
            }
            this.shadowRoot?.querySelector<HTMLInputElement>('.close-x-button')?.focus();
        });

    }

    async close(): Promise<void> {
        document.body.removeEventListener('keydown', this.kewdownListener);
        this.isOpen = false;
        const dialog =  this.shadowRoot?.querySelector('dialog');
        if (dialog) {
            dialog.addEventListener('keydown', this.kewdownListener);
            dialog.close();
        }
        if (this.returnFocusTo && typeof this.returnFocusTo.focus === 'function') {
            this.returnFocusTo.focus();
        }
    }

    private closeByEventListener = () => {
        this.close();
    };

    protected override render() {
        return html`
            ${
    this.isOpen ? html`
                    ${this.sdNoBackdrop ? html`` : html`<div class="backdrop"></div>`}
                        <dialog
                            title=${ifDefined(this.sdTitle)}
                            aria-label=${ifDefined(this.sdAriaLabel)}>
                            <focus-trap>
                                <div class="content-wrapper">
                                    <div class="dialog-header">
                                        <slot name="dialog-header"></slot>
                                    </div>
                                    <div class="close-button-wrapper">
                                        <button class="close-x-button" aria-label="${this.closeDialogLabel}" @click=${this.close}>x</button>
                                    </div>
                                </div>
                                <slot></slot>
                            </focus-trap>
                        </dialog>
                ` : ''
}
    `;
    }
}
