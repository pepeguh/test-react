import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userData: [], 
  userDataArchive: [], 
};
const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
      setUsers: (state, action) => {
        state.userData = action.payload; 
      },
      setUsersArchive:(state, action) =>{
        state.userDataArchive = action.payload
      },
      updateUser:(state, action)=>{
        const updatedUser = action.payload;
        const userIndex = state.userData.findIndex(user => user.id ===updatedUser.id);
        if(userIndex !== -1){
          state.userData[userIndex] = updatedUser;

        }else{
          state.userDataArchive[userIndex] = updatedUser;
        }
      }
    },
  });
  
  export const { setUsers, setUsersArchive,updateUser } = usersSlice.actions;
  export default usersSlice.reducer;