import InfoPanel from '../infoPanel/infoPanel';
import Cells from '../cells/cells';
import './field.scss';
function Field() {
  return (
    <div className='fieldWrapper'>
      <InfoPanel></InfoPanel>
      <Cells></Cells>
    </div>
  );
}

export default Field;
