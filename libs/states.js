import create from 'zustand'
import { getUniqueProperties } from './filtersHelper'

export const useSelection = create((set) => ({
    selection: null,
    setSelection: (selection) => set(() =>({selection}))
}))

export const useFilters = create((set) => ({
    filters: null,
    activeFilters: {
        Type: "all",
        Phase: "all",
        Aliment: "all"
    },
    setFilters: (filter) => set((state) => ({ activeFilters: { ...state.activeFilters, ...filter } })),
    createFilters: (articles) => set(() =>{
        return ({
            filters: {
                Type: getUniqueProperties(articles, "Type"),
                Phase: getUniqueProperties(articles, "Phase"),
                Aliment: getUniqueProperties(articles, "Aliment")
            }
        })
        }),
}))

export const useNavigation = create((set) => ({
    navigationMenuState: true,
    navigationAsideState: false,
    toggleNavigationMenu: () => set((state) => ({ navigationMenuState: !state.navigationMenuState })),
    toggleNavigationAside: () => set((state) => ({ navigationAsideState : !state.navigationAsideState })),
    setNavigationMenu: (newState) => set(() => ({ navigationMenuState: newState })),
    setNavigationAside: (newState) => set(() => ({ navigationAsideState: newState })),
}))
export const useArticle = create((set) => ({
    articleState: false,
    setArticleActive: () => set((state) => ({ articleState: true })),
    setArticleInactive: () => set((state) => ({ articleState: false })),
    toggleArticle: () => set((state) => ({ articleState: !state.articleState })),
}))