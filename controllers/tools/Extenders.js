/* String Extenders */

String.prototype.inverted = function () {
    var lengthThis = this.length,
        msgInverted = "";
    while (lengthThis >= 0) {
        msgInverted = msgInverted + this.charAt(lengthThis);
        lengthThis--;
    }
    return msgInverted;
};

String.prototype.lastIndexOf = function (term) {
    var idx = this.inverted().indexOf(term.inverted());
    return this.length - (idx + term.length);
};

/* Array Extenders */

Array.prototype.takeSome = function () {
    return this[Math.floor(Math.random() * this.length)];
};

Array.prototype.sortASC = function () {
    return this.sort((a, b) => {
        return a - b;
    });
}

Array.prototype.sortDESC = function () {
    return this.sort((a, b) => {
        return b - a;
    });
}