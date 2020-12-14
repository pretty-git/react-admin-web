import store from 'store'
const USER_KEY = 'user_key'
export default {
    /**
     * 保存user
     */
    saveUSer(user) {
        // localStorage.setItem(USER_KEY,JSON.stringify(user)) // 原生的localStroge兼容性不够，所以引入store库来存
        store.set(USER_KEY,user)
    },
    getUSer() {
    //    return JSON.parse(localStorage.getItem(USER_KEY) || '{}')// 无值返回null
          return store.get(USER_KEY) || {}
    },
    removeUser() {
        // localStorage.removeItem(USER_KEY)
        store.remove(USER_KEY)
    }
}