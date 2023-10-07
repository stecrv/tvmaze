 export const dataMovieEnricher = movie =>{
        const year = movie?.premiered?.split('-') ?? ['none'];
        return {...movie, year: year[0]}
 }

 export const searchDataConvert = data => {
     return data ? data.map(el => {return el.show}) : [];
 }