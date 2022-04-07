import { reactive, readonly } from 'vue'

const state = reactive({
    counter: 0,
    candidate_id: 0,
    username: '',
    lname: '',
    fname: '',
    rolename: '',
    colorCode: 'red',
    notifications: [],
    notificationCount: 0
});

const methods = {
    decreaseCounter() {
        state.counter--;
    },
    increaseCounter() {
        state.counter++;
    },
    setColorCode(val) {
        state.colorCode = val;
    },
    setCandidateId(val) {
        state.candidate_id = val;
    },
    setUserName(val) {
        state.username = val;
    },
    setLastName(val) {
        state.lname = val;
    },
    setFirstName(val) {
        state.fname = val;
    },
    setRoleName(val) {
        state.rolename = val;
    },
    setNotifications(val) {
        state.notifications = val;
    },
    setNotificationCount(val) {
        state.notificationCount = val;
    },
    clearState() {
        state.candidate_id = null;
        state.username = null;
        state.lname = null;
        state.fname = null;
        state.rolename = null;
        state.notifications = [];
        state.notificationCount = 0;
    }
}

const getters = {
    counterSquared() {
        return state.counter * state.counter;
    },
    getCandidateId() {
        return state.candidate_id;
    },
    getUserName() {
        return state.username;
    },
    getLastName() {
        return state.lname;
    },
    getFirstName() {
        return state.fname;
    },
    getRoleName() {
        return state.rolename;
    },
    getNotifications() {
        return state.notifications;
    },
    getNotificationCount() {
        return state.notificationCount;
    }
}

const store = {
    name: "store",
    state: readonly(state),
    methods,
    getters
}


export default store;
