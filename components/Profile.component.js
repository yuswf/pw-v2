import {useSelector} from 'react-redux';
import {Avatar, Indicator, Skeleton} from '@mantine/core';

export default function ProfileComponent() {
    const {user} = useSelector(state => state.data);
    const colors = {
        online: '#23A55A',
        idle: '#F0B232',
        dnd: '#F23F43',
        offline: '#82858F',
    }

    if (!user.discord_user) return (
        <div className="p-d relative max-md:w-[550px] max-sm:w-[300px]! max-lg:w-[650px] w-[750px] h-[500px] rounded">
            <div className="flex animate-pulse absolute flex-col items-center top-8 left-10 justify-center">
                <div>
                    <Skeleton radius="md" height={84} width={84}/>
                    <br/>
                    <Skeleton radius="md" height={84} width={84}/>
                </div>
            </div>
        </div>
    );

    console.log(user)

    return (
        <div className="p-d relative max-md:w-[550px] max-sm:w-[400px] max-lg:w-[650px] w-[750px] h-[500px] rounded">
            <div className="flex absolute flex-col items-center top-8 left-10 justify-center">
                <div>
                    <div>
                        <Indicator dot inline size={20} offset={5} position="bottom-end"
                                   color={colors[user?.discord_status]} withBorder>
                            <Avatar
                                size="xl"
                                radius="md"
                                src={'https://cdn.discordapp.com/avatars/733784038199918683/' + user?.discord_user?.avatar}
                            />
                        </Indicator>

                        <div className="absolute top-6 left-28">
                            <h2 className="text-white text-2xl">{user?.discord_user?.username}#{user?.discord_user?.discriminator}</h2>
                        </div>
                    </div>

                    <br/>

                    <div>
                        <Avatar
                            size="xl"
                            radius="md"
                            src={user?.spotify?.album_art_url}
                        />

                        <div className="absolute top-36 left-28">
                            <h2 className="text-white text-xl w-max"><a className="underline" href={"https://open.spotify.com/track/" + user?.spotify.track_id}>{user?.spotify?.song}</a> - {user?.spotify.artist.split(';').join(', ')}
                            </h2>
                        </div>
                    </div>

                    {user?.activities?.filter(activity => activity.type === 4).length > 0 && (
                        <div>
                            <p className="mt-6 w-full text-white text-xl break-words">Status: <span className="text-[#C4C4C4FF]">{user?.activities?.filter(activity => activity.type === 4)[0]?.state}</span></p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}