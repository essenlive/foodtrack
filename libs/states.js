import create from 'zustand'

function getUniqueProperties(articles, propertyName) {
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


export const useSelection = create((set) => ({
    selection: null,
    setSelection: (selection) => set(selection),
}))

export const useFilters = create((set) => ({
    filters: {
        Type : null,
        Phase : null,
        Aliment : null
    },
    activeFilters : {
        Type: null,
        Phase: null,
        Aliment: null
    }, 
    setFilters: (filter) => set((state) => ({ activeFilters: { ...state.activeFilters, ...filter } })),
    createFilters: (articles) => set(() =>{
        return ({
            filters: {
                Type: getUniqueProperties(articles, "Type"),
                Phase: getUniqueProperties(articles, "Phase"),
                Aliment: getUniqueProperties(articles, "Aliment")
            }})
        }),
}))

export const useNavigation = create((set) => ({
    navigationState: "home",
    setNavigationState: (navigation) => set(() => ({ navigationState : navigation })),
    setNavigationHome: () => set(() => ({ navigationState: "home" })),
    setNavigationExplore: () => set(() => ({ navigationState: "explore" })),
    setNavigationRead: () => set(() => ({ navigationState: "read" })),
}))
export const useArticle = create((set) => ({
    articleState: false,
    setArticleActive: () => set((state) => ({ articleState: true })),
    setArticleInactive: () => set((state) => ({ articleState: false })),
    toggleArticle: () => set((state) => ({ articleState: !state.articleState })),
}))