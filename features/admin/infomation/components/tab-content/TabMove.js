import React, { useMemo, useState } from "react";
import { FieldSearchMove } from "../field";
import DetailMove from "../detail/DetailMove";
import { TableMove } from "../table";

const TabMove= (props) => {
  const [step, setStep] = useState(1);

  const renderDetail = useMemo(() => {
    switch (step) {
      case 1:
        return (
          <div>
            <FieldSearchMove />
            <TableMove setStep={setStep} />
          </div>
        );
      case 2:
        return <DetailMove setStep={setStep} />;
      default:
        return null;
    }
  }, [step]);

  return (
    <>
      {renderDetail}
    </>
  );
};

export default React.memo(TabMove);
