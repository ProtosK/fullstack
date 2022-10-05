import actionTypes from './actionTypes';
import {
  getAllCodeService,
  createNewUserService,
  getAllUsers,
  deleteUserService,
  editUserService,
  getTopDoctorHomeService,
} from '../../services/userService';
import { toast } from 'react-toastify';

// export const fetchGenderStart = () => ({
//   type: actionTypes.FETCH_GENDER_START,
// });

export const fetchGenderStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeService('GENDER');
      if (res && res.errCode === 0) {
        dispatch(fetchGenderSuccess(res.data));
        // bọc trong dispatch thì Redux mới hiểu đường dẫn đi đâu, làm gì mà Redux đã map trước đó.
      } else {
        dispatch(fetchGenderFail());
      }
    } catch (e) {
      dispatch(fetchGenderFail());
      console.log('fetchGenderStart err: ', e);
    }
  };
};
export const fetchGenderSuccess = (genderData) => ({
  type: actionTypes.FETCH_GENDER_SUCCESS,
  data: genderData,
});
export const fetchGenderFail = () => ({
  type: actionTypes.FETCH_GENDER_FAILED,
});

// Actions lấy dữ liệu trong Redux
export const fetchPositionStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeService('POSITION');
      if (res && res.errCode === 0) {
        dispatch(fetchPositionSuccess(res.data));
      } else {
        dispatch(fetchPositionFail());
      }
    } catch (e) {
      dispatch(fetchPositionFail());
      console.log('fetchPositionStart err: ', e);
    }
  };
};
export const fetchPositionSuccess = (positionData) => ({
  type: actionTypes.FETCH_POSITION_SUCCESS,
  data: positionData,
});
export const fetchPositionFail = () => ({
  type: actionTypes.FETCH_POSITION_FAILED,
});

// Actions lấy dữ liệu trong Redux
export const fetchRoleStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeService('ROLE');
      if (res && res.errCode === 0) {
        dispatch(fetchRoleSuccess(res.data));
      } else {
        dispatch(fetchRoleFail());
      }
    } catch (e) {
      dispatch(fetchRoleFail());
      console.log('fetchRoleStart err: ', e);
    }
  };
};
export const fetchRoleSuccess = (roleData) => ({
  type: actionTypes.FETCH_ROLE_SUCCESS,
  data: roleData,
});
export const fetchRoleFail = () => ({
  type: actionTypes.FETCH_ROLE_FAILED,
});

// Actions tạo mới user
export const createNewUser = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await createNewUserService(data); // truyền data cho backend
      if (res && res.errCode === 0) {
        toast.success('🦄 Create a new user succeed!');
        dispatch(saveUserSuccess());
        dispatch(fetchAllUsersStart()); //save lại rồi get all để render ra table, để tạm
      } else {
        toast.error('Create a new user err!');
        dispatch(saveUserFail());
      }
    } catch (e) {
      dispatch(saveUserFail());
      console.log('createNewUser err: ', e);
    }
  };
};
export const saveUserSuccess = () => ({
  type: actionTypes.CREATE_USER_SUCCESS,
});
export const saveUserFail = () => ({
  type: actionTypes.CREATE_USER_FAILED,
});

// lấy all users
export const fetchAllUsersStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllUsers('ALL');
      if (res && res.errCode === 0) {
        let users = res.users.reverse(); // hàm reverse là sắp xếp thứ tự mới lên trên
        dispatch(fetchAllUsersSuccess(users));
      } else {
        toast.error('Fetch all user err!');
        dispatch(fetchAllUsersFail());
      }
    } catch (e) {
      toast.error('Fetch all user err!');
      dispatch(fetchAllUsersFail());
      console.log('fetchAllUsersFail err: ', e);
    }
  };
};
export const fetchAllUsersSuccess = (data) => ({
  type: actionTypes.FETCH_ALL_USERS_SUCCESS,
  users: data,
});
export const fetchAllUsersFail = () => ({
  type: actionTypes.FETCH_ALL_USERS_FAILED,
});

// DELETE A USER
export const deleteUser = (userId) => {
  return async (dispatch, getState) => {
    try {
      let res = await deleteUserService(userId);
      console.log(res);
      if (res && res.errCode === 0) {
        toast.success('Delete the user succeed!');
        dispatch(deleteUserSuccess());
        dispatch(fetchAllUsersStart()); //save lại rồi get all để render ra table
      } else {
        toast.error('Delete the user err!');
        dispatch(deleteUserFail());
      }
    } catch (e) {
      dispatch(deleteUserFail());
      console.log('deleteUser err: ', e);
    }
  };
};
export const deleteUserSuccess = () => ({
  type: actionTypes.DELETE_USER_SUCCESS,
});
export const deleteUserFail = () => ({
  type: actionTypes.DELETE_USER_FAILED,
});

// EDIT A USER
export const editUser = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await editUserService(data);
      if (res && res.errCode === 0) {
        toast.success('Update the user succeed!');
        dispatch(editUserSuccess());
        dispatch(fetchAllUsersStart()); //save lại rồi get all để render ra table
      } else {
        toast.error('Update the user err!');
        dispatch(editUserFail());
      }
    } catch (e) {
      toast.error('Update the user err!');
      dispatch(editUserFail());
      console.log('Update the user err!: ', e);
    }
  };
};
export const editUserSuccess = () => ({
  type: actionTypes.DELETE_USER_SUCCESS,
});
export const editUserFail = () => ({
  type: actionTypes.DELETE_USER_FAILED,
});

export const fetchTopDoctor = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getTopDoctorHomeService(+10);
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_TOP_DOCTORS_SUCCESS,
          dataDoctors: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_TOP_DOCTORS_FAILED,
        });
      }
    } catch (e) {
      console.log('FETCH_TOP_DOCTORS_FAILED!: ', e);
      dispatch({
        type: actionTypes.FETCH_TOP_DOCTORS_FAILED,
      });
    }
  };
};
