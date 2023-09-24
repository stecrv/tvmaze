
export const dataFetch = async () =>{
        const response = await fetch('https://api.tvmaze.com/shows');
        return response.json();
}

export const dataMovieFetch = async (id) =>{
        const response = await fetch(`https://api.tvmaze.com/shows/${id}`);
        return response.json();
}