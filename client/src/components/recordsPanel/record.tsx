
import './recordsPanel.scss';
interface myState {
  nickName: string;
  difficult: string;
  time: string;
  createdAt: string;
}
export default function Record({ createdAt, difficult, nickName, time }: myState) {
  const date = new Date(createdAt);

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  return (
    <div className='record'>
      <div className='nick'>{nickName}</div>
      <div className='difficult'>{difficult}</div>
      <div className='time'>{time}</div>
      <div className='created'>{`${year}.${month}.${day} ${hours}:${minutes}:${seconds}`}</div>
    </div>
  );
}
