
import axios from 'axios';
import moment from 'moment';


    const getAboutMe = async ()=> {
        const response  = await axios.get('/api/about_me');
        const datares = response.data[0];
        const data = {
            id : datares._id,
            lastName : datares.lastName,
            firstName : datares.firstName,
            description : datares.description,
            gitHublink : datares.git_link,
            updateDate : moment(Number(datares.update_date)).format('MMMM Do YYYY, h:mm:ss'),
            profileImage : datares.profileImage
        }
        return data;
    
    }
    
    
    const updateAboutMe= () => {
        
    }
    
    const addGallery= () => {
        
    
       
    }

export {
    getAboutMe,
    addGallery,
    updateAboutMe
}


