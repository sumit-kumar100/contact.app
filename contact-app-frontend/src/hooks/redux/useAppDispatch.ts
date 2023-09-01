import { store } from "@/redux/store";

const useAppDispatch = (): typeof store.dispatch => {
  return store.dispatch;
};

export default useAppDispatch;
