import Axios from "axios";
import settings from "./settings";

class RestAPI {

  subpath = '';

  constructor(subpath){
    this.subpath = subpath;
  }

  async put(path,formData,token = 'UNAUTHORIZED', headers = {}) {
    let data = false;
    let returnData = {
      success: false,
      data: {},
      message: '',
      status: false
    };
    try {
      headers[settings.api.authenticationTokenName] = token;
      data = await Axios(        
        {
          method: 'put',
          url: settings.api.endpoint + this.subpath + path, 
          headers: {
            ...headers,
            "Content-Type": "application/json"
          },
          data: formData
        }
      )
      returnData = data.data;
      returnData.status = data.status;
    }catch(e){
      if(e.response !== undefined &&  e.response.status){
        returnData.status = e.response.status;
      }
      returnData.data = e.response.data.data || {};
      returnData.message = e.response.data.message || "unknown error";
    }
    return returnData;
  }

  async patch(path,formData,token = 'UNAUTHORIZED', headers = {}) {
    let data = false;
    let returnData = {
      success: false,
      data: {},
      message: '',
      status :false
    };
    try {
      headers[settings.api.authenticationTokenName] = token;
      data = await Axios(        
        {
          method: 'patch',
          url: settings.api.endpoint + this.subpath + path, 
          headers: {
            ...headers,
            "Content-Type": "application/json"           
          },
          data: formData
        }
      )
      returnData = data.data;
      returnData.status = data.status;
    }catch(e){
      if(e.response !== undefined &&  e.response.status){
        returnData.status = e.response.status;
      }     
      returnData.data = e.response.data.data || {};
      returnData.message = e.response.data.message || "unknown error";
    }
    return returnData;
  }

async post(path,formData, token = 'UNAUTHORIZED', headers = {}) {

    let data = false;
    let returnData = {
      success: false,
      data: {},
      message: '',
      status :false
    };
    try {
      headers[settings.api.authenticationTokenName] = token;
      data = await Axios(
        {
          method: 'post',
          url: settings.api.endpoint + this.subpath + path,
          headers: {
            ...headers,
            "Content-Type": "application/json"
          },
          data: formData
        }
      )
      returnData = data.data;
      returnData.status = data.status;
    }catch(e){
      if(e.response !== undefined &&  e.response.status){
        returnData.status = e.response.status;
      }     
      returnData.data = e.response.data.data || {};
      returnData.message = e.response.data.message || "unknown error";
    }
    return returnData;
  }

  async get(path, token = 'UNAUTHORIZED', params = {}, headers = {}){
    let data = false;
    let returnData = {
      success: false,
      data: {},
      message: '',
      status: false
    };
    try {
      headers[settings.api.authenticationTokenName] = token;
      data = await Axios(
        {
          method: 'get',
          url: settings.api.endpoint + this.subpath + path,
          headers: {
            ...headers,
            "Content-Type": "application/json"
          },
          params
        }
      )
      returnData = data.data;
      returnData.status = data.status;
    }catch(e){
      if(e.response !== undefined &&  e.response.status){
        returnData.status = e.response.status;
      }     
      returnData.data = e.response.data.data || {};
      returnData.message = e.response.data.message || "unknown error";
    }
    return returnData;
  }

  async delete(path, token = 'UNAUTHORIZED', headers = {}){
    let data = false;
    let returnData = {
      success: false,
      data: {},
      message: '',
      status: false
    };
    try {
      headers[settings.api.authenticationTokenName] = token;
      data = await Axios(
        {
          method: 'delete',
          url: settings.api.endpoint + this.subpath + path,
          headers: {
            ...headers,
            "Content-Type": "application/json"
          }
        }
      )
      returnData = data.data;
      returnData.status = data.status;
    }catch(e){
      if(e.response !== undefined &&  e.response.status){
        returnData.status = e.response.status;
      }     
      returnData.data = e.response.data.data || {};
      returnData.message = e.response.data.message || "unknown error";
    }
    return returnData;
  }
}

export default RestAPI;