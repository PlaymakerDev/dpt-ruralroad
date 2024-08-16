import React, { useMemo, useState } from "react";
import { FieldSearchWim } from "../field";
import { TableWim } from "../table";
import DetailWim from "../detail/DetailWim";


const TabWim = (props) => {
  const {setModalWim} = props;
  const [stepWim, setStepWim] = useState(1);

  const renderDetailWim = useMemo(() => {
    switch (stepWim) {
      case 1:
        return (
          <div>
            <FieldSearchWim />
            <TableWim setStepWim={setStepWim} />
          </div>
        );
      case 2:
        return <DetailWim setStepWim={setStepWim} setModalWim={setModalWim} />;
      default:
        return null;
    }
  }, [stepWim]);

  return (
  <>
  {renderDetailWim}
  </>
  );
};

export default React.memo(TabWim);
