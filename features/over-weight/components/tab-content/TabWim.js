import React, { useMemo, useState } from "react";
import { FieldSearchWim } from "../field";
import { TableWim } from "../table";
import DetailWIM from "../detail/DetailWim";

const MainPageWIM = (props) => {
  const { setStep } = props;
  
  return (
    <div>
      <FieldSearchWim />
      <TableWim setStep={setStep} />
    </div>
  )
}

const TabWim = (props) => {
  const { setOpen } = props;
  const [step, setStep] = useState(1);

  const renderDetailWim = useMemo(() => {
    switch (step) {
      case 1:
        return (
          <MainPageWIM
            setStep={setStep}
          />
        );
      case 2:
        return (
          <DetailWIM
            setStep={setStep}
            setOpen={setOpen} />
        );
      default:
        return null;
    }
  }, [step, setOpen]);

  return (
    <>
      {renderDetailWim}
    </>
  );
};

export default React.memo(TabWim);
