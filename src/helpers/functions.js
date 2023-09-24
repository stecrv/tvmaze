 export const dataEnricher = data => {
    return data.map(el => {
        return {...el, abstract: el.summary.substring(0, 200) + "..."}});
 }