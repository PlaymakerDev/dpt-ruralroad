import React, { useMemo, useState } from "react";
import { FieldSearchWeigh } from "../field";
import TableWeigh from "../table/TableWeigh";
import Detail from "../detail/Detail";

const TabWeigh = (props) => {
  const { setOpen } = props;
  const [step, setStep] = useState(1);

  const renderDetail = useMemo(() => {
    switch (step) {
      case 1:
        return (
          <div>
            <FieldSearchWeigh />
            <TableWeigh setStep={setStep} />
          </div>
        );
      case 2:
        return <Detail setStep={setStep} setOpen={setOpen} />;
      default:
        return null;
    }
  }, [step, setOpen]);

  return (
    <>
      {renderDetail}
    </>
  );
};

export default React.memo(TabWeigh);
