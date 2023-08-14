interface OptionalClassName {
    class: string,
    condition: boolean,
}
export const classNames = (initialClassName: string, classNames?: string[]): string => {
    if (!classNames || classNames.length === 0) {
        return initialClassName;
    }
    
    let newClassName = initialClassName + ' ';
    classNames.map((className) => {
        newClassName += ` ${ className }`;
    });
    
    return newClassName;
};

export const optinalClassNames = (initialClassName: string, optionalClassNames?: OptionalClassName[]): string => {
    if (!optionalClassNames || optionalClassNames.length === 0) {
        return initialClassName;
    }

    let className = initialClassName + ' ';
    optionalClassNames.map((optionalClassName) => {
        if (optionalClassName.condition) {
            className += ` ${ optionalClassName.class }`;
        }
    });

    return className;
};
