import { defineStore } from 'pinia'

export const useRootStore = defineStore('root', {
    state: () => {
        return {
            projectName: "Test Name from Root Store"
        }
    },

    getters: {
        getProjectName: (state) => state.projectName,
    },

    actions: {
        changeProgectName(name:string) {
            this.projectName =name;
        },
    }
})