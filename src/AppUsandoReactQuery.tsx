import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

type Repository = {
    full_name: string,
    description: string
}

function AppUsandoReactQuery() {
    
    const { data, isFetching } = useQuery<Repository[]>(['repos'], async () => {
        const response = await axios.get('https://api.github.com/users/diego3g/repos');

        return response.data;
    },{
        staleTime: 1000*60
    })

    return (
        <ul>
            { isFetching && <p>Carregando...</p> }
            {data?.map(repo =>{
                return(
                    <li key={repo.full_name}>
                        <strong>{repo.full_name}</strong>
                        <p>{repo.description}</p>
                    </li>
                )
            })}
        </ul>
    )
}

export default AppUsandoReactQuery
