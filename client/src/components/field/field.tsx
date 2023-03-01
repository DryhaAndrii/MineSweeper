import InfoPanel from '../infoPanel/infoPanel';
import Cells from '../cells/cells';
import LosePanel from '../losePanel/losePanel';
import { useAppDispatch, useAppSelector } from '../../store/hooks/redux';
import './field.scss';
import WinPanel from '../winPanel/winPanel';
function Field() {
  const { lose, win } = useAppSelector((state) => state.minesweeperReducer);
  return (
    <div className='fieldWrapper'>
      <InfoPanel></InfoPanel>
      <Cells></Cells>
      {lose && <LosePanel />}
      {win && <WinPanel />}
    </div>
  );
}

export default Field;
