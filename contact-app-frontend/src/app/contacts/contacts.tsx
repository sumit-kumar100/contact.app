"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { DataTable } from "@/components/data-table";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "@/components/ui/toast/use-toast";
import { useDispatch, useSelector } from "@/hooks/redux";
import { FulfilledAction, RootDispatch, RootState } from "@/redux/store";
import {
  clearMessage,
  deleteContact,
  getAllContacts,
  setEdit,
  setParams,
} from "@/services/contacts";
import { Contact } from "@/types/contacts";
import { DeleteFormData } from "@/types/globals";
import { ColumnDef } from "@tanstack/react-table";

import { columns } from "./columns";
import { StatusColumnHeader } from "./headers";

const Contacts: React.FC = () => {
  const router: any = useRouter();

  const dispatch: RootDispatch = useDispatch();

  const state = useSelector((state: RootState) => state.contact);

  const handleEdit = (original: Contact) => {
    const { address, ...contactData } = original;
    dispatch(setEdit({ ...contactData, ...address }));
    router.push(`/contacts/edit?id=${original.id}`);
  };

  const handleDelete = async (original: Contact) => {
    let response: FulfilledAction<DeleteFormData, any> = await dispatch(
      deleteContact({ id: original.id })
    );
    if (response.meta.requestStatus === "fulfilled") {
      dispatch(getAllContacts({ params: { ...state.params } }));
    }
  };

  useEffect(() => {
    dispatch(getAllContacts({ params: { ...state.params } }));
  }, [state.params]);

  useEffect(() => {
    if (state.loading === "idle" && !!state.message) {
      toast({
        variant: "default",
        title: state.message,
      });
      dispatch(clearMessage());
    }
  }, [state.message, state.loading]);

  const actionColumn: ColumnDef<Contact> = {
    accessorKey: "Actions",
    header: StatusColumnHeader,
    cell: ({ row: { original } }) => {
      return (
        <div className="flex justify-center gap-2">
          <div className="font-medium">
            {original.active ? (
              <Icons.Check className="ml-2 h-4" />
            ) : (
              <Icons.Cross className="ml-2 h-4" />
            )}{" "}
          </div>
          <Icons.Edit
            className="h-4 cursor-pointer"
            onClick={() => handleEdit(original)}
          />
          <Dialog>
            <DialogTrigger>
              <Icons.Delete className="h-4 cursor-pointer" />
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  Are you sure you want to delete contact?
                </DialogTitle>
                <DialogDescription>
                  This action cannot be undone. This will permanently delete
                  contact data from our servers.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogTrigger>
                  <Button
                    variant="destructive"
                    onClick={() => handleDelete(original)}
                  >
                    Confirm
                  </Button>
                </DialogTrigger>
                <DialogTrigger>
                  <Button variant="default">Cancel</Button>
                </DialogTrigger>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      );
    },
  };

  return (
    <div className="m-8 border-0">
      <div className="mx-6 mb-10 flex justify-between font-bold">
        <h1 className="text-xl">Contacts</h1>
        <Link href={`/contacts/add`}>
          <Button>Add Contact</Button>
        </Link>
      </div>
      <div>
        <DataTable
          columns={[...columns, actionColumn]}
          data={state.data}
          onPaginationChange={setParams}
          initialPaginationState={{
            limit: state.params.limit,
            offset: state.params.offset,
            totalCount: state.pageInfo.count,
          }}
        />
      </div>
    </div>
  );
};

export default Contacts;
