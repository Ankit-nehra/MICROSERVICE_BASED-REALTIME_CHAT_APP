
const sanitizeUser = (user)=>{

return {

_id:user._id,

email:user.email,

};

};


export default sanitizeUser;