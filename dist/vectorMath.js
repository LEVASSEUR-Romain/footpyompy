// soustraire vecteur
export const subVector = (vector1, vector2) => {
    return {
        x: vector1.x - vector2.x,
        y: vector1.y - vector2.y,
    };
};
// permet de calculer la longueur d'un vecteur
export const magVector = (vector) => {
    return Math.pow((Math.pow(vector.x, 2) + Math.pow(vector.y, 2)), 0.5);
};
// normaliser vecteur c'est a dire le metre a 1 la longueur du vecteur
export const normaliseVector = (vector) => {
    const magnitude = magVector(vector);
    return {
        x: vector.x / magnitude,
        y: vector.y / magnitude,
    };
};
// multiliplier une vecteur par un scalaire
export const multVector = (vector, n) => {
    return {
        x: vector.x * n,
        y: vector.y * n,
    };
};
// additionner vector avec un autre
export const addVector = (vector1, vector2) => {
    return {
        x: vector1.x + vector2.x,
        y: vector1.y + vector2.y,
    };
};
// inverse le vecteur
export const inverseVector = (vector) => {
    return {
        x: -vector.x,
        y: -vector.y,
    };
};
