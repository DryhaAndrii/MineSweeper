interface myState {
  message: string;
  hideMessage: () => void;
}
export default function Message({ message,hideMessage }: myState) {
  return (
    <div className='message'>
      <p>{message}</p>
      <button onClick={hideMessage}>OK</button>
    </div>
  );
}
