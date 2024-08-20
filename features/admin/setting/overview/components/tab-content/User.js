import React from "react";
import { TableUser } from "../table";
import { FormSearchUser } from "../form";

const User = (props) => {
  const { } = props;

  return (
    <div>
      <section>
        <FormSearchUser />
      </section>
      <section className='mt-5'>
        <TableUser />
      </section>
    </div>
  );
};

export default React.memo(User);
