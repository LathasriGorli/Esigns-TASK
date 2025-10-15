export const columns = [
    {
      accessorFn: (row: any) => row.title,
      id: "title",
      header: () => <span>Title</span>,
      footer: (props: any) => props.column.id,
      cell: (props: any) => (
        <div className="capitalize">{props.getValue()}</div>
      ),
      size: 200,
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: ({ row }: any) => (
        <span
          className={
            row.original.status === "ACTIVE"
              ? "text-green-500"
              : "text-red-500"
          }
        >
          {row.original.status
            ? row.original.status.charAt(0).toUpperCase() +
              row.original.status.slice(1).toLowerCase()
            : ""}
        </span>
      ),
    },
    {
      header: "Created By",
      accessorFn: (row: any) =>
        `${row.user_id?.first_name ?? ""} ${row.user_id?.last_name ?? ""}`,
    },
  ];

