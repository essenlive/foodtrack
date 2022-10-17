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
    navigationMobileState: true,
    navigationAsideState: false,
    toggleNavigationMobileState: () => set((state) => ({ navigationMobileState: !state.navigationMobileState })),
    toggleNavigationAside: () => set((state) => ({ navigationAsideState : !state.navigationAsideState })),
    setnavigationMobileState: (newState) => set(() => ({ navigationMobileState: newState })),
    setNavigationAside: (newState) => set(() => ({ navigationAsideState: newState })),
}))