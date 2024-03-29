import { create } from 'zustand';
import { getUser, getProfile } from '../app/Profiles';
//import apicall from '../app/api';

const ProfileStore = create((set) => ({
    fetchUser: {},
    fetchprofile: null,
    loading: false,
    fetching: false,
    success: false,
    error: "",
    fetchUserData: async (token, pathUsr) => {
      set({ fetchUser: {}, loading: true, fetching: true, success: false, error: "" });
      try {
        const get_User = getUser(token, pathUsr);
        set({fetchUser: await get_User, loading: false, fetching: false, success: true, error: ""}); 
      } catch (error) {
        set({fetchUser: null, loading: false, fetching: false, error: error, success: false});
      }
    },
    fetchProfileData: async (token) => {
        set({fetchprofile: {}, loading: true, fetching: true, success: false, error: "" });
        try {
          const get_Profile = getProfile(token);
          set({fetchprofile: await get_Profile, loading: false, fetching: false, success: true, error: ""});
        } catch (error) {
          set({fetchprofile: null, loading: false, fetching: false, error: error, success: false});
        }
    }
  }));

  export default ProfileStore;