export function filterArticles(articles, filters) {
    let filteredArticles = articles.filter((article) => {
        let rightType = false;
        let rightPhase = false;
        let rightAliment = false;
        if (filters.Type !== "all") {
            if (article.properties.Type?.select?.name === filters.Type) rightType = true
        } else { rightType = true }
        if (filters.Phase !== "all") {
            if (article.properties.Phase?.select?.name === filters.Phase) rightPhase = true;
        } else { rightPhase = true }
        if (filters.Aliment !== "all") {
            if (article.properties.Aliment) {
                article.properties.Aliment.multi_select.forEach(element => {
                    if (element.name === filters.Aliment) rightAliment = true
                });
            }
        } else { rightAliment = true }
        return (rightType && rightPhase && rightAliment)
    });
    return filteredArticles
}

export function getUniqueProperties(articles, propertyName) {
    let properties = articles.map(el => {
        let returnValue;
        el.properties[propertyName]
        if (el.properties[propertyName].type === "multi_select") {
            returnValue = el.properties[propertyName].multi_select.map(el => el.name)
            returnValue = returnValue.flat()
        }
        else if (el.properties[propertyName].type === "select") {
            returnValue = el.properties[propertyName]?.select?.name
        }
        return returnValue
    })
    properties = properties.flat().filter(el => !!el);
    return new Set(properties)
}