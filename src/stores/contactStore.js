import { computed, observable, action } from "mobx";
import contactService from '../services/contactService';
import { toast } from 'react-toastify';

class contactStore {

    @observable list = [];
    @observable working = false;

    addName = '';
    addEmail = '';
    addMobile = '';

    editName = '';
    editEmail = '';
    editMobile = '';

    @action async listAsync() {
        this.working = true;
        const res = await contactService.listAsync();
        if (res.success) {
            let resList = res.data;
            this.list = resList;
            this.working = false;
            return toast.success(res.message);
        }
        this.working = false;
        return toast.error(res.message);
    }

    @action async createAsync() {
        this.working = true;
        const res = await contactService.createAsync(this.addEmail, this.addMobile, this.addName);
        if (res.success) {
            this.addName = '';
            this.addEmail = '';
            this.addMobile = '';
            this.listAsync();
            this.working = false;
            return toast.success(res.message);
        }
        this.working = false;
        return toast.error(res.message);
    }

    @action async patchAsync(id) {
        const res = await contactService.patchAsync(id, this.editEmail, this.editMobile, this.editName);
        this.editName = '';
        this.editEmail = '';
        this.editMobile = '';
        if (res.success) {
            this.listAsync();
            return toast.success(res.message);
        }
        return toast.error(res.message);
    }

    @action async deleteAsync(id) {
        const res = await contactService.deleteAsync(id);
        if (res.success) {
            this.listAsync();
            return toast.success(res.message);
        }
        return toast.error(res.message);
    }
}

const cs = new contactStore();
export default cs;