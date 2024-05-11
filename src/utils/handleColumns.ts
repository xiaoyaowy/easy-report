function generateColumns(columns: string): any {
    const result = columns.split(',').map((item: string) => {
        return {
            title: item,
            colKey: item,
            width: 200,
        }
    })
    console.log(result)
    return result;
}

export { generateColumns };