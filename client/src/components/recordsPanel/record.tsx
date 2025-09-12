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

  const formatDate = `${year}.${month.toString().padStart(2, '0')}.${day
    .toString()
    .padStart(2, '0')}`;
  const formatTime = `${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  return (
    <div className='record'>
      <div className='cell nick'>{nickName}</div>
      <div className={`cell difficult ${difficult}`}>{difficult}</div>
      <div className='cell time'>{time}s</div>
      <div className='cell created'>
        {formatDate} {formatTime}
      </div>
    </div>
  );
}
