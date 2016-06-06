//action types

export const START_SCRAPE = 'START_SCRAPE'
export const GET_IMGS_REQUEST = 'GET_IMGS_REQUEST'
export const GET_IMGS_SUCCESS = 'GET_IMGS_SUCCESS'
export const GET_IMGS_FAILURE = 'GET_IMGS_FAILURE'

//other constans



//action creators
export function startScrape() {
    return {type: START_SCRAPE}
}

export function getImgs(pageIndex = 1) {
    return {type: GET_IMGS, pageIndex}
}

export function updateLists(lists) {
   return {type: UPDATE_LISTS, lists} 
}

export function openDetails(pid) {
    return {type: OPEN_DETAILS, pid}
}