export function filterArticles(articles, filters, sort = true) {
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

    if(sort){
        // console.log("sorting");
        filteredArticles = filteredArticles.sort((a, b) => {
            // console.log(a.properties.Date.date, b.properties.Date.date);
            if ( a.properties.Date.date === null ) a.properties.Date.date = { start: new Date() }
            if ( b.properties.Date.date === null ) b.properties.Date.date = { start : new Date() }
            return (new Date(a.properties.Date.date.start)  - new Date(b.properties.Date.date.start))
        })

    }

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

export function validatedArticles(articles){
    return articles.filter((article) => article.properties["Validée"].checkbox)
}

export function organizeArticle(articles) {
    articles = articles.map(article => {
        let start = new Date();
        let end = new Date();
        end = new Date(end.setFullYear(end.getFullYear() + 10));

        if (!!article.properties.Date.date) {
            start = new Date(article.properties.Date.date.start);
            end = new Date(article.properties.Date.date.start);
            end = article.properties.Date.date.end ? new Date(article.properties.Date.date.end) : new Date(end.setFullYear(end.getFullYear() + 10));
        }

        let tracks = article.properties.Aliment.multi_select.map(aliment => aliment.name);

        let phase = article.properties.Phase.select.name;

        let name = article.properties.Name.title[0].plain_text;

        return (tracks.map(track => ({
            start,
            end,
            track,
            phase,
            name, 
            ...article
        })))
    })
    return articles.flat()
}
