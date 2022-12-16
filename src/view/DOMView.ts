
export type DOMElement = string | Node;

export interface DOM {
    createElement(type: string, attributes: object, ...content: DOMElement[]) : HTMLElement;

    addElement(appendTo: string, element: HTMLElement) : void;

    getElement(selector: string) : any;

    deleteElement(selector: string) : void;
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
    createElement(type: string, attributes: object, ...content: DOMElement[]) : HTMLElement {
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

    addHandler(event: string, callback: EventListener) {
        document.addEventListener(event, callback);
    }
}