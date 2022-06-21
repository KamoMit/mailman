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
            console.log(state.History)
        },
        removeFromHistory: (state, tab) => {
            state.History.splice(tab, 1);
        },
        addTab: (state, { id, tabNumber, title }) => {
            state.tabs.push({
                id,
                tabNumber,
                title
            })
        },
        removeTab: (state, index) => {
            state.tabs.splice(index, 1);
        },
        setSelectedTab: (state, tab ) => {
            state.selectedTab = tab
        },
        changeJSONBody: (state, newJSON) => {

            state.JSONBody = JSON.parse(newJSON);

        },
        DisplayResult: (state, response) => {
            state.DataToDisplay = response;
        }
    },
    actions: {
        getRequest: (context, { input, requestType }) => {
            axios.get(input).then(response => {
                console.log(response)
                context.commit("DisplayResult", response)
                context.commit("addToHistory", {
                    request: requestType,
                    data: response.data,
                    URL: input,

                })
            }).catch(error => context.state.DataToDisplay = error);
        },
        postRequest: (context, { input, requestType }) => {
            if (context.state.DataToDisplay !== "error: Invalid JSON") {
                axios.post(input, context.state.JSONBody).then(response => {
                    context.commit("DisplayResult", response)
                    context.commit("addToHistory", {
                        request: requestType,
                        data: response,
                        URL: input,
                    })
                }).catch(error => {
                    context.state.DataToDisplay = error
                });
            }
        },
        putRequest: (context, { input, requestType }) => {
            if (context.state.DataToDisplay !== "error: Invalid JSON") {
                axios.put(input, context.state.JSONBody).then(response => {
                    context.commit("DisplayResult", response)
                    context.commit("addToHistory", {
                        request: requestType,
                        data: response,
                        URL: input,
                    })
                }).catch(error => context.state.DataToDisplay = error)
            }
        },
        patchRequest: (context, { input, requestType }) => {
            if (context.state.DataToDisplay !== "error: Invalid JSON") {
                axios.patch(input, context.state.JSONBody).then(response => {
                    context.commit("DisplayResult", response)
                    context.commit("addToHistory", {
                        request: requestType,
                        data: response,
                        URL: input,
                    })
                }).catch(error => context.state.DataToDisplay = error)
            }
        },
        deleteRequest: (context, { input, requestType }) => {
            axios.delete(input).then(() => {
                context.commit("DisplayResult", {
                    response: "Deleted successfully"
                })
                context.commit("addToHistory", {
                    request: requestType,
                    data: "Deleted successfully",
                    URL: input,
                })
            }).catch(error => context.state.DataToDisplay = error)
        },
        headRequest: (context, { input, requestType }) => {
            axios.head(input).then(response => {
                context.commit("DisplayResult", response)
                context.commit("addToHistory", {
                    request: requestType,
                    data: response,
                    URL: input
                })
            }).catch(error => context.state.DataToDisplay = error)
        },
        optionsRequest: (context, { input, requestType }) => {
            axios.options(input).then(response => {
                context.commit("DisplayResult", response)
                context.commit("addToHistory", {
                    request: requestType,
                    data: response.data,
                    URL: input
                })
            }).catch(error => context.state.DataToDisplay = error)
        }
    }
})