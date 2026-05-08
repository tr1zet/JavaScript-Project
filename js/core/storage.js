export const saveUserName = (name) => localStorage.setItem('userName', name);
export const getUserName = () => localStorage.getItem('userName');