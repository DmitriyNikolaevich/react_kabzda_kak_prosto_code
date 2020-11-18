export const requiredFild = value => {
    if (value) {
        return undefined;
    } else {
        return "Fild is required!";
    }
}

export const maxLenghtCreator = (maxLenght) => (value) => {
    if (value.length > maxLenght) {
        return `Max lenght is ${maxLenght} symbols`;
    } else {
        return undefined;
    }
}