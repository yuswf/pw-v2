import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import Head from 'next/head';

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
            <Head>
                <title>babapro</title>
                
                <meta name="description" content="babapronun site"/>
                <meta name="keywords" content="babapronun, babapro, babapronun site, babapro site"/>
                <meta name="author" content="babapro"/>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            </Head>
            <ProfileComponent/>
        </div>
    );
}
