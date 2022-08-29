import create from 'zustand'

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
    setFilters: (filter) => set((state) => ({ filters: {...state.filters, ...filter }})),
}))

export const useNavigation = create((set) => ({
    navigationState: "home",
    setNavigationState: (navigation) => set((state) => ({ navigationState : navigation })),
    setNavigationHome: () => set((state) => ({ navigationState: "home" })),
    setNavigationExplore: () => set((state) => ({ navigationState: "explore" })),
    setNavigationRead: () => set((state) => ({ navigationState: "read" })),
}))
export const useArticle = create((set) => ({
    articleState: false,
    setArticleActive: () => set((state) => ({ articleState: true })),
    setArticleInactive: () => set((state) => ({ articleState: false })),
    toggleArticle: () => set((state) => ({ articleState: !state.articleState })),
}))