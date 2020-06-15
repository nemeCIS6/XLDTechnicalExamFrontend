import RestAPI from "../modules/restApi";
const ra = new RestAPI('contact');

class contactService {
 
    async listAsync(){
        return await ra.get('/list');
    }

    async createAsync(email,mobile,name){
        return await ra.put('/create',{email,mobile,name});
    }

    async patchAsync(id,email,mobile,name){
        return await ra.patch(`/${id}`,{email,mobile,name});
    }

    async deleteAsync(id){
        return await ra.delete(`/${id}`);
    }

}

const cs = new contactService();
export default cs;