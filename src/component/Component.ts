import {Class, Functions, Generator, Types} from "wasabi-common";
import * as React from "react";
import Compare from "../util/Compare";

export interface Props {
    children?: any
}

export interface State {

}

/**
 * Base component which wraps render function in a try catch structure
 * Any child components who extends from this component will get protection when
 * Exception thrown, so protect component life cycle.
 */
abstract class Component <P extends Props, S extends State> extends React.Component <any, any> {
    refs: {
        [key: string]: any
    };
    props: P;
    state: S;
    /**
     *
     * @type {string}
     */
    protected componentId: string = Generator.guid();

    /**
     *
     * @param props
     * @param context
     */
    protected constructor(props?: P, context?: any) {
        super(props, context);
        Class.bindAll(this);
    }

    getComponentId(){
        return this.componentId;
    }

    /**
     * Decides ant update is necessary for re-rendering.
     * Compares old props and state objects with the newer ones without going deep.
     * @param {Object} nextProps
     * @param {Object} nextState
     * @returns {boolean} "true" component shoud update ,"false" otherwise.
     */
    public shouldComponentUpdate(nextProps: Object, nextState: Object): boolean {
        return Compare(this, nextProps, nextState);
    }

    /**
     * Returns class name of the component.
     * @return {string} name.
     */
    public getName (): string {
        return Functions.getName(this.constructor);
    }

    /**
     *
     * @return {JSX.Element}
     */
    public render(): JSX.Element {
        return this.props.children;
    }

    /**
     *
     * @return {State}
     */
    public cloneState(): any {
        return Types.getClone(this.state);
    }
}


export default Component;