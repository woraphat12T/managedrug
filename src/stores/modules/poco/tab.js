import { defineStore } from 'pinia';

export const useTabStore = defineStore('tab', {
    state: () => ({
        currentTab: localStorage.getItem('pocoTab') || 'all-tab',
    }),
    actions: {
        setPage(tabName) {
            this.currentTab = tabName;
            localStorage.setItem('pocoTab', tabName);
        },
    },
});