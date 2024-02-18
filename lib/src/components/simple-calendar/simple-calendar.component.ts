import { CSSResultGroup, LitElement, css, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

const enum WeekDaysNamesIndecies {
    Sunday = 0,
    Monday = 1,
}

@customElement('simple-calendar')
export class SimpleCalendar extends LitElement {

    @property({ type: String, attribute: 'sc-locale' })
    set scLocale(value: string) {
        this._locale = value;
        this.init();
    }
    get scLocale() {
        return this._locale;
    }

    @state()
        year = '2024';
    @state()
        month = '1';
    @state()
        _locale = 'en-US';

    static override styles: CSSResultGroup = css`

        .simple-calendar-days {
            display: grid;
            grid-template-columns: repeat(7, 1fr);
            gap: 0.2rem;
        }

        input,
        select {
            border: 1px solid var(--color-bg-secondary);
            border-radius: var(--border-radius);
            margin-bottom: 1rem;
            padding: 0.4rem 0.8rem;
        }

    `;

    private firstDayIndex: WeekDaysNamesIndecies = 0;
    private localeDayNames: Array<string> = [];
    private localeMonthNames: Array<string> = [];

    constructor() {
        super();
        this.init();
    }

    private init() {

        this.localeDayNames = Array.from({ length: 7 }).map((_v, k) => new Date(`1990-01-${k + 1}`).toLocaleString(this._locale, { weekday: 'short' }));
        this.localeMonthNames = Array.from({ length: 12 }).map((_v, k) => new Date(`1990-${k + 1}-01`).toLocaleString(this._locale, { month: 'long' }));

        this.firstDayIndex = this.getFirstDayNumber() === 1 ? WeekDaysNamesIndecies.Sunday : WeekDaysNamesIndecies.Monday;

        if (this.firstDayIndex === 0) {
            this.localeDayNames.unshift(this.localeDayNames.pop() as string);
        }
    }

    private computeMonthDays(date: Date): Array<number> {
        let result: Array<number> = [];
        let currentMonthDayNumber = 1;
        let nextMonthDayNumber = 1;
        let weeksToAdd = 6;
        const daysInCurrrentMonth = this.countDaysInMonth(date);
        const firstDayIndex = this.getFirstMonthWeekdayIndex(date);
        const dateInPreviousMonth = new Date(date.getTime());
        dateInPreviousMonth.setDate(0);

        let daysCounter = this.countDaysInMonth(dateInPreviousMonth) + 1;
        const previousMonthLastWeek = Array.from({ length: 7 }).map(() => daysCounter -= 1)
            .slice(0, firstDayIndex || 7)
            .toReversed();

        if (previousMonthLastWeek.length === 7) {
            weeksToAdd = 5;
            result = result.concat(previousMonthLastWeek);
        }

        for (let i = 0; i < weeksToAdd; i += 1) {
            for (let j = 0; j < 7; j += 1) {
                if (i === 0 && j < firstDayIndex) {
                    result.push(previousMonthLastWeek[j]);
                } else if (currentMonthDayNumber > daysInCurrrentMonth) {
                    result.push(nextMonthDayNumber);
                    nextMonthDayNumber += 1;
                } else {
                    result.push(currentMonthDayNumber);
                    currentMonthDayNumber += 1;
                }
            }
        }

        return result;
    }

    private getFirstDayNumber() {
        return ((new Intl.Locale(this._locale) || { weekInfo: { firstDay: 7 } }) as unknown as { weekInfo: { firstDay: number }}).weekInfo.firstDay;
    }

    private getFirstMonthWeekdayIndex(date: Date) {
        const index = (new Date(date.getFullYear(), date.getMonth())).getDay() - this.firstDayIndex;
        return  index < 0 ? 6 : index;
    }

    private countDaysInMonth(date: Date) {
        return 32 - new Date(date.getFullYear(), date.getMonth(), 32).getDate();
    }

    override render() {
        return html`
        <div class="wrapper">
            <input type="number" value=${this.year} @change=${(e: Event) => this.year = (e.target as HTMLInputElement).value}>
            <select @change=${(e: Event) => this.month = (e.target as HTMLInputElement).value}>
                ${this.localeMonthNames.map((month, i) => html`
                    <option value=${i + 1}>${month}</option>
                `)}
            </select>
            <div class="simple-calendar-days">
                ${this.localeDayNames.map(name => html`
                    <div>${name}</div>
                `)}
            </div>
            <div class="simple-calendar-days">
                ${this.computeMonthDays(new Date(`${this.year}-${this.month}`)).map(day => html`
                    <div>${day}</div>
                `)}
            </div>
        </div>
    `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'simple-calendar': SimpleCalendar;
  }
}

