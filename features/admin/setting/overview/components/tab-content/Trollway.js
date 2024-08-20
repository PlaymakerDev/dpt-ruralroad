import React, { useState } from "react";
import { FormSearchTrollway } from "../form";
import { TableTrollway } from "../table";
import { ModalTrollway } from '../modal'

const INIT_MODAL = { open: false }

const Trollway = (props) => {
  const { } = props;
  const [open, setOpen] = useState(INIT_MODAL)

  return (
    <div>
      <section>
        <FormSearchTrollway
          setOpen={setOpen}
        />
      </section>
      <section className='mt-5'>
        <TableTrollway
          setOpen={setOpen}
        />
      </section>
      <ModalTrollway
        open={open.open}
        setOpen={setOpen}
      />
    </div>
  );
};

export default React.memo(Trollway);
