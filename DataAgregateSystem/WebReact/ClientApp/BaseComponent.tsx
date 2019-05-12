import * as React from 'react';


/**
 * Базовый компонент с дополнительной внутренней логикой для всего приложения
 * [Не является самостоятельным компонентом! - поэтому среди моделей лежит]
 */
export default class BaseComponent<Props, State = {}> extends React.Component<Props, State> {

    constructor(props: any, context: any) {
        super(props, context);
        this.init();
    }

    init(){}

    /**
     * Название класса
     * @return {string}
     * @constructor
     */
    public Name: string = '';

    /**
     * никальный индентификатор компонента
     * Нужен, что бы разделять экземпляры одного и того же компонента
     * @return {string}
     * @constructor
     */
    public uid: string = this.generateUid();

    /**
     * Uid
     * @return {string}
     */
    generateUid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
            let r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
    
    /**
     * Написание класса по стилю БЭМ от Яндекс
     * https://tech.yandex.ru/bem/
     * Блок = название класса
     * Разделение имён в элементе и модификаторе происходит через дефис "-": menu-horizontal-main
     *      (первым словом устанавливается тип элемента: menu, label, button, ...)
     * @param {string} element - элемент
     * @param {string} modifier - модификатор
     * @return {string}
     */
    public getClassName(element?: string, modifier?: string | string[]) {
        //не указан элемент - значит просто название класса (если указан модификатор, то с модификатором)
        if (!element) {
            return this.Name + (modifier ? ' ' + this.Name + '_' + modifier : '');
        }

        //элемент
        let classNameElement = this.Name + '__' + element;
        let classNameModifiers = ' ';

        //модификатор
        if (modifier) {
            if (typeof modifier == 'string') {
                modifier = [modifier];
            }

            modifier.filter(x => x).map(x => classNameModifiers += ' ' + classNameElement + '_' + x);
            
        }

        return classNameElement + classNameModifiers;
    }

    public renderBase(view: JSX.Element) {
        return <div className={this.getClassName('', this.uid)}>
            {view}
        </div>;
    }
} 