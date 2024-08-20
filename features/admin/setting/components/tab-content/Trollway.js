import React from "react";
import { FormSearchTrollway } from "../form";
import { TableTrollway } from "../table";

const Trollway = (props) => {
  const { setOpen } = props;

  return (
    <div>
      <FormSearchTrollway />
      <TableTrollway setOpen={setOpen} />
    </div>
  );
};

export default React.memo(Trollway);
