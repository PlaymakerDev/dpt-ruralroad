import React from "react";
import { TableUser } from "../table";
import FormSearchUser from "../form/FormSearchUser";

const User = (props) => {
  const { setOpen } = props;

  return (
    <div>
      <FormSearchUser />
      <TableUser setOpen={setOpen} />
    </div>
  );
};

export default React.memo(User);
