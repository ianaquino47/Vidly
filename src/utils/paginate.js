import _ from 'lodash';

export function paginate(items, pageNumber, pageSize) {
    const startIndex = (pageNumber - 1) * pageSize;
    return _(items)
        .slice(startIndex)  //slices array from index upto end
        .take(pageSize) //takes pageSize elements from array
        .value()    //returns lodash wrapped object back into array
}