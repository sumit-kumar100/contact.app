import {
  DateFilter,
  DropdownFilter,
  TextFilter,
} from "@/components/data-filters";
import { Separator } from "@/components/ui/seperator";
import { useDispatch, useSelector } from "@/hooks/redux";
import { genderOptions } from "@/lib/dropdowns";
import { RootDispatch, RootState } from "@/redux/store";
import { setParams } from "@/services/contacts";

export const FirstNameColumnHeader = () => {
  const disptach: RootDispatch = useDispatch();
  const { params } = useSelector((state: RootState) => state.contact);

  return (
    <div className="min-w-[140px] max-w-[140px] py-2">
      <div className="text-center">First name</div>
      <Separator className="my-2" />
      <TextFilter
        value={params.firstName}
        onChange={(value) => disptach(setParams({ firstName: value }))}
      />
    </div>
  );
};

export const LastNameColumnHeader = () => {
  const disptach: RootDispatch = useDispatch();
  const { params } = useSelector((state: RootState) => state.contact);
  return (
    <div className="min-w-[140px] max-w-[140px] py-2">
      <div className="text-center">Last name</div>
      <Separator className="my-2" />
      <TextFilter
        value={params.lastName}
        onChange={(value) => disptach(setParams({ lastName: value }))}
      />
    </div>
  );
};

export const PhoneColumnHeader = () => {
  const disptach: RootDispatch = useDispatch();
  const { params } = useSelector((state: RootState) => state.contact);
  return (
    <div className="min-w-[140px] max-w-[140px] py-2">
      <div className="text-center">Phone no.</div>
      <Separator className="my-2" />
      <TextFilter
        value={params.phone}
        onChange={(value) => disptach(setParams({ phone: value }))}
      />
    </div>
  );
};

export const EmailColumnHeader = () => {
  const disptach: RootDispatch = useDispatch();
  const { params } = useSelector((state: RootState) => state.contact);
  return (
    <div className="min-w-[200px] max-w-[140px] py-2">
      <div className="text-center">Email ID</div>
      <Separator className="my-2" />
      <TextFilter
        value={params.email}
        onChange={(value) => disptach(setParams({ email: value }))}
      />
    </div>
  );
};

export const GenderColumnHeader = () => {
  const disptach: RootDispatch = useDispatch();
  const { params } = useSelector((state: RootState) => state.contact);
  return (
    <div className="min-w-[140px] max-w-[140px] py-2">
      <div className="text-center">Gender</div>
      <Separator className="my-2" />
      <DropdownFilter
        value={params.gender}
        onChange={(value) => disptach(setParams({ gender: value }))}
        options={[{ label: "All", value: "" }, ...genderOptions]}
      />
    </div>
  );
};

export const DobColumnHeader = () => {
  const disptach: RootDispatch = useDispatch();
  const { params } = useSelector((state: RootState) => state.contact);
  return (
    <div className="min-w-[140px] max-w-[140px] py-2">
      <div className="text-center">DOB</div>
      <Separator className="my-2" />
      <DateFilter
        value={params.dateOfBirth}
        onChange={(value) => disptach(setParams({ dateOfBirth: value }))}
      />
    </div>
  );
};

export const StatusColumnHeader = () => {
  const disptach: RootDispatch = useDispatch();
  const { params } = useSelector((state: RootState) => state.contact);
  return (
    <div className="min-w-[140px] max-w-[140px] py-2">
      <div className="text-center">Status</div>
      <Separator className="my-2" />
      <DropdownFilter
        value={params.active}
        onChange={(value) => disptach(setParams({ active: value }))}
        options={[
          { label: "All", value: undefined },
          { label: "Active", value: true },
          { label: "Inactive", value: false },
        ]}
      />
    </div>
  );
};
