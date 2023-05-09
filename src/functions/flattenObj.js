/* Objects are not a suitable data type to display in JSX;
this is a quick function that 'unpacks' them to dispaly nested information, when necessary */

const flatten = (o) => {
    var tempA = {};
    for (let i in o) {
        if ((typeof o[i]) == 'object') {
            var tempB = flatten(o[i]);
            for (let j in tempB) { tempA[i + '.' + j] = tempB[j]; }
        } else { tempA[i] = o[i]; }
    }
    return tempA;
};

export default flatten