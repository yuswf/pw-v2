import {useEffect} from 'react';
import {useDispatch} from 'react-redux';

import {setUser} from '@/stores/data';

import ProfileComponent from '@/components/Profile.component';

export default function Home() {
    let interval;
    const dispatch = useDispatch();

    useEffect(() => {
        const socket = new WebSocket('wss://api.lanyard.rest/socket');

        socket.onmessage = ({data}) => {
            const {op, d} = JSON.parse(data);

            if (op === 1) {
                socket.send(JSON.stringify({op: 2, d: {subscribe_to_id: '733784038199918683'}}));

                interval = setInterval(() => {
                    socket.send(JSON.stringify({op: 3}));
                }, d.heartbeat_interval);
            } else if (op === 0) {
                dispatch(setUser(d));
            }
        }

        return () => {
            clearInterval(interval);
        }
    }, []);

    return (
        <div>
            <ProfileComponent/>
        </div>
    );
}
