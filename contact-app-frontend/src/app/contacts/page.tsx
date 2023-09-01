import { PAGINATION_LIMIT } from "@/config/constant";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { NextReduxWrapper } from "@/redux/next-redux-wrapper";
import { RootDispatch, RootState } from "@/redux/store";
import { getAllContacts } from "@/services/contacts";

import Contacts from "./contacts";

export default async function ConactPage() {
  const dipatch: RootDispatch = useAppDispatch();
  await dipatch(
    getAllContacts({ params: { limit: PAGINATION_LIMIT, offset: 0 } })
  );

  const hyderateStates = useAppSelector((state: RootState) => state);

  return (
    <NextReduxWrapper hydrateStates={hyderateStates}>
      <Contacts />
    </NextReduxWrapper>
  );
}
