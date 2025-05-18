const useLocal = async (key) => {
    const setLocal = async (setKey, value) => {
        await localStorage.setItem(setKey, value);
    }
    const local = await localStorage.getItem(key);

    return {local, setLocal}
}

export default useLocal;