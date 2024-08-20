import React, { useState } from "react";
import { FormSearchCargo } from "../form";
import { TableCargo } from "../table";
import { Pagination } from "antd";
import { ModalCargo } from "../modal";

const INIT_MODAL = { open: false }

const Cargo = (props) => {
  const { } = props;
  const [open, setOpen] = useState(INIT_MODAL)

  return (
    <div>
      <section>
        <FormSearchCargo
          setOpen={setOpen}
        />
      </section>
      <section className='mt-5'>
        <TableCargo
          setOpen={setOpen}
        />
      </section>
      <section className='mt-5'>
        <div className='flex justify-center'>
          <Pagination
            defaultCurrent={1}
            defaultPageSize={10}
            current={1}
            pageSize={10}
            total={2}
          />
        </div>
      </section>
      <ModalCargo
        open={open.open}
        setOpen={setOpen}
      />
    </div>
  );
};

export default React.memo(Cargo);
