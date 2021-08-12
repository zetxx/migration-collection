const comparator = new Intl.Collator(
    undefined,
    {numeric: true, sensitivity: 'base'}
);
module.exports = ({sortBy = false} = {}) => {
    if (!sortBy) {
        return comparator.compare;
    } else {
        return (a, b) => {
            return comparator
                .compare(a[sortBy], b[sortBy]);
        };
    }
};