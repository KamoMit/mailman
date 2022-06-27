import Vue from "vue";
import Vuex from "vuex";
import axios from 'axios';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        DataToDisplay: "No Data provided",
        options: ["GET", "POST", "PUT", "PATCH", "DELETE", "HEAD", "OPTIONS"],
        JSONBody: {},
        History: [],
        tabs: [{
            tabId: Math.random(),
            tabNumber: 1,
            title: "tab 1", 
        }],
        selectedTab: "tab 1",
    },
    mutations: {
        changeDataToDisplay: (state, msg) => {
            state.DataToDisplay = msg
        },
        addToHistory: (state, { request, data, URL }) => {
            state.History.push({
                request: request,
                data: data,
                open: false,
                id: Math.random(),
                URL
            })
            localStorage.History = JSON.stringify(state.History);
        },
        removeFromHistory: (state, tab) => {
            state.History.splice(tab, 1);
            localStorage.History = JSON.stringify(state.History);
        },
        addTab: (state, { id, tabNumber, title }) => {
            state.tabs.push({
                id,
                tabNumber,
                title
            })
            localStorage.tabs = JSON.stringify(state.tabs);

        },
        removeTab: (state, index) => {
            state.tabs.splice(index, 1);
            localStorage.tabs = JSON.stringify(state.tabs);
        },
        setSelectedTab: (state, tab ) => {
            state.selectedTab = tab
            localStorage.selectedTab = JSON.stringify(state.selectedTab)
        },
        changeJSONBody: (state, newJSON) => {

            state.JSONBody = JSON.parse(newJSON);

        },
        DisplayResult: (state, response) => {
            state.DataToDisplay = response;
        }
    },
    actions: {
        Request: (context, {input, requestType}) => {
            axios({
                method: requestType,
                url: input,
                data: context.state.JSONBody,
            }).then(response => {
                if(requestType === "DELETE"){
                    context.commit("DisplayResult","Deleted successfully")
                    context.commit("addToHistory", {
                        request: requestType,
                        data: "Deleted successfully",
                        URL: input,
                    })
                }else{
                    context.commit("DisplayResult", response)
                    context.commit("addToHistory", {
                        request: requestType,
                        data: response.data,
                        URL: input
                    })
                }
               
            }).catch(error => context.state.DataToDisplay = error)
        },    
    }
})