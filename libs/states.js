import create from 'zustand'
import { getDatabase } from '@libs/notion'



export const useSelection = create((set) => ({
    selection: null,
    setSelection: (selection) => set(selection),
}))

export const useFilters = create((set) => ({
    filters: [],
    setArticles: (articles) => set(articles),
}))

export const useNavigation = create((set) => ({
    navigationState: true,
    setNavigationActive: () => set((state) => ({ navigationState: false })),
    setNavigationInactive: () => set((state) => ({ navigationState: false })),
    toggleNavigation: () => set((state) => ({ navigationState: !state.navigationState })),
}))
export const useArticle = create((set) => ({
    articleState: false,
    setArticleActive: () => set((state) => ({ articleState: true })),
    setArticleInactive: () => set((state) => ({ articleState: false })),
    toggleArticle: () => set((state) => ({ articleState: !state.articleState })),
}))