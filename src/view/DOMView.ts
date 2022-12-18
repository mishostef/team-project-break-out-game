
export type DOMElement = string | Node;

export interface DOM {
    createElement(type: string, attributes: object, ...content: DOMElement[]): HTMLElement;

    addElement(appendTo: string, element: HTMLElement): void;

    getElement(selector: string): any;

    deleteElement(selector: string): void;
}

export class DOMView implements DOM {
    private static instance: DOMView;

    private constructor() {
    }

    static getInstance(): DOMView {
        if (!this.instance) {
            this.instance = new DOMView();
        }
        return this.instance;
    }

    /**
  * This function cannot create a table
  * @param { string } type
  * @param { Object } attributes
  * @param  { ...(string | Node) } content 
  * @returns { HTMLElement } Returns the created element
  */
    createElement(type: string, attributes: object, ...content: DOMElement[]): HTMLElement {
        const element = document.createElement(type);

        if (attributes) {
            for (let attribute in attributes) {
                if (attribute.startsWith('on')) {
                    const eventName = attribute.slice(2).toLowerCase();
                    element.addEventListener(eventName, attributes[attribute]);
                } else {
                    element[attribute] = attributes[attribute];
                }
            }
        }

        for (let item of content) {
            element.append(item);
        }

        return element;
    }

    addElement(appendTo: string, element: HTMLElement) {
        document.querySelector(appendTo).append(element);
    }

    getElement(selector: string): HTMLElement {
        let value = document.querySelector(selector) as HTMLElement;
        return value;
    }
    deleteElement(selector: string) {
        const element = document.querySelector(selector);
        element.remove();
    }

    addHandler(event: string, callback: EventListener, selector?: string) {
        if (selector) {
            document.querySelector(selector).addEventListener(event, callback)
        } else {
            document.addEventListener(event, callback);
        }
    }

    addBackButtonHandler() {
        this.addHandler("click", () => { this.hideSettingsMenu(); }, "#back-btn");
    }
    addRightClickHandler(callback: EventListener) {
        window.oncontextmenu = callback;
    }
    showInitialScreen() {
        this.getElement("#container").style.display = "block";
        this.getElement("#gameCanvas").style.display = "none";
        this.getElement("#details-box").style.display = "none";
        this.getElement("#gameOver").style.display = "none"
    }
    initGame() {
        this.getElement("#container").style.display = "none";
        this.getElement("#gameCanvas").style.display = "block";
        const detailsBox = this.getElement("#details-box");
        detailsBox.style.display = "flex";
        detailsBox.style.justifyContent = "space-around";
    }
    setScore(scorePoints: number) {
        this.getElement("#score").textContent = `Score: ${scorePoints.toString()}`;
    }
    setLives(lives: number) {
        this.getElement("#life").innerText = lives.toString();
    }
    showNewGameButton() {
        (this.getElement("#new-game") as HTMLButtonElement).style.display = "block";
    }
    hideNewGameButton() {
        (this.getElement("#new-game") as HTMLButtonElement).style.display = "none";
    }
    getBoardImage() {
        return this.getElement("#board") as HTMLImageElement;
    }
    showSettingsMenu() {
        const settingsContainer = this.getElement("#settings-container");
        const container = this.getElement("#container");
        settingsContainer.style.display = "block";
        container.style.display = "none";
    }
    hideSettingsMenu() {
        const settingsContainer = this.getElement("#settings-container");
        const container = this.getElement("#container");
        settingsContainer.style.display = "none";
        container.style.display = "block";
    }
    showIcon() {
        (this.getElement(".gg-check") as HTMLElement).style.display =
            "block";
    }
    getPlayButton() {
        return this.getElement("#play-btn");
    }
    hideGameOverMessage() {
        this.getElement("#gameOver").style.display = "none";
    }
}