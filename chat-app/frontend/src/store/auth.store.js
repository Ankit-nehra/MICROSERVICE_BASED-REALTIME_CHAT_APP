import { create } from "zustand";
import { persist } from "zustand/middleware";
import { socket } from "../socket/socket";
import { logout as logoutApi } from "../api/auth.api";

const useAuthStore = create(
  persist(

    (set)=>({

      token:null,

      user:null,

      isAuthenticated:false,



      login:({token,user})=>{

        socket.auth={
          token
        };

        if(!socket.connected){

          socket.connect();

        }

        set({

          token,

          user,

          isAuthenticated:true

        });

      },



      // ✅ NEW
      setUser:(user)=>{

        set({
          user
        });

      },



      setToken:(token)=>{

        socket.auth={
          token
        };

        set({
          token
        });

      },



      logout:async()=>{

const token =
useAuthStore.getState().token;


try{

if(token){

await logoutApi();

}

}
catch(error){

console.log(
"Backend logout failed",
error
);

}


// socket disconnect

if(socket.connected){

socket.disconnect();

}


socket.auth={
 token:null
};


// clear storage

localStorage.removeItem(
"auth-storage"
);


set({

token:null,

user:null,

isAuthenticated:false

});


}

    }),

    {

      name:"auth-storage",

      version:1,

      partialize:(state)=>({

        token:state.token,

        user:state.user,

        isAuthenticated:
          state.isAuthenticated

      })

    }

  )

);

export default useAuthStore;