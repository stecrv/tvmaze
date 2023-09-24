
export const dataFetch = async () =>{
        const response = await fetch('https://api.tvmaze.com/shows');
        return response.json();
}