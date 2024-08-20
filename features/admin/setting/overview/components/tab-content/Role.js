import React, { useState } from "react";
import { FormSearchRole } from "../form";
import { TableRole } from "../table";
import { Pagination } from "antd";
import { ModalRole } from "../modal";

const INIT_MODAL = { open: false }

const Role = (props) => {
  const { } = props;
  const [open, setOpen] = useState(INIT_MODAL)

  return (
    <div>
      <section>
        <FormSearchRole
          setOpen={setOpen}
        />
      </section>
      <section className='mt-5'>
        <TableRole
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
      <ModalRole
        open={open.open}
        setOpen={setOpen}
      />
    </div>
  );
};

export default React.memo(Role);
