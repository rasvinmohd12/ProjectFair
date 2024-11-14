import commonAPI from "./commonAPI"
import SERVERURL from "./serverUrl"

// register call by Auth
export const registerAPI=async (reqBody)=>{
    return await commonAPI("POST",`${SERVERURL}/register`,reqBody)

}

// login called by Auth
export const loginAPI=async (reqBody)=>{
    return await commonAPI("POST",`${SERVERURL}/login`,reqBody)

}
// addProject  APIcalled by Add
export const addProjectAPI=async (reqBody,reqHeader)=>{
    return await commonAPI("POST",`${SERVERURL}/add-project`,reqBody,reqHeader)

}

// homeProject API called by Home
export const homeProjectAPI=async()=>{
    return await commonAPI("GET",`${SERVERURL}/home-projects`,"")
}

// allProject API called by Projects
export const allProjectAPI=async(searchKey,reqHeader)=>{
    return await commonAPI("GET",`${SERVERURL}/all-projects?search=${searchKey}`,"",reqHeader)
}

// userProject API called by view
export const userProjectAPI=async(reqHeader)=>{
    return await commonAPI("GET",`${SERVERURL}/user-projects`,"",reqHeader)
}

// deleteProjectAPI called by View
export const deleteProjectAPI =async(pId,reqHeader)=>{
    return await commonAPI ("DELETE",`${SERVERURL}/${pId}/remove-project`,{},reqHeader)
}

// editProjectAPI called by Edit:put request to 
export const editProjectAPI =async(pId,reqBody,reqHeader)=>{
    return await commonAPI ("PUT",`${SERVERURL}/${pId}/edit-projects`,reqBody,reqHeader)
}

// editUserAPI called by Edit:put request to 
export const editUserAPI =async(reqBody,reqHeader)=>{
    return await commonAPI ("PUT",`${SERVERURL}/user/edit`,reqBody,reqHeader)
}
