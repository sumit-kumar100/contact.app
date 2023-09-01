import { RootState, store } from "@/redux/store";

import useServerSideDispatch from "./useAppDispatch";
import useClientSideDispatch from "./useDispatch";
import useClientSideSelector from "./useSelector";
import useServerSideSelector from "./userAppSelector";

export const useAppDispatch: () => typeof store.dispatch =
  useServerSideDispatch;

export const useAppSelector: <T>(selector: (state: RootState) => T) => T =
  useServerSideSelector;

export const useDispatch: () => typeof store.dispatch = useClientSideDispatch;

export const useSelector: <T>(selector: (state: RootState) => T) => T =
  useClientSideSelector;
