module.exports = (strArray) => {
    return ['up', 'down']
        .map((dir) => ({
            dir,
            idx: strArray.findIndex((line) =>
                line.toLowerCase().endsWith(`-----${dir}`)
            )
        }))
        .filter(({idx}) => idx > -1)
        .reduce((ud, {idx: fromIdx, dir}, index, arr) => {
            const toIdx = (
                arr[index + 1] ||
                {idx: strArray.length}
            ).idx;

            return {
                ...ud,
                [dir]: strArray
                    .slice(fromIdx + 1, toIdx)
                    .join('\n')
            };
        }, {});
}