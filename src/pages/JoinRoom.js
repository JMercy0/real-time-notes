import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const JoinRoom = () => {
  const [room, setRoom] = useState('');
  const navigate = useNavigate();

  const handleJoin = () => {
    if (room) {
      navigate(`/room/${room}`);
    }
  };

  return (
    <div>
      <h1>Join a Room</h1>
      <input
        type="text"
        placeholder="Enter Room Code"
        value={room}
        onChange={(e) => setRoom(e.target.value)}
      />
      <button onClick={handleJoin}>Join</button>
    </div>
  );
};

export default JoinRoom;