 export const dataEnricher = data => {
    return data.map(el => {
        return {...el, abstract: el.summary.substring(0, 200) + "..."}});
 }

 export const dataMovieEnricher = movie =>{
        const year = movie?.premiered?.split('-') ?? ['none'];
        return {...movie, year: year[0]}
 }