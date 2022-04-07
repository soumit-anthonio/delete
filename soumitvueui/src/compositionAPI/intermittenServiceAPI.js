import { ref, computed, watch, watchEffect } from 'vue';
import config from "../config";
import apiClient from "../assets/js/services/EventService";
import { _ } from "vue-underscore";

export function intermittenServiceAPI(storeParam) {
    const store = storeParam;
    const counter = ref(0);
    const userNameAndAddress = ref('Hello Guest');
    const userName = ref('Hello Guest');
    const notificationCount = ref(0);
    const notificationList = ref([]);
    const doubleCounter = computed({
        get: () => { return counter.value * 2 },
        set: (val) => { counter.value = val - 1 }
    });

    watch(counter, (newVal, oldVal) => { //This is the ref specific watcher. // This is very lazy.
        console.log(newVal, oldVal);
    });

    watchEffect(() => { //This is the ref generic watcher.
        // console.log(`value of counter:${counter.value}`);
        // console.log(`value of doubleCounter:${doubleCounter.value}`);
        // console.log(`value of userNameAndAddress:${userNameAndAddress.value}`);
        // console.log(`value of userName:${userName.value}`);
    })

    function addOne() {
        counter.value += 1;
    }




    function getUserLocation() {
        let returnString = '';
        if (store.getters.getCandidateId()) {
            //const candidate_id = store.getters.getCandidateId();
            const fname = store.getters.getFirstName();
            const lname = store.getters.getLastName();
            const iptoken = config.iptoken;
            const iptrackApi = config.iptrackApi;
            apiClient.get(iptrackApi + `json?token=${iptoken}`).then((res) => {

                //console.warn(res);
                const citySearch = res.data.city;

                returnString = 'Hi ' + fname + ' ' + lname + ' from ' + citySearch;
                userNameAndAddress.value = returnString;
                userName.value = 'Hi ' + fname;
            });
        } else {
            userName.value = 'Hi Guest';
        }


    }
    // let setNotifications = new Promise((resolve, reject) => { 
    //     this.store.methods.setNotifications([]);
    //     notificationCount.value = 0;
    //     if (store.getters.getCandidateId()) {
    //         const user_id = store.getters.getCandidateId();
    //         const apiUrl = config.apiUrl;
    //         apiClient
    //             .get("/alienusers/transactionalert/" + user_id)
    //             .then((res) => {
    //                 if (res.data && res.data.length > 0) {
    //                     const notification_data = _.filter(res.data, (data) => {
    //                         return data.isShowInHomePage === 'true';
    //                     });
    //                     this.store.methods.setNotifications(notification_data);
    //                     notificationCount.value = notification_data.length;
    //                     resolve('The promised task was performed successfully.'); 
    //                 }
    //             });

    //     } else {
    //         this.store.methods.setNotifications([]);
    //         notificationCount.value = 0;
    //         resolve('The promised task was performed successfully.'); 
    //     }

    //   });  

    function setNotifications(id, myCallback) {
        this.store.methods.setNotifications([]);
        notificationCount.value = 0;
        if (store.getters.getCandidateId()) {
            const user_id = store.getters.getCandidateId();
            apiClient
                .get("/alienusers/transactionalertnotification/" + user_id)
                .then((res) => {
                    if (res.data && res.data.length > 0) {
                        const notification_data = _.filter(res.data, (data) => {
                            return data.isShowInHomePage === 'true';
                        });
                        this.store.methods.setNotifications(notification_data);
                        this.store.methods.setNotificationCount(notification_data.length);
                        notificationCount.value = notification_data.length;
                        notificationList.value= notification_data;
                        myCallback(notificationList.value);
                    }
                });

        } else {
            this.store.methods.setNotifications([]);
            this.store.methods.setNotificationCount(0);
            notificationCount.value = 0;
            notificationList.value= [];
            myCallback(notificationList.value);
        }

    }

    function getNotifications(id, myCallback) {
        notificationCount.value = 0;
        if (store.getters.getCandidateId()) {
            const user_id = store.getters.getCandidateId();
            apiClient
                .get("/alienusers/transactionalertnotification/" + user_id)
                .then((res) => {
                    if (res.data && res.data.length > 0) {
                        notificationList.value= [];
                        const notification_data = _.filter(res.data, (data) => {
                            return data.isShowInHomePage === 'true';
                        });
                        notificationCount.value = notification_data.length;
                        notificationList.value= notification_data;
                        myCallback(notificationList.value);
                    }
                });

        } else {
            notificationCount.value = 0;
            notificationList.value= [];
            myCallback(notificationList.value);
        }



    }











    return {
        addOne,
        counter, doubleCounter, userNameAndAddress, userName, notificationCount, getUserLocation, setNotifications, getNotifications
    }
}

