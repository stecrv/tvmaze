import {ref, watchEffect} from 'vue'

export function useFetch(url) {
    const data = ref(null)
    const error = ref(null)
    const load = ref(null)

    const fetchData = (dt) => {
        load.value = true;

        fetch(`https://api.tvmaze.com/${url}`).then((res) => res.json())
            .then((json) => (data.value = json))
            .catch((err) => (error.value = true))
            .finally(() => {
                load.value = false;
            })

    }

    watchEffect(() => {
        fetchData(url)
    })

    return {data, error, load}
}