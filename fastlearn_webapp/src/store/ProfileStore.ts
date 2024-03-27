import { create } from 'zustand';
import { getProfile } from '../app/Profiles';

const ProfileStore = create((set) => ({
    profile: null,
    loading: false,
    fetching: false,
    success: false,
    error: "",
    fetchData: async (token) => {
      set({ profile: null, loading: true, fetching: true, success: false });
      // Fetch data here
      getProfile(token)
        .then(function(data){
            set({profile: data, loading: false, fetching: false, error: "", success: true});
        })
        .catch(function(err){
            set({profile: null, loading: false, fetching: false, error: "", success: true});
        })
    }
  }));

  export default ProfileStore;