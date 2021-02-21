export type FieldValidatorType = (value: string) => string | undefined

export const requiredFild: FieldValidatorType = (value) => {
    if (value) {
        return undefined;
    } else {
        return "Fild is required!";
    }
}

export const maxLenghtCreator = (maxLenght: number): FieldValidatorType => (value) => {
    if (value.length > maxLenght) {
        return `Max lenght is ${maxLenght} symbols`;
    } else {
        return undefined;
    }
}