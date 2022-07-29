import {useParams} from "react-router-dom"
import {useQueryClient} from "@tanstack/react-query"
import { Repository } from "./Repos";

export function Repo(){
    const params = useParams();
    const currentRepository = params['*'] as string
    const queryClient = useQueryClient()

    async function handleChangeRepositoryDescription(){
        //invalidar a querie em cache
        //await queryClient.invalidateQueries(['repos'])
        //Chamada da api para alterar a descrição !
        //Altero o campo no cache !
        const previousRepos = queryClient.getQueryData<Repository[]>(['repos'])
        if(previousRepos){
            const nextRepos = previousRepos.map(repo=>{
                if(repo.full_name === currentRepository){
                    return {...repo, description: 'Testando'}
                }else{
                    return repo
                }
            });
            queryClient.setQueryData(['repos'], nextRepos)
        }
    }

    return (
        <div>
            <h1>{currentRepository}</h1>
            <button onClick={handleChangeRepositoryDescription} >Alterar Descrição</button>
        </div>
    )
}