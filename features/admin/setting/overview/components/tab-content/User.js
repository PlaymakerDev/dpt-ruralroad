import React, { useState } from "react";
import { TableUser } from "../table";
import { FormSearchUser } from "../form";
import { ModalUser } from "../modal";

const INIT_MODAL = { open: false }

const User = (props) => {
  const { } = props;
  const [open, setOpen] = useState(INIT_MODAL)

  return (
    <div>
      <section>
        <FormSearchUser />
      </section>
      <section className='mt-5'>
        <TableUser
          setOpen={setOpen}
        />
      </section>
      <ModalUser
        open={open.open}
        setOpen={setOpen}
      />
    </div>
  );
};

export default React.memo(User);
