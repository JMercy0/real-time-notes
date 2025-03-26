import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSocket } from '../context/SocketContext';

const Room = () => {
  const { roomId } = useParams();
  const socket = useSocket();
  const [note, setNote] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (socket) {
      socket.emit('joinRoom', roomId);

      socket.on('noteUpdate', (newNote) => {
        setNote(newNote);
      });

      socket.on('userList', (userList) => {
        setUsers(userList);
      });
    }

    return () => {
      socket?.emit('leaveRoom', roomId);
    };
  }, [socket, roomId]);

  const handleChange = (e) => {
    setNote(e.target.value);
    socket.emit('editNote', { roomId, note: e.target.value });
  };

  return (
    <div>
      <h1>Room: {roomId}</h1>
      <textarea value={note} onChange={handleChange} />
      <h3>Users:</h3>
      <ul>
        {users.map((user, index) => (
          <li key={index}>{user}</li>
        ))}
      </ul>
    </div>
  );
};

export default Room;