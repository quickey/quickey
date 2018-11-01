declare module "*.scss" {
    interface IClassNames {
        [className: string]: string;
    }
    const classNames: IClassNames;
    export = classNames;
}

declare module "*.vue" {
    import Vue from "vue";
    export default Vue;
}

type Constructor<T> = new (...args: any[]) => T;