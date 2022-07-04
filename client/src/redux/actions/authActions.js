import axios from "axios";

import jwt_decode from "jwt-decode";

import {
  BASE_URL,
  VERIFY_EMAIL,
  VERIFY_OTP,
  ADD_USER_DETAILS,
  LOGIN_WITH_GOOGLE,
  LOGIN_WITH_GOOGLE_ERROR,
  LOGIN_WITH_EMAIL,
  CHECKING_ERROR,
  USER_LOGOUT,
  VERIFY_EMAIL_FOR_RESET,
  RESET_PASSWORD,
  EDIT_PROFILE,
  RESET_PROFILE_STATUS,
  GET_DASHBOARD_STATS,
  RESET_ERROR_MESSAGE,
  CHANGE_PASSWORD,
} from "../constants/AllConstants";

export const verifyEmail = (email) => async (dispatch) => {
  try {
    const emailResponse = await axios.post(
      BASE_URL + "/auth/send-email-register-otp",
      {
        email: email,
      }
    );

    dispatch({
      type: VERIFY_EMAIL,
      payload: emailResponse,
    });
  } catch (error) {
    if (error.response) {
      dispatch({
        type: CHECKING_ERROR,
        payload: error.response,
      });
    }
  }
};

export const verifyEmailForReset = (email) => async (dispatch) => {
  try {
    const emailResponseforReset = await axios.post(
      BASE_URL + "/auth/send-forgot-password-otp",
      {
        email: email,
      }
    );

    dispatch({
      type: VERIFY_EMAIL_FOR_RESET,
      payload: emailResponseforReset,
    });
  } catch (error) {
    if (error.response) {
      dispatch({
        type: CHECKING_ERROR,
        payload: error.response,
      });
    }
  }
};

export const verifyOtp = (otp, otpId, Verification) => async (dispatch) => {
  try {
    const OtpResponse = await axios.post(BASE_URL + "/otp/verify-otp", {
      otp_id: otpId,
      otp: otp,
      verification_type: Verification,
    });

    dispatch({
      type: VERIFY_OTP,
      payload: OtpResponse,
    });
  } catch (error) {
    if (error.response) {
      dispatch({
        type: CHECKING_ERROR,
        payload: error.response,
      });
    }
  }
};

export const verifyOtpForResetPassword = (otp, otpId) => async (dispatch) => {
  try {
    const OtpResponse = await axios.post(BASE_URL + "/otp/verify-otp", {
      otp_id: otpId,
      otp: otp,
      verification_type: "EMAIL_VERIFICATION",
    });

    dispatch({
      type: VERIFY_OTP,
      payload: OtpResponse,
    });
  } catch (error) {
    if (error.response) {
      dispatch({
        type: CHECKING_ERROR,
        payload: error.response,
      });
    }
  }
};

export const addUserDetails = (data) => async (dispatch) => {
  try {
    const addUserRes = await axios.post(BASE_URL + "/auth/register", data);

    dispatch({
      type: ADD_USER_DETAILS,
      payload: addUserRes,
    });
  } catch (error) {
    if (error.response) {
      dispatch({
        type: CHECKING_ERROR,
        payload: error.response,
      });
    }
  }
};

export const loginWithGoogle = (id_token) => async (dispatch) => {
  try {
    const loginUserRes = await axios.post(BASE_URL + "/auth/google-login", {
      id_token: id_token,
    });

    dispatch({
      type: LOGIN_WITH_GOOGLE,
      payload: loginUserRes,
    });
  } catch (error) {
    if (error.response) {
      dispatch({
        type: LOGIN_WITH_GOOGLE_ERROR,
        payload: error.response,
      });
    }
  }
};

export const signInWithEmail = (email, password) => async (dispatch) => {
  try {
    const loginUserRes = await axios.post(BASE_URL + "/auth/login", {
      email: email,
      password: password,
    });

    dispatch({
      type: LOGIN_WITH_EMAIL,
      payload: loginUserRes,
    });
  } catch (error) {
    if (error.response) {
      dispatch({
        type: CHECKING_ERROR,
        payload: error.response,
      });
    }
  }
};

export const logoutUser = (token) => async (dispatch) => {
  try {
    const res = await axios.delete(BASE_URL + "/auth/logout", {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    dispatch({
      type: USER_LOGOUT,
      payload: res,
    });
  } catch (error) {
    if (error.response) {
      console.log(error.response);
      dispatch({
        type: CHECKING_ERROR,
        payload: error.response,
      });
    }
  }
};

export const resetPasswordAction =
  (email, password, reset_request_id) => async (dispatch) => {
    try {
      const resetResponse = await axios.post(
        BASE_URL + "/auth/reset-password",
        {
          email,
          password,
          reset_request_id,
        }
      );

      dispatch({
        type: RESET_PASSWORD,
        payload: resetResponse,
      });
    } catch (error) {
      if (error.response) {
        console.log(error.response);
        dispatch({
          type: CHECKING_ERROR,
          payload: error.response,
        });
      }
    }
  };

export const changePasswordAction =
  (password, NewPassword) => async (dispatch) => {
    try {
      const token = localStorage.getItem("jwt");
      const decoded = jwt_decode(token);
      const changeResponse = await axios.put(
        BASE_URL + "/auth/change-password",
        {
          CurrentPassword: password,
          NewPassword: NewPassword,
        },
        {
          headers: {
            authorization: `Bearer ${decoded.auth_token}`,
          },
        }
      );

      dispatch({
        type: CHANGE_PASSWORD,
        payload: changeResponse,
      });
    } catch (error) {
      if (error.response) {
        console.log(error.response);
        dispatch({
          type: CHECKING_ERROR,
          payload: error.response,
        });
      }
    }
  };

export const editProfile = (formData) => async (dispatch) => {
  try {
    const token = localStorage.getItem("jwt");
    const decoded = jwt_decode(token);
    const res = await axios.put(BASE_URL + "/auth/edit-profile", formData, {
      headers: {
        authorization: `Bearer ${decoded.auth_token}`,
      },
    });

    dispatch({
      type: EDIT_PROFILE,
      payload: res,
    });
  } catch (error) {
    if (error.response) {
      console.log(error.response);
      dispatch({
        type: CHECKING_ERROR,
        payload: error.response,
      });
    }
  }
};

export const resetStatus = (dispatch) => {
  dispatch({
    type: RESET_PROFILE_STATUS,
  });
};

export const resetErrorMessage = (dispatch) => {
  dispatch({
    type: RESET_ERROR_MESSAGE,
  });
};

export const getDashBoardStats = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("jwt");
    const decoded = jwt_decode(token);

    const res = await axios.get(BASE_URL + "/auth/get-dashboard-statistics", {
      headers: {
        authorization: `Bearer ${decoded.auth_token}`,
      },
    });

    dispatch({
      type: GET_DASHBOARD_STATS,
      payload: res,
    });
  } catch (err) {
    console.log(err);
  }
};
