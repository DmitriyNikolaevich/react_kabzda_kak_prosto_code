import { PhotosExportType, ProfileType } from './../types/type';
import { FormAction, stopSubmit } from "redux-form"
import { profileAPI } from "../api/profile-api"
import { UserType } from "../types/type"
import { BaseThunkType, InfernActionTypes } from './reduxStore';


let initialState = {
  newPostText: '',
  profile: {},
  status: '',
  user: null as UserType | null,
  posts: [
    { id: 1, src: 'https://yandex.ru/images/_crpd/1k00Bv363/fda7baVuV/w67q95nBg7VBPpAu-7LnKXyrhEj4EylW7BSmIu6MjelT1Pr9XqSMTOqjaYLH84YDuoIjoVFsofB6WMkxAkA30M_j4v_w6Y_4CAvUfqKTgnBtg_EpjUp0V8Q58zrurNGcewQiQeZsTNRuKsFmQ9vTD46iX6RcdQxYO0W0hF8R23UXPvNexNWXWWlaOPbi1v-tKQ-ogGjbpWdIDBYz1oixAHv0tn0-YJi0Pur5WicbYxtKaiokDDnkPbM5eLiPwaPV1wZ79njJo91Vykh2plY3pZXPwCxM2wUz3Oz2T37cPeBr1Aqh_lCgzAKqHX5Pqx-DtgaGdESxwAWP_fwQz5VT8YvCs9YYQVehpUZM-moOW70BIzAASLPp55A00veOCM0s70DuwdqobCyGNhHSM5szv9JyBgTYJZAZL6HUpF8901H7-rfajBUrPWnS_P5ehpu1ZQfY0ARr3Xe0aK4r1ti1iL-cDqXOQBDcomrRYp_bh39GcnZQQGm0wRsNfGyXNZsFq14jerTpDwVdPsiuahb3BVkH6KQgG5GrPGg-4-IwiRjf1Arl3sAcUH4Gvd6r7xsfVqIerHzJuDkDSUQA7yVHDTemb1rwrRPxTeaMOhpa5x0Rh6jQGE-5e9CAAq-60AUsTziOJdKEnDjiZgmCn-9bJz4O7pR84awpm93MvJPhL3Ur3ouuNBmf4Wm6KDZ-kg-pIbeIlJTnhasAxGbXZhhVtKfQQg3GDIyw5mbpVrvjR7s6coKwpG2YNZN1xCh7OUvN92brAmSVZ-FN8sx6Kk5b6VnfZCQcR7XvjDACb_LMwXij7A7R8rhscPLeiQ4np4OfGr7eFAzhLLn7PdSUd41TacNGa6I0lat1waqwynYmhxX5BzgQWLtdD0BMVpuW3AWoS-gW0Qb8YIAW2tX6v7dLkxYWjiTAtcC597nc3FOp66U3pmu2-MmjUcH2AEJmSvf9ia9Y2PwzDXPAJOp7dvAI', text: 'Post 3', likes: 3 },
    { id: 2, src: 'https://yandex.ru/images/_crpd/1k00Bv363/fda7baVuV/w67q95nBg7VBPpAu-7LnKXyrhEj4EylW7BSmIu6MjelT1Pr9XqSMTOqjaYLH84YDuoIjoVFsofB6WMkxAkA30M_j4v_w6Y_4CAvUfqKTgnBtg_EpjUp0V8Q58zrurNGcewQiQeZsTNRuKsFmQ9vTD46iX6RcdQxYO0W0hF8R23UXPvNexNWXWWlaOPbi1v-tKQ-ogGjbpWdIDBYz1oixAHv0tn0-YJi0Pur5WicbYxtKaiokDDnkPbM5eLiPwaPV1wZ79njJo91Vykh2plY3pZXPwCxM2wUz3Oz2T37cPeBr1Aqh_lCgzAKqHX5Pqx-DtgaGdESxwAWP_fwQz5VT8YvCs9YYQVehpUZM-moOW70BIzAASLPp55A00veOCM0s70DuwdqobCyGNhHSM5szv9JyBgTYJZAZL6HUpF8901H7-rfajBUrPWnS_P5ehpu1ZQfY0ARr3Xe0aK4r1ti1iL-cDqXOQBDcomrRYp_bh39GcnZQQGm0wRsNfGyXNZsFq14jerTpDwVdPsiuahb3BVkH6KQgG5GrPGg-4-IwiRjf1Arl3sAcUH4Gvd6r7xsfVqIerHzJuDkDSUQA7yVHDTemb1rwrRPxTeaMOhpa5x0Rh6jQGE-5e9CAAq-60AUsTziOJdKEnDjiZgmCn-9bJz4O7pR84awpm93MvJPhL3Ur3ouuNBmf4Wm6KDZ-kg-pIbeIlJTnhasAxGbXZhhVtKfQQg3GDIyw5mbpVrvjR7s6coKwpG2YNZN1xCh7OUvN92brAmSVZ-FN8sx6Kk5b6VnfZCQcR7XvjDACb_LMwXij7A7R8rhscPLeiQ4np4OfGr7eFAzhLLn7PdSUd41TacNGa6I0lat1waqwynYmhxX5BzgQWLtdD0BMVpuW3AWoS-gW0Qb8YIAW2tX6v7dLkxYWjiTAtcC597nc3FOp66U3pmu2-MmjUcH2AEJmSvf9ia9Y2PwzDXPAJOp7dvAI', text: 'Post 7', likes: 9 },
    { id: 3, src: 'https://yandex.ru/images/_crpd/1k00Bv363/fda7baVuV/w67q95nBg7VBPpAu-7LnKXyrhEj4EylW7BSmIu6MjelT1Pr9XqSMTOqjaYLH84YDuoIjoVFsofB6WMkxAkA30M_j4v_w6Y_4CAvUfqKTgnBtg_EpjUp0V8Q58zrurNGcewQiQeZsTNRuKsFmQ9vTD46iX6RcdQxYO0W0hF8R23UXPvNexNWXWWlaOPbi1v-tKQ-ogGjbpWdIDBYz1oixAHv0tn0-YJi0Pur5WicbYxtKaiokDDnkPbM5eLiPwaPV1wZ79njJo91Vykh2plY3pZXPwCxM2wUz3Oz2T37cPeBr1Aqh_lCgzAKqHX5Pqx-DtgaGdESxwAWP_fwQz5VT8YvCs9YYQVehpUZM-moOW70BIzAASLPp55A00veOCM0s70DuwdqobCyGNhHSM5szv9JyBgTYJZAZL6HUpF8901H7-rfajBUrPWnS_P5ehpu1ZQfY0ARr3Xe0aK4r1ti1iL-cDqXOQBDcomrRYp_bh39GcnZQQGm0wRsNfGyXNZsFq14jerTpDwVdPsiuahb3BVkH6KQgG5GrPGg-4-IwiRjf1Arl3sAcUH4Gvd6r7xsfVqIerHzJuDkDSUQA7yVHDTemb1rwrRPxTeaMOhpa5x0Rh6jQGE-5e9CAAq-60AUsTziOJdKEnDjiZgmCn-9bJz4O7pR84awpm93MvJPhL3Ur3ouuNBmf4Wm6KDZ-kg-pIbeIlJTnhasAxGbXZhhVtKfQQg3GDIyw5mbpVrvjR7s6coKwpG2YNZN1xCh7OUvN92brAmSVZ-FN8sx6Kk5b6VnfZCQcR7XvjDACb_LMwXij7A7R8rhscPLeiQ4np4OfGr7eFAzhLLn7PdSUd41TacNGa6I0lat1waqwynYmhxX5BzgQWLtdD0BMVpuW3AWoS-gW0Qb8YIAW2tX6v7dLkxYWjiTAtcC597nc3FOp66U3pmu2-MmjUcH2AEJmSvf9ia9Y2PwzDXPAJOp7dvAI', text: 'Post 11', likes: 5 }
  ]
};

const profilePageReducer = (state: InitialState = initialState, action: ActionsType): InitialState => {

  switch (action.type) {

    case 'SocNet/profile/WRITE-WORDS':
      return {
        ...state,
        newPostText: action.newLetter
      }

    case 'SocNet/profile/ADD-POST':
      let newPost = {
        id: state.posts.length + 1,
        src: 'https://yandex.ru/images/_crpd/1k00Bv363/fda7baVuV/w67q95nBg7VBPpAu-7LnKXyrhEj4EylW7BSmIu6MjelT1Pr9XqSMTOqjaYLH84YDuoIjoVFsofB6WMkxAkA30M_j4v_w6Y_4CAvUfqKTgnBtg_EpjUp0V8Q58zrurNGcewQiQeZsTNRuKsFmQ9vTD46iX6RcdQxYO0W0hF8R23UXPvNexNWXWWlaOPbi1v-tKQ-ogGjbpWdIDBYz1oixAHv0tn0-YJi0Pur5WicbYxtKaiokDDnkPbM5eLiPwaPV1wZ79njJo91Vykh2plY3pZXPwCxM2wUz3Oz2T37cPeBr1Aqh_lCgzAKqHX5Pqx-DtgaGdESxwAWP_fwQz5VT8YvCs9YYQVehpUZM-moOW70BIzAASLPp55A00veOCM0s70DuwdqobCyGNhHSM5szv9JyBgTYJZAZL6HUpF8901H7-rfajBUrPWnS_P5ehpu1ZQfY0ARr3Xe0aK4r1ti1iL-cDqXOQBDcomrRYp_bh39GcnZQQGm0wRsNfGyXNZsFq14jerTpDwVdPsiuahb3BVkH6KQgG5GrPGg-4-IwiRjf1Arl3sAcUH4Gvd6r7xsfVqIerHzJuDkDSUQA7yVHDTemb1rwrRPxTeaMOhpa5x0Rh6jQGE-5e9CAAq-60AUsTziOJdKEnDjiZgmCn-9bJz4O7pR84awpm93MvJPhL3Ur3ouuNBmf4Wm6KDZ-kg-pIbeIlJTnhasAxGbXZhhVtKfQQg3GDIyw5mbpVrvjR7s6coKwpG2YNZN1xCh7OUvN92brAmSVZ-FN8sx6Kk5b6VnfZCQcR7XvjDACb_LMwXij7A7R8rhscPLeiQ4np4OfGr7eFAzhLLn7PdSUd41TacNGa6I0lat1waqwynYmhxX5BzgQWLtdD0BMVpuW3AWoS-gW0Qb8YIAW2tX6v7dLkxYWjiTAtcC597nc3FOp66U3pmu2-MmjUcH2AEJmSvf9ia9Y2PwzDXPAJOp7dvAI',
        text: action.post,
        likes: 0
      }

      return {
        ...state,
        posts: [...state.posts, newPost],
        newPostText: ""
      }

    case 'SocNet/profile/SET_USER_PROFILE':
      return {
        ...state,
        user: action.userProfile
      }

    case 'SocNet/profile/SET_STATUS':
      return {
        ...state,
        status: action.status
      }

    case 'SocNet/profile/DELETE_POST':
      return {
        ...state,
        posts: state.posts.filter(p => p.id !== action.postID)
      }

    case 'SocNet/profile/SAVE_PHOTO_SUCCESS':
      return {
        ...state,
        profile: {...state.profile, photos: action.photos}
      }

    default:
      return state
  }
}

export const actions = {
  writeWordsActionCreator: (newLetter: string) => ({
    type: 'SocNet/profile/WRITE-WORDS', newLetter
  } as const),
  addPostActionCreator: (post: string) => ({
    type: 'SocNet/profile/ADD-POST', post
  } as const),
  setUserProfile: (userProfile: UserType) => ({
    type: 'SocNet/profile/SET_USER_PROFILE', userProfile
  } as const),
  setUserStatus: (status: string) => ({
    type: 'SocNet/profile/SET_STATUS', status
  } as const),
  deletePost: (postID: number) => ({
    type: 'SocNet/profile/DELETE_POST', postID
  } as const),
  savePhotoSuccess: (photos: PhotosExportType) => ({
    type: 'SocNet/profile/SAVE_PHOTO_SUCCESS', photos
  } as const)
}


export const getUserThunk = (user: number): ThunkType => {
  return async (dispatch) => {
    let response = await profileAPI.getUser(user)
    dispatch(actions.setUserProfile(response))
  }
}

export const getUserStatusThunk = (userID: number): ThunkType => {
  return async (dispatch) => {
    let response = await profileAPI.getStatus(userID)
    dispatch(actions.setUserStatus(response))
  }
}

export const updateUserStatusThunk = (userStatus: string): ThunkType => {
  return async (dispatch) => {
    let response = await profileAPI.updateStatus(userStatus)
    if (response.resultCode === 0) {
      dispatch(actions.setUserStatus(userStatus))
    }
  }
}

export const savePhotoThunk = (file: File): ThunkType => {
  return async (dispatch) => {
    let response = await profileAPI.savePhoto(file)
    if (response.data.resultCode === 0) {
      dispatch(actions.savePhotoSuccess(response.data.data.photos))
    }
  }
}

export const saveProfileDataThunk = (profileData: ProfileType, editModeEditor: any): BaseThunkType<ActionsType | FormAction> => {
  return async (dispatch, getState) => {
    let response = await profileAPI.saveProfileData(profileData)
    const userID = getState().auth.userId
    if (response.resultCode === 0) {
      if (userID !== null) {
        dispatch(getUserThunk(userID))
        editModeEditor(false)
      } else {
        throw new Error("Cant be null")
      }
      
    } else {
      dispatch(stopSubmit("profileDataForm", {_error: response.messages[0]}))
      return Promise.reject(response.messages[0])
    }
  }
}

export default profilePageReducer


type InitialState = typeof initialState

type ActionsType = InfernActionTypes<typeof actions>

type ThunkType = BaseThunkType<ActionsType>