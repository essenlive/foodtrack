export function filterArticles(articles, filters, sort = true) {
    let filteredArticles = articles.filter((article) => {
        let rightType = false, rightPhase = false, rightAliment = false;
        
        if (filters.Type === "all")  {rightType = true }
        else  { if (article.Type === filters.Type) rightType = true } 

        if (filters.Phase === "all") { rightPhase = true } 
        else { if (article.Phase === filters.Phase) rightPhase = true; }

        if (filters.Aliment === "all") { rightAliment = true }
        else { article.Aliment.forEach(al => { if (al === filters.Aliment) rightAliment = true }); }

        return (rightType && rightPhase && rightAliment)
    });

    if(sort){
        filteredArticles = filteredArticles.sort((a, b) => {
            if (a.Date.start === null) a.Date.start = new Date()
            if (b.Date.start === null ) b.Date.start = new Date()
            return (new Date(a.Date.start)  - new Date(b.Date.start))
        })

    }

    return filteredArticles
}

export function getUniqueProperties(articles, propertyName) {
    let properties = articles.map(el => el[propertyName])
    properties = properties.flat().filter(el => !!el);
    return new Set(properties)
}
