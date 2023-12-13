import * as amplitude from "@amplitude/analytics-browser";
export enum AmplitudeEventType {
  LOGIN = "login",
  CREATE_LIST = "create_list",
  EDIT_LIST = "edit_list",
  LIKE_LIST = "like_list",
  UNLIKE_LIST = "unlike_list",
  CREATE_LIST_COMMENT = "create_list_comment",
}

export const Amplitude = (() => {
  const trackEvent = (event: AmplitudeEventType, data?: any) => {
    try {
      amplitude.track(event, data);
    } catch (error) {
      console.error(error);
    }
  };

  const setUser = (userId: string) => {
    try {
      amplitude.setUserId(userId);
    } catch (error) {
      console.error(error);
    }
  };

  return { trackEvent, setUser };
})();
