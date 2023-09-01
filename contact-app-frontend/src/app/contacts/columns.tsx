"use client";

import { Icons } from "@/components/icons";
import { Contact } from "@/types/contacts";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

import {
  DobColumnHeader,
  EmailColumnHeader,
  FirstNameColumnHeader,
  GenderColumnHeader,
  LastNameColumnHeader,
  PhoneColumnHeader,
  StatusColumnHeader,
} from "./headers";

export const columns: ColumnDef<Contact>[] = [
  {
    accessorKey: "firstName",
    header: FirstNameColumnHeader,
    cell: ({ row: { original } }) => {
      return (
        <div className="text-center font-medium">{original.firstName}</div>
      );
    },
  },
  {
    accessorKey: "lastName",
    header: LastNameColumnHeader,
    cell: ({ row: { original } }) => {
      return <div className="text-center font-medium">{original.lastName}</div>;
    },
  },
  {
    accessorKey: "phone",
    header: PhoneColumnHeader,
    cell: ({ row: { original } }) => {
      return <div className="text-center font-medium">{original.phone}</div>;
    },
  },
  {
    accessorKey: "email",
    header: EmailColumnHeader,
    cell: ({ row: { original } }) => {
      return <div className="text-center font-medium">{original.email}</div>;
    },
  },
  {
    accessorKey: "gender",
    header: GenderColumnHeader,
    cell: ({ row: { original } }) => {
      return <div className="text-center font-medium">{original.gender}</div>;
    },
  },
  {
    accessorKey: "dateOfBirth",
    header: DobColumnHeader,
    cell: ({ row: { original } }) => {
      return (
        <div className="text-center font-medium">
          {format(new Date(original.dateOfBirth), "yyyy-MM-dd")}
        </div>
      );
    },
  }
];
