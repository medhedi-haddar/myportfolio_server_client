
import axios from 'axios';
import moment from 'moment';

    const getAboutMe = async ()=> {
        const response  = await axios.get('/api/about_me');
        console.log(response);
        
        if(response.data.data[0]){
            const datares = response.data.data[0];
            const data = {
                id : datares._id,
                lastName : datares.lastName,
                firstName : datares.firstName,
                description : datares.description,
                git_link : datares.git_link,
                updateDate : moment(Number(datares.update_date)).format('MMMM Do YYYY, h:mm:ss'),
                profileImage : datares.profileImage.url,
                cv : datares.cv.url
            }
            return data;
        }
        return null;

    }
    
    const getProjects = async () => {
        const response  = await axios.get('/api/projects');
        return response.data.data
    }
    
    const getProject = async (id) => {
        if(id){
            const response  = await axios.get('/api/project/'+id);
            return response.data.data
        }
    }
    
    const deleteProject = async (id) =>{
        const response  = await axios.post('/api/delete_project/'+id);
        return response.data.data
    }

    const getSkills= async () => {
        
        const response  = await axios.get('/api/skills');
        if(response.data.data[0]){
            const datares = response.data.data[0];
            datares.skills.forEach(skill =>{
                delete skill._id;
                delete skill.update_date;
                delete skill.__v;
            });
            var obj = datares.skills.slice();
            obj.sort((firstItem, secondItem) => firstItem.order - secondItem.order);
            const data = {
                _id : datares._id,
                title : datares.title,
                description : datares.description,
                skills : obj
            }
            return data;
        }
        return null;
        
    }

    const getExperiences = async ()=>{
        const response  = await axios.get('/api/experiences');
        // console.log( response.data.data );
        const datares = response.data.data;
        const result = [];
        datares.forEach((item)=>{
            let data = {
                _id: item._id,
                title : item.title,
                entreprise : item.entreprise,
                description : item.description,
                beginDate : moment(Number(item.beginDate)).format('MMMM YYYY'),
                endDate : moment(Number(item.endDate)).format('MMMM YYYY'),
                tags : item.tags
            }
            result.push(data);
        });
        console.log(result)
        return result;
    }

    const addExperience = async (data) =>{
        const response  = await axios.post('/api/add_experience',data);
        return response.data.data
    }
export {
    getAboutMe,
    getSkills,
    getProjects,
    getProject,
    deleteProject,
    getExperiences,
    addExperience
}


